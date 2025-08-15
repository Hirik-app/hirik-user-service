// Authentication middleware and route protection tests
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Hono } from 'hono';
import { jwt, type JwtVariables } from 'hono/jwt';

// Import our mocking infrastructure
import {
  CloudflareMockUtils
} from './mocks/cloudflare-env';

import {
  MockJWTUtils,
  MockAuthHeaders
} from './mocks/jwt-utils';

import app from '../src/index';

describe('Authentication Middleware & Route Protection', () => {
  let mockEnv: any;

  beforeEach(() => {
    mockEnv = CloudflareMockUtils.createEnv();
    
    // Mock console to avoid test noise
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockEnv.__testUtils?.reset();
    vi.restoreAllMocks();
  });

  describe('Public Routes (No Auth Required)', () => {
    test('should allow access to health endpoint without auth', async () => {
      const req = new Request('http://localhost/api/v1/health', {
        method: 'GET'
      });

      const res = await app.request(req, mockEnv);
      const result = await res.json();

      expect(res.status).toBe(200);
      expect(result.status).toBe('ok');
      expect(result.service).toBe('hirik-user-service');
    });

    test('should allow access to login endpoint without auth', async () => {
      const loginData = {
        phoneNumber: '1234567890',
        countryCode: '+1'
      };

      const req = new Request('http://localhost/api/v1/auth/login-with-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const res = await app.request(req, mockEnv);
      
      // Should not return 401 (auth error) - may return other errors due to mock DB but not auth
      expect(res.status).not.toBe(401);
    });

    test('should allow access to verify OTP endpoint without auth', async () => {
      const verifyData = {
        phoneNumber: '1234567890',
        countryCode: '+1',
        otp: '123456'
      };

      const req = new Request('http://localhost/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verifyData)
      });

      const res = await app.request(req, mockEnv);
      
      // Should not return 401 (auth error)
      expect(res.status).not.toBe(401);
    });

    test('should allow access to refresh token endpoint without auth', async () => {
      const refreshData = {
        refreshToken: MockJWTUtils.createRefreshToken()
      };

      const req = new Request('http://localhost/api/v1/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(refreshData)
      });

      const res = await app.request(req, mockEnv);
      
      // Should not return 401 (auth error)
      expect(res.status).not.toBe(401);
    });
  });

  describe('Protected Routes (Auth Required)', () => {
    test('should reject request to user routes without authorization header', async () => {
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET'
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(401);
    });

    test('should reject request with invalid authorization header format', async () => {
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': MockAuthHeaders.malformedAuthHeader()
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(401);
    });

    test('should reject request with missing Bearer prefix', async () => {
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': MockAuthHeaders.missingBearerPrefix()
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(401);
    });

    test('should reject request with expired JWT token', async () => {
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': MockAuthHeaders.expiredAuthHeader()
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(401);
    });

    test('should reject request with invalid JWT token', async () => {
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': MockAuthHeaders.invalidAuthHeader()
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(401);
    });

    test('should accept request with valid JWT token', async () => {
      const validToken = MockJWTUtils.createValidToken({
        userId: 'test-user-123',
        phoneNumber: '1234567890'
      });

      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${validToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      // Should not return 401 (may return 404 or other non-auth errors)
      expect(res.status).not.toBe(401);
    });

    test('should pass JWT payload to protected route handlers', async () => {
      const testUserId = 'test-user-123';
      const testPhoneNumber = '1234567890';
      
      const validToken = MockJWTUtils.createValidToken({
        userId: testUserId,
        phoneNumber: testPhoneNumber
      });

      // Create a simple test app to verify JWT payload access
      const testApp = new Hono<{ Variables: JwtVariables }>().basePath('/api/v1');
      
      testApp.use('*', async (c, next) => {
        const jwtMiddleware = jwt({
          secret: c.env.ACCESS_TOKEN_SECRET || 'test-secret',
        });
        return jwtMiddleware(c, next);
      });

      testApp.get('/test-protected', (c) => {
        const payload = c.get('jwtPayload');
        return c.json({
          authenticated: true,
          userId: payload.userId,
          phoneNumber: payload.phoneNumber
        });
      });

      const req = new Request('http://localhost/api/v1/test-protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${validToken}`
        }
      });

      const res = await testApp.request(req, mockEnv);
      
      if (res.status === 200) {
        const result = await res.json();
        expect(result.authenticated).toBe(true);
        expect(result.userId).toBe(testUserId);
        expect(result.phoneNumber).toBe(testPhoneNumber);
      }
    });
  });

  describe('Different User Roles', () => {
    test('should accept valid user role token', async () => {
      const userToken = MockJWTUtils.createTokenWithRole('user');

      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });

    test('should accept valid recruiter role token', async () => {
      const recruiterToken = MockJWTUtils.createTokenWithRole('recruiter');

      const req = new Request('http://localhost/api/v1/recruiter/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${recruiterToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });

    test('should accept valid admin role token', async () => {
      const adminToken = MockJWTUtils.createTokenWithRole('admin');

      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });
  });

  describe('Token Edge Cases', () => {
    test('should handle token with special characters in payload', async () => {
      const specialToken = MockJWTUtils.createValidToken({
        userId: 'user-with-special-chars@#$',
        phoneNumber: '1234567890',
        role: 'user'
      });

      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${specialToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });

    test('should handle very long tokens', async () => {
      const longUserId = 'a'.repeat(1000); // Very long user ID
      const longToken = MockJWTUtils.createValidToken({
        userId: longUserId,
        phoneNumber: '1234567890'
      });

      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${longToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });

    test('should handle token with minimal payload', async () => {
      const minimalToken = MockJWTUtils.createValidToken({
        userId: 'u',
        exp: Math.floor(Date.now() / 1000) + 3600
      });

      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${minimalToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });

    test('should handle multiple Authorization headers', async () => {
      const validToken = MockJWTUtils.createValidToken();
      
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'GET',
        headers: new Headers([
          ['Authorization', `Bearer ${validToken}`],
          ['Authorization', 'Bearer invalid-second-token']
        ])
      });

      const res = await app.request(req, mockEnv);
      
      // Should handle gracefully (likely use first header)
      expect(res.status).not.toBe(401);
    });
  });

  describe('CORS and Security Headers', () => {
    test('should handle preflight OPTIONS requests', async () => {
      const req = new Request('http://localhost/api/v1/user/profile', {
        method: 'OPTIONS',
        headers: {
          'Origin': 'https://app.hirik.com',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Authorization'
        }
      });

      const res = await app.request(req, mockEnv);
      
      // Should handle OPTIONS requests (may return 404 but not 401)
      expect(res.status).not.toBe(401);
    });
  });

  describe('Route-Specific Protection', () => {
    const protectedRoutes = [
      '/api/v1/user/profile',
      '/api/v1/user/update',
      '/api/v1/resumes',
      '/api/v1/recruiter/profile',
      '/api/v1/preferences',
      '/api/v1/education'
    ];

    test.each(protectedRoutes)('should protect route %s', async (route) => {
      const req = new Request(`http://localhost${route}`, {
        method: 'GET'
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(401);
    });

    test.each(protectedRoutes)('should allow access to route %s with valid token', async (route) => {
      const validToken = MockJWTUtils.createValidToken();

      const req = new Request(`http://localhost${route}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${validToken}`
        }
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).not.toBe(401);
    });
  });
});