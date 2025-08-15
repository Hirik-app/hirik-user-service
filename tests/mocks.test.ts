// Comprehensive tests for all mocking infrastructure
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

import {
  CloudflareMockUtils,
  MockD1Database,
  MockKVNamespace,
  MockR2Bucket
} from './mocks/cloudflare-env';

import {
  AuthMockUtils,
  MockJWTUtils,
  MockAuthHeaders,
  MockTimeUtils,
  MockOTPUtils,
  MockRateLimitUtils
} from './mocks/jwt-utils';

import {
  ExternalServiceMocks,
  MockMeilisearchClient,
  MockEmailService,
  MockSMSService,
  MockFileUploadService
} from './mocks/external-services';

describe('Mocking Infrastructure', () => {
  describe('Cloudflare Environment Mocks', () => {
    describe('MockD1Database', () => {
      let mockDB: MockD1Database;

      beforeEach(() => {
        mockDB = new MockD1Database();
      });

      test('should create prepared statements', () => {
        const stmt = mockDB.prepare('SELECT * FROM users WHERE id = ?');
        expect(stmt).toBeDefined();
      });

      test('should handle basic SELECT queries', async () => {
        // Seed test data
        mockDB.seedTable('users', [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
        ]);

        const stmt = mockDB.prepare('SELECT * FROM users');
        const results = await stmt.all();

        expect(results).toHaveLength(2);
        expect(results[0]).toMatchObject({ id: '1', name: 'John Doe' });
      });

      test('should handle SELECT with binding', async () => {
        mockDB.seedTable('users', [
          { id: '1', name: 'John Doe', email: 'john@example.com' }
        ]);

        const stmt = mockDB.prepare('SELECT * FROM users WHERE id = ?');
        const result = await stmt.bind('1').first();

        expect(result).toMatchObject({ id: '1', name: 'John Doe' });
      });

      test('should handle INSERT operations', async () => {
        const stmt = mockDB.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
        const result = await stmt.bind('Test User', 'test@example.com').run();

        expect(result.success).toBe(true);
        expect(result.meta.changes).toBe(1);
        expect(result.meta.last_row_id).toBeDefined();
      });

      test('should handle UPDATE and DELETE operations', async () => {
        const updateStmt = mockDB.prepare('UPDATE users SET name = ? WHERE id = ?');
        const updateResult = await updateStmt.bind('Updated Name', '1').run();

        expect(updateResult.success).toBe(true);

        const deleteStmt = mockDB.prepare('DELETE FROM users WHERE id = ?');
        const deleteResult = await deleteStmt.bind('1').run();

        expect(deleteResult.success).toBe(true);
      });

      test('should provide test utility methods', () => {
        mockDB.seedTable('test', [{ id: 1, data: 'test' }]);
        
        expect(mockDB.getTableData('test')).toHaveLength(1);
        
        mockDB.clearTable('test');
        expect(mockDB.getTableData('test')).toHaveLength(0);
        
        mockDB.seedTable('test1', [{ id: 1 }]);
        mockDB.seedTable('test2', [{ id: 2 }]);
        mockDB.clearAll();
        
        expect(mockDB.getTableData('test1')).toHaveLength(0);
        expect(mockDB.getTableData('test2')).toHaveLength(0);
      });
    });

    describe('MockKVNamespace', () => {
      let mockKV: MockKVNamespace;

      beforeEach(() => {
        mockKV = new MockKVNamespace();
      });
      
      afterEach(() => {
        mockKV?.clear();
        vi.useRealTimers(); // Ensure real timers are restored
      });

      test('should store and retrieve values', async () => {
        await mockKV.put('test-key', 'test-value');
        const value = await mockKV.get('test-key');

        expect(value).toBe('test-value');
      });

      test('should handle JSON values', async () => {
        const testObject = { name: 'John', age: 30 };
        await mockKV.put('test-object', JSON.stringify(testObject));
        
        const retrieved = await mockKV.get('test-object', { type: 'json' });
        expect(retrieved).toEqual(testObject);
      });

      test('should handle expiration', async () => {
        const expirationTime = Math.floor(Date.now() / 1000) + 1; // 1 second from now
        await mockKV.put('expiring-key', 'expiring-value', { expiration: expirationTime });

        // Should exist initially
        expect(await mockKV.get('expiring-key')).toBe('expiring-value');

        // Mock time passing
        vi.useFakeTimers();
        vi.advanceTimersByTime(2000); // 2 seconds

        // Should be expired
        expect(await mockKV.get('expiring-key')).toBe(null);

        vi.useRealTimers();
      });

      test('should handle TTL expiration', async () => {
        await mockKV.put('ttl-key', 'ttl-value', { expirationTtl: 1 });

        expect(await mockKV.get('ttl-key')).toBe('ttl-value');

        vi.useFakeTimers();
        vi.advanceTimersByTime(2000); // 2 seconds

        expect(await mockKV.get('ttl-key')).toBe(null);

        vi.useRealTimers();
      });

      test('should delete keys', async () => {
        await mockKV.put('delete-me', 'value');
        expect(await mockKV.get('delete-me')).toBe('value');

        await mockKV.delete('delete-me');
        expect(await mockKV.get('delete-me')).toBe(null);
      });

      test('should list keys', async () => {
        const testKV = new MockKVNamespace(); // Create fresh instance
        
        await testKV.put('key1', 'value1');
        await testKV.put('key2', 'value2');
        await testKV.put('prefix:key3', 'value3');

        const allKeys = await testKV.list();
        expect(allKeys.keys).toHaveLength(3);

        const prefixKeys = await testKV.list({ prefix: 'prefix:' });
        expect(prefixKeys.keys).toHaveLength(1);
        expect(prefixKeys.keys[0].name).toBe('prefix:key3');
      });

      test('should provide test utilities', () => {
        mockKV.put('test1', 'value1');
        mockKV.put('test2', 'value2');

        expect(mockKV.size()).toBe(2);

        mockKV.clear();
        expect(mockKV.size()).toBe(0);
      });
    });

    describe('MockR2Bucket', () => {
      let mockBucket: MockR2Bucket;

      beforeEach(() => {
        mockBucket = new MockR2Bucket();
      });

      test('should store and retrieve objects', async () => {
        const putResult = await mockBucket.put('test-file.txt', 'test content');
        expect(putResult.key).toBe('test-file.txt');

        const getResult = await mockBucket.get('test-file.txt');
        expect(getResult?.body).toBe('test content');
      });

      test('should handle metadata', async () => {
        await mockBucket.put('test-file.pdf', 'pdf content', {
          httpMetadata: { 'Content-Type': 'application/pdf' },
          customMetadata: { 'uploaded-by': 'test-user' }
        });

        const object = await mockBucket.get('test-file.pdf');
        expect(object?.httpMetadata).toMatchObject({
          'Content-Type': 'application/pdf',
          'uploaded-by': 'test-user'
        });
      });

      test('should delete objects', async () => {
        await mockBucket.put('delete-me.txt', 'content');
        expect(await mockBucket.get('delete-me.txt')).toBeTruthy();

        await mockBucket.delete('delete-me.txt');
        expect(await mockBucket.get('delete-me.txt')).toBe(null);
      });

      test('should provide head information', async () => {
        await mockBucket.put('head-test.txt', 'content for head test');
        
        const headInfo = await mockBucket.head('head-test.txt');
        expect(headInfo?.key).toBe('head-test.txt');
        expect(headInfo?.size).toBe('content for head test'.length);
      });

      test('should list objects', async () => {
        await mockBucket.put('file1.txt', 'content1');
        await mockBucket.put('file2.txt', 'content2');
        await mockBucket.put('folder/file3.txt', 'content3');

        const allObjects = await mockBucket.list();
        expect(allObjects.objects).toHaveLength(3);

        const folderObjects = await mockBucket.list({ prefix: 'folder/' });
        expect(folderObjects.objects).toHaveLength(1);
        expect(folderObjects.objects[0].key).toBe('folder/file3.txt');
      });

      test('should provide test utilities', async () => {
        await mockBucket.put('test1.txt', 'content1');
        await mockBucket.put('test2.txt', 'content2');

        expect(mockBucket.hasObject('test1.txt')).toBe(true);
        expect(mockBucket.hasObject('nonexistent.txt')).toBe(false);

        mockBucket.clear();
        expect(mockBucket.hasObject('test1.txt')).toBe(false);
      });
    });

    describe('Cloudflare Environment Factory', () => {
      test('should create complete mock environment', () => {
        const env = CloudflareMockUtils.createEnv();

        expect(env.DB).toBeInstanceOf(MockD1Database);
        expect(env.JWT_SECRET).toBeDefined();
        expect(env.API_BASE_URL).toBeDefined();
        expect(env.MEILISEARCH_HOST).toBeDefined();
      });

      test('should accept overrides', () => {
        const env = CloudflareMockUtils.createEnv({
          JWT_SECRET: 'custom-secret',
          API_BASE_URL: 'https://custom-api.com'
        });

        expect(env.JWT_SECRET).toBe('custom-secret');
        expect(env.API_BASE_URL).toBe('https://custom-api.com');
      });

      test('should create mock Hono context', () => {
        const ctx = CloudflareMockUtils.createContext();

        expect(ctx.req).toBeDefined();
        expect(ctx.env).toBeDefined();
        expect(ctx.json).toBeDefined();
        expect(ctx.text).toBeDefined();
        expect(ctx.executionCtx).toBeDefined();
      });

      test('should provide test utilities', () => {
        const env = CloudflareMockUtils.createEnv() as any;
        
        expect(env.__testUtils).toBeDefined();
        expect(env.__testUtils.mockDB).toBeInstanceOf(MockD1Database);
        expect(env.__testUtils.mockKV).toBeInstanceOf(MockKVNamespace);
        expect(env.__testUtils.mockR2).toBeInstanceOf(MockR2Bucket);

        // Test reset functionality
        env.__testUtils.reset();
        expect(env.__testUtils.mockKV.size()).toBe(0);
      });
    });
  });

  describe('JWT and Authentication Mocks', () => {
    describe('MockJWTUtils', () => {
      test('should create valid tokens', () => {
        const token = MockJWTUtils.createValidToken();
        expect(token).toMatch(/^mock\.jwt\./);
        expect(MockJWTUtils.isTokenValid(token)).toBe(true);
      });

      test('should create tokens with custom payload', () => {
        const payload = {
          userId: 'test-user-123',
          role: 'admin' as const,
          phoneNumber: '1234567890'
        };

        const token = MockJWTUtils.createValidToken(payload);
        const decoded = MockJWTUtils.decodeToken(token);

        expect(decoded?.userId).toBe('test-user-123');
        expect(decoded?.role).toBe('admin');
        expect(decoded?.phoneNumber).toBe('1234567890');
      });

      test('should create expired tokens', () => {
        const token = MockJWTUtils.createExpiredToken();
        expect(MockJWTUtils.isTokenExpired(token)).toBe(true);
        expect(MockJWTUtils.isTokenValid(token)).toBe(false);
      });

      test('should create refresh tokens', () => {
        const refreshToken = MockJWTUtils.createRefreshToken();
        const decoded = MockJWTUtils.decodeToken(refreshToken);

        expect(decoded?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000) + (6 * 24 * 60 * 60));
      });

      test('should create role-based tokens', () => {
        const userToken = MockJWTUtils.createTokenWithRole('user');
        const recruiterToken = MockJWTUtils.createTokenWithRole('recruiter');
        const adminToken = MockJWTUtils.createTokenWithRole('admin');

        expect(MockJWTUtils.decodeToken(userToken)?.role).toBe('user');
        expect(MockJWTUtils.decodeToken(recruiterToken)?.role).toBe('recruiter');
        expect(MockJWTUtils.decodeToken(adminToken)?.role).toBe('admin');
      });

      test('should handle invalid tokens', () => {
        const invalidToken = MockJWTUtils.createInvalidToken();
        
        expect(MockJWTUtils.decodeToken(invalidToken)).toBe(null);
        expect(MockJWTUtils.isTokenValid(invalidToken)).toBe(false);
        expect(MockJWTUtils.isTokenExpired(invalidToken)).toBe(true);
      });
    });

    describe('MockAuthHeaders', () => {
      test('should create various auth header formats', () => {
        expect(MockAuthHeaders.validAuthHeader()).toMatch(/^Bearer mock\.jwt\./);
        expect(MockAuthHeaders.expiredAuthHeader()).toMatch(/^Bearer mock\.jwt\./);
        expect(MockAuthHeaders.invalidAuthHeader()).toBe('Bearer invalid.jwt.token');
        expect(MockAuthHeaders.malformedAuthHeader()).toBe('InvalidHeaderFormat');
      });

      test('should create role-based headers', () => {
        const adminHeader = MockAuthHeaders.roleBasedHeader('admin');
        const token = adminHeader.replace('Bearer ', '');
        const decoded = MockJWTUtils.decodeToken(token);

        expect(decoded?.role).toBe('admin');
      });

      test('should create missing bearer prefix header', () => {
        const header = MockAuthHeaders.missingBearerPrefix();
        expect(header).toMatch(/^mock\.jwt\./);
        expect(header).not.toMatch(/^Bearer /);
      });
    });

    describe('MockTimeUtils', () => {
      afterEach(() => {
        MockTimeUtils.restoreTime();
      });

      test('should freeze time', () => {
        const fixedTime = new Date('2023-01-01T00:00:00Z');
        MockTimeUtils.freezeTime(fixedTime);

        expect(Date.now()).toBe(fixedTime.getTime());
        expect(new Date().toISOString()).toBe(fixedTime.toISOString());
      });

      test('should advance time', () => {
        const startTime = new Date('2023-01-01T00:00:00Z');
        MockTimeUtils.freezeTime(startTime);

        MockTimeUtils.advanceByMinutes(30);
        expect(Date.now()).toBe(startTime.getTime() + (30 * 60 * 1000));

        MockTimeUtils.advanceByHours(2);
        expect(Date.now()).toBe(startTime.getTime() + (30 * 60 * 1000) + (2 * 60 * 60 * 1000));

        MockTimeUtils.advanceByDays(1);
        expect(Date.now()).toBe(startTime.getTime() + (30 * 60 * 1000) + (2 * 60 * 60 * 1000) + (24 * 60 * 60 * 1000));
      });

      test('should travel to specific time', () => {
        const targetTime = new Date('2023-06-15T14:30:00Z');
        MockTimeUtils.travelToTime(targetTime);

        expect(Date.now()).toBe(targetTime.getTime());
      });

      test('should provide helper methods', () => {
        const fixedTime = new Date('2023-01-01T12:00:00Z');
        MockTimeUtils.freezeTime(fixedTime);
        
        // Verify time is actually frozen
        expect(Date.now()).toBe(fixedTime.getTime());

        const expiredOTP = MockTimeUtils.createExpiredOTP();
        expect(expiredOTP.expiresAt.getTime()).toBeLessThan(Date.now());

        const validOTP = MockTimeUtils.createValidOTP();
        expect(validOTP.expiresAt.getTime()).toBeGreaterThan(Date.now());

        const recentUser = MockTimeUtils.createRecentUser();
        expect(recentUser.createdAt.getTime()).toBeLessThan(Date.now());
      });

      test('should restore original time', () => {
        const originalNow = Date.now();
        MockTimeUtils.freezeTime(new Date('2023-01-01T00:00:00Z'));

        expect(Date.now()).not.toBe(originalNow);

        MockTimeUtils.restoreTime();
        expect(Date.now()).toBeCloseTo(originalNow, -2); // Within 100ms
      });
    });

    describe('MockOTPUtils', () => {
      test('should create various OTP scenarios', () => {
        const validOTP = MockOTPUtils.createOTPData();
        expect(validOTP.otp).toBe(MockOTPUtils.validOTP);
        expect(validOTP.verified).toBe(false);
        expect(validOTP.attempts).toBe(0);

        const expiredOTP = MockOTPUtils.createExpiredOTPData();
        expect(expiredOTP.expiresAt.getTime()).toBeLessThan(Date.now());

        const maxAttemptsOTP = MockOTPUtils.createMaxAttemptsOTPData();
        expect(maxAttemptsOTP.attempts).toBe(3);

        const verifiedOTP = MockOTPUtils.createVerifiedOTPData();
        expect(verifiedOTP.verified).toBe(true);
      });

      test('should accept overrides', () => {
        const customOTP = MockOTPUtils.createOTPData({
          phoneNumber: '9876543210',
          countryCode: '+44',
          attempts: 1
        });

        expect(customOTP.phoneNumber).toBe('9876543210');
        expect(customOTP.countryCode).toBe('+44');
        expect(customOTP.attempts).toBe(1);
      });
    });

    describe('MockRateLimitUtils', () => {
      beforeEach(() => {
        MockRateLimitUtils.reset();
      });
      
      afterEach(() => {
        MockRateLimitUtils.reset();
        MockTimeUtils.restoreTime();
      });

      test('should track rate limit attempts', () => {
        const key = 'test-user';
        
        const first = MockRateLimitUtils.recordAttempt(key);
        expect(first.count).toBe(1);
        expect(first.remaining).toBe(4); // Default max is 5

        const second = MockRateLimitUtils.recordAttempt(key);
        expect(second.count).toBe(2);
        expect(second.remaining).toBe(3);
      });

      test('should detect when rate limited', () => {
        const key = 'test-user';

        expect(MockRateLimitUtils.isRateLimited(key)).toBe(false);

        // Make 5 attempts (default max)
        for (let i = 0; i < 5; i++) {
          MockRateLimitUtils.recordAttempt(key);
        }

        expect(MockRateLimitUtils.isRateLimited(key)).toBe(true);
      });

      test('should reset rate limits after window expires', () => {
        const key = 'test-user';
        
        MockTimeUtils.freezeTime(new Date('2023-01-01T00:00:00Z'));

        // Max out attempts
        for (let i = 0; i < 5; i++) {
          MockRateLimitUtils.recordAttempt(key, 60000, 5); // 1 minute window
        }

        expect(MockRateLimitUtils.isRateLimited(key, 5)).toBe(true);

        // Advance time past window
        MockTimeUtils.advanceByMinutes(2);

        expect(MockRateLimitUtils.isRateLimited(key, 5)).toBe(false);

        MockTimeUtils.restoreTime();
      });

      test('should provide remaining time', () => {
        const key = 'test-user';
        
        MockTimeUtils.freezeTime(new Date('2023-01-01T00:00:00Z'));

        MockRateLimitUtils.recordAttempt(key, 60000); // 1 minute window
        const remainingTime = MockRateLimitUtils.getRemainingTime(key);

        expect(remainingTime).toBeCloseTo(60000, -3); // Within 1 second

        MockTimeUtils.restoreTime();
      });

      test('should reset specific keys or all', () => {
        MockRateLimitUtils.recordAttempt('user1');
        MockRateLimitUtils.recordAttempt('user2');

        MockRateLimitUtils.reset('user1');
        expect(MockRateLimitUtils.isRateLimited('user1')).toBe(false);

        MockRateLimitUtils.reset(); // Reset all
        expect(MockRateLimitUtils.isRateLimited('user2')).toBe(false);
      });
    });
  });

  describe('External Service Mocks', () => {
    describe('MockMeilisearchClient', () => {
      let client: MockMeilisearchClient;

      beforeEach(() => {
        client = new MockMeilisearchClient();
        client.reset(); // Ensure clean state
      });
      
      afterEach(() => {
        client.reset();
      });

      test('should create and manage indexes', async () => {
        const createTask = await client.createIndex('test-products');
        expect(createTask.indexUid).toBe('test-products');
        expect(createTask.status).toBe('enqueued');

        const indexes = await client.getIndexes();
        expect(indexes.some(idx => idx.uid === 'test-products')).toBe(true);
      });

      test('should handle search operations', async () => {
        const index = client.index('test-users');
        
        // Seed some data
        await index.addDocuments([
          { id: '1', name: 'John Doe', skills: ['JavaScript', 'React'] },
          { id: '2', name: 'Jane Smith', skills: ['Python', 'Django'] }
        ]);

        const searchResults = await index.search('John');
        expect(searchResults.hits).toHaveLength(1);
        expect(searchResults.hits[0].name).toBe('John Doe');

        const allResults = await index.search('');
        expect(allResults.hits).toHaveLength(2);
      });

      test('should handle document operations', async () => {
        const index = client.index('test-docs');

        const addTask = await index.addDocuments([
          { id: '1', title: 'Test Document', content: 'Test content' }
        ]);
        expect(addTask.type).toBe('documentAdditionOrUpdate');

        const doc = await index.getDocument('1');
        expect(doc?.title).toBe('Test Document');

        const deleteTask = await index.deleteDocument('1');
        expect(deleteTask.type).toBe('documentDeletion');

        const deletedDoc = await index.getDocument('1');
        expect(deletedDoc).toBe(null);
      });

      test('should manage settings', async () => {
        const index = client.index('test-settings');

        const currentSettings = await index.getSettings();
        expect(currentSettings.searchableAttributes).toEqual(['*']);

        const updateTask = await index.updateSettings({
          searchableAttributes: ['title', 'content']
        });
        expect(updateTask.type).toBe('settingsUpdate');

        const updatedSettings = await index.getSettings();
        expect(updatedSettings.searchableAttributes).toEqual(['title', 'content']);
      });

      test('should provide health check', async () => {
        expect(await client.isHealthy()).toBe(true);

        client.setHealthy(false);
        expect(await client.isHealthy()).toBe(false);

        const health = await client.health();
        expect(health.status).toBe('unavailable');
      });

      test('should provide test utilities', async () => {
        const index = client.index('test-utils');
        
        index.seedDocuments([
          { id: '1', title: 'Doc 1' },
          { id: '2', title: 'Doc 2' }
        ]);

        expect(index.getDocumentCount()).toBe(2);
        expect(index.hasDocument('1')).toBe(true);
        expect(index.hasDocument('3')).toBe(false);

        index.clear();
        expect(index.getDocumentCount()).toBe(0);
      });
    });

    describe('MockEmailService', () => {
      let emailService: MockEmailService;

      beforeEach(() => {
        emailService = new MockEmailService();
        emailService.clearSentEmails(); // Ensure clean state
      });
      
      afterEach(() => {
        emailService.clearSentEmails();
      });

      test('should send emails', async () => {
        const result = await emailService.send({
          to: 'test@example.com',
          from: 'sender@example.com',
          subject: 'Test Email',
          text: 'Test content',
          html: '<p>Test content</p>'
        });

        expect(result.messageId).toBeDefined();
        expect(result.status).toBe('sent');
      });

      test('should send multiple emails', async () => {
        const emails = [
          { to: 'user1@example.com', from: 'sender@example.com', subject: 'Email 1', text: 'Content 1' },
          { to: 'user2@example.com', from: 'sender@example.com', subject: 'Email 2', text: 'Content 2' }
        ];

        const results = await emailService.sendMultiple(emails);
        expect(results).toHaveLength(2);
        expect(results.every(r => r.status === 'sent')).toBe(true);
      });

      test('should track sent emails', async () => {
        await emailService.send({
          to: 'recipient@example.com',
          from: 'sender@example.com',
          subject: 'Test Subject',
          text: 'Test content'
        });

        const sentEmails = emailService.getSentEmails();
        expect(sentEmails).toHaveLength(1);
        expect(sentEmails[0].to).toEqual(['recipient@example.com']);

        const emailsToRecipient = emailService.getEmailsSentTo('recipient@example.com');
        expect(emailsToRecipient).toHaveLength(1);

        const emailsWithSubject = emailService.getEmailsWithSubject('Test Subject');
        expect(emailsWithSubject).toHaveLength(1);

        const lastEmail = emailService.getLastEmail();
        expect(lastEmail.subject).toBe('Test Subject');
      });

      test('should simulate failures', async () => {
        emailService.simulateFailure(true, 'Custom failure message');

        await expect(emailService.send({
          to: 'test@example.com',
          from: 'sender@example.com',
          subject: 'Test',
          text: 'Test'
        })).rejects.toThrow('Custom failure message');

        emailService.simulateFailure(false);

        await expect(emailService.send({
          to: 'test@example.com',
          from: 'sender@example.com',
          subject: 'Test',
          text: 'Test'
        })).resolves.toBeDefined();
      });

      test('should provide test utilities', async () => {
        await emailService.send({
          to: 'test1@example.com',
          from: 'sender@example.com',
          subject: 'Test 1',
          text: 'Content 1'
        });

        await emailService.send({
          to: 'test2@example.com',
          from: 'sender@example.com',
          subject: 'Test 2',
          text: 'Content 2'
        });

        expect(emailService.getEmailCount()).toBe(2);

        emailService.clearSentEmails();
        expect(emailService.getEmailCount()).toBe(0);
        expect(emailService.getSentEmails()).toHaveLength(0);
      });
    });

    describe('MockSMSService', () => {
      let smsService: MockSMSService;

      beforeEach(() => {
        smsService = new MockSMSService();
        smsService.clearSentMessages(); // Ensure clean state
      });
      
      afterEach(() => {
        smsService.clearSentMessages();
      });

      test('should send SMS messages', async () => {
        const result = await smsService.send({
          to: '+1234567890',
          from: '+0987654321',
          body: 'Your OTP is: 123456'
        });

        expect(result.sid).toBeDefined();
        expect(result.status).toBe('sent');
        expect(result.to).toBe('+1234567890');
      });

      test('should track sent messages', async () => {
        const testSMSService = new MockSMSService(); // Create fresh instance
        
        await testSMSService.send({
          to: '+1234567890',
          from: '+0987654321',
          body: 'Test message'
        });

        const sentMessages = testSMSService.getSentMessages();
        expect(sentMessages).toHaveLength(1);

        const messagesToNumber = testSMSService.getMessagesSentTo('+1234567890');
        expect(messagesToNumber).toHaveLength(1);

        const messagesWithContent = testSMSService.getMessagesWithBody('Test message');
        expect(messagesWithContent).toHaveLength(1);

        const lastMessage = testSMSService.getLastMessage();
        expect(lastMessage.body).toBe('Test message');
      });

      test('should get message status', async () => {
        const result = await smsService.send({
          to: '+1234567890',
          from: '+0987654321',
          body: 'Status test'
        });

        const status = await smsService.getMessageStatus(result.sid);
        expect(status).toBeDefined();
        expect(status?.sid).toBe(result.sid);
      });

      test('should simulate failures', async () => {
        smsService.simulateFailure(true, 'SMS service unavailable');

        await expect(smsService.send({
          to: '+1234567890',
          from: '+0987654321',
          body: 'Test'
        })).rejects.toThrow('SMS service unavailable');

        smsService.simulateFailure(false);

        await expect(smsService.send({
          to: '+1234567890',
          from: '+0987654321',
          body: 'Test'
        })).resolves.toBeDefined();
      });

      test('should provide test utilities', async () => {
        await smsService.send({
          to: '+1111111111',
          from: '+2222222222',
          body: 'Message 1'
        });

        await smsService.send({
          to: '+3333333333',
          from: '+2222222222',
          body: 'Message 2'
        });

        expect(smsService.getMessageCount()).toBe(2);

        smsService.clearSentMessages();
        expect(smsService.getMessageCount()).toBe(0);
      });
    });

    describe('MockFileUploadService', () => {
      let fileService: MockFileUploadService;

      beforeEach(() => {
        fileService = new MockFileUploadService();
        fileService.simulateFailure(false); // Ensure failure mode is disabled
        fileService.clearFiles(); // Ensure clean state
      });
      
      afterEach(() => {
        fileService.clearFiles();
        fileService.simulateFailure(false);
      });

      test('should upload files', async () => {
        const result = await fileService.upload({
          originalName: 'test-resume.pdf',
          mimeType: 'application/pdf',
          size: 1024 * 1024, // 1MB
          key: 'user123/resume.pdf'
        });

        expect(result.success).toBe(true);
        expect(result.key).toBe('user123/resume.pdf');
        expect(result.url).toContain('storage.example.com');
      });

      test('should retrieve file info', async () => {
        await fileService.upload({
          originalName: 'document.pdf',
          mimeType: 'application/pdf',
          size: 2048,
          key: 'doc123'
        });

        const fileInfo = await fileService.getFileInfo('doc123');
        expect(fileInfo?.originalName).toBe('document.pdf');
        expect(fileInfo?.size).toBe(2048);
        expect(fileInfo?.uploadedAt).toBeDefined();
      });

      test('should delete files', async () => {
        await fileService.upload({
          originalName: 'temp.txt',
          mimeType: 'text/plain',
          size: 100,
          key: 'temp123'
        });

        expect(fileService.hasFile('temp123')).toBe(true);

        const deleteResult = await fileService.delete('temp123');
        expect(deleteResult.success).toBe(true);
        expect(fileService.hasFile('temp123')).toBe(false);
      });

      test('should generate download URLs', async () => {
        await fileService.upload({
          originalName: 'download-test.pdf',
          mimeType: 'application/pdf',
          size: 1024,
          key: 'download123'
        });

        const downloadUrl = await fileService.getDownloadUrl('download123');
        expect(downloadUrl).toContain('expires=');
        expect(downloadUrl).toContain('storage.example.com');
      });

      test('should simulate failures', async () => {
        fileService.simulateFailure(true, 'Storage quota exceeded');

        await expect(fileService.upload({
          originalName: 'fail-test.pdf',
          mimeType: 'application/pdf',
          size: 1024
        })).rejects.toThrow('Storage quota exceeded');

        fileService.simulateFailure(false);

        await expect(fileService.upload({
          originalName: 'success-test.pdf',
          mimeType: 'application/pdf',
          size: 1024
        })).resolves.toBeDefined();
      });

      test('should provide test utilities', async () => {
        const testFileService = new MockFileUploadService(); // Create fresh instance
        
        await testFileService.upload({
          originalName: 'file1.txt',
          mimeType: 'text/plain',
          size: 100,
          key: 'file1'
        });

        await testFileService.upload({
          originalName: 'file2.txt',
          mimeType: 'text/plain',
          size: 200,
          key: 'file2'
        });

        expect(testFileService.getFileCount()).toBe(2);

        const uploadedFiles = testFileService.getUploadedFiles();
        expect(uploadedFiles).toHaveLength(2);

        testFileService.clearFiles();
        expect(testFileService.getFileCount()).toBe(0);
      });
    });
  });
});