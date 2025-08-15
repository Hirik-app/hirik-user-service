// JWT and authentication mocking utilities
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

// JWT Token Mock Data
export interface MockJWTPayload {
  userId: string;
  phoneNumber?: string;
  countryCode?: string;
  role?: 'user' | 'recruiter' | 'admin';
  exp?: number;
  iat?: number;
  iss?: string;
  sub?: string;
}

// Mock JWT utilities
export class MockJWTUtils {
  private static secretKey = 'test-jwt-secret-for-testing-12345';
  private static refreshSecretKey = 'test-refresh-secret-for-testing-67890';
  
  static createValidToken(payload: Partial<MockJWTPayload> = {}): string {
    const defaultPayload: MockJWTPayload = {
      userId: faker.string.uuid(),
      phoneNumber: faker.string.numeric(10),
      countryCode: '+1',
      role: 'user',
      exp: Math.floor(Date.now() / 1000) + (15 * 60), // 15 minutes from now
      iat: Math.floor(Date.now() / 1000),
      iss: 'hirik-auth',
      sub: payload.userId || faker.string.uuid()
    };
    
    const fullPayload = { ...defaultPayload, ...payload };
    
    // Create a mock JWT-like string (not a real JWT for testing)
    return `mock.jwt.${Buffer.from(JSON.stringify(fullPayload)).toString('base64')}`;
  }
  
  static createExpiredToken(payload: Partial<MockJWTPayload> = {}): string {
    return this.createValidToken({
      ...payload,
      exp: Math.floor(Date.now() / 1000) - (60 * 60) // 1 hour ago
    });
  }
  
  static createRefreshToken(payload: Partial<MockJWTPayload> = {}): string {
    return this.createValidToken({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days from now
    });
  }
  
  static createInvalidToken(): string {
    return 'invalid.jwt.token';
  }
  
  static createTokenWithRole(role: 'user' | 'recruiter' | 'admin', payload: Partial<MockJWTPayload> = {}): string {
    return this.createValidToken({ ...payload, role });
  }
  
  static decodeToken(token: string): MockJWTPayload | null {
    try {
      if (!token.startsWith('mock.jwt.')) return null;
      
      const payloadBase64 = token.split('.')[2];
      const payloadJson = Buffer.from(payloadBase64, 'base64').toString();
      return JSON.parse(payloadJson);
    } catch {
      return null;
    }
  }
  
  static isTokenValid(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return false;
    
    return payload.exp! > Math.floor(Date.now() / 1000);
  }
  
  static isTokenExpired(token: string): boolean {
    return !this.isTokenValid(token);
  }
}

// Mock auth header utilities
export class MockAuthHeaders {
  static validAuthHeader(payload?: Partial<MockJWTPayload>): string {
    return `Bearer ${MockJWTUtils.createValidToken(payload)}`;
  }
  
  static expiredAuthHeader(payload?: Partial<MockJWTPayload>): string {
    return `Bearer ${MockJWTUtils.createExpiredToken(payload)}`;
  }
  
  static invalidAuthHeader(): string {
    return `Bearer ${MockJWTUtils.createInvalidToken()}`;
  }
  
  static malformedAuthHeader(): string {
    return 'InvalidHeaderFormat';
  }
  
  static missingBearerPrefix(payload?: Partial<MockJWTPayload>): string {
    return MockJWTUtils.createValidToken(payload);
  }
  
  static roleBasedHeader(role: 'user' | 'recruiter' | 'admin', payload?: Partial<MockJWTPayload>): string {
    return `Bearer ${MockJWTUtils.createTokenWithRole(role, payload)}`;
  }
}

// Time-based mocking utilities
export class MockTimeUtils {
  private static originalDate = Date;
  private static originalNow = Date.now;
  private static mockTime: number | null = null;
  
  static freezeTime(time: Date | number | string = new Date()) {
    const mockDate = new Date(time);
    this.mockTime = mockDate.getTime();
    
    global.Date = vi.fn(() => new this.originalDate(this.mockTime!)) as any;
    global.Date.now = vi.fn(() => this.mockTime!);
    global.Date.parse = this.originalDate.parse;
    global.Date.UTC = this.originalDate.UTC;
    global.Date.prototype = this.originalDate.prototype;
    
    return mockDate;
  }
  
  static travelToTime(time: Date | number | string) {
    return this.freezeTime(time);
  }
  
  static advanceTime(milliseconds: number) {
    if (this.mockTime === null) {
      this.freezeTime();
    }
    
    this.mockTime! += milliseconds;
    global.Date.now = vi.fn(() => this.mockTime!);
  }
  
  static advanceByMinutes(minutes: number) {
    this.advanceTime(minutes * 60 * 1000);
  }
  
  static advanceByHours(hours: number) {
    this.advanceTime(hours * 60 * 60 * 1000);
  }
  
  static advanceByDays(days: number) {
    this.advanceTime(days * 24 * 60 * 60 * 1000);
  }
  
  static restoreTime() {
    global.Date = this.originalDate;
    global.Date.now = this.originalNow;
    this.mockTime = null;
  }
  
  static getCurrentMockTime(): Date | null {
    return this.mockTime ? new Date(this.mockTime) : null;
  }
  
  // Helper methods for common test scenarios
  static createExpiredOTP() {
    const now = Date.now(); // Use Date.now() which will be mocked if freezeTime was called
    return {
      otp: '123456',
      expiresAt: new Date(now - (10 * 60 * 1000)), // 10 minutes ago
      createdAt: new Date(now - (15 * 60 * 1000))
    };
  }
  
  static createValidOTP() {
    const now = Date.now(); // Use Date.now() which will be mocked if freezeTime was called
    return {
      otp: '654321',
      expiresAt: new Date(now + (10 * 60 * 1000)), // 10 minutes from now
      createdAt: new Date(now)
    };
  }
  
  static createRecentUser() {
    const now = Date.now(); // Use Date.now() which will be mocked if freezeTime was called
    return {
      createdAt: new Date(now - (7 * 24 * 60 * 60 * 1000)), // 7 days ago
      updatedAt: new Date(now)
    };
  }
}

// OTP mocking utilities
export class MockOTPUtils {
  static validOTP = '123456';
  static expiredOTP = '654321';
  static invalidOTP = '999999';
  static usedOTP = '111111';
  
  static createOTPData(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      phoneNumber: faker.string.numeric(10),
      countryCode: '+1',
      otp: this.validOTP,
      expiresAt: new Date(Date.now() + (15 * 60 * 1000)), // 15 minutes from now
      attempts: 0,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }
  
  static createExpiredOTPData(overrides: Partial<any> = {}) {
    return this.createOTPData({
      otp: this.expiredOTP,
      expiresAt: new Date(Date.now() - (60 * 1000)), // 1 minute ago
      ...overrides
    });
  }
  
  static createMaxAttemptsOTPData(overrides: Partial<any> = {}) {
    return this.createOTPData({
      attempts: 3,
      ...overrides
    });
  }
  
  static createVerifiedOTPData(overrides: Partial<any> = {}) {
    return this.createOTPData({
      verified: true,
      attempts: 1,
      ...overrides
    });
  }
}

// Rate limiting mock utilities  
export class MockRateLimitUtils {
  private static attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  static recordAttempt(key: string, windowMs: number = 60000, maxAttempts: number = 5) {
    const now = Date.now();
    const existing = this.attempts.get(key);
    
    if (!existing || now > existing.resetTime) {
      this.attempts.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return { count: 1, remaining: maxAttempts - 1, resetTime: now + windowMs };
    }
    
    existing.count++;
    return { 
      count: existing.count, 
      remaining: Math.max(0, maxAttempts - existing.count),
      resetTime: existing.resetTime
    };
  }
  
  static isRateLimited(key: string, maxAttempts: number = 5): boolean {
    const existing = this.attempts.get(key);
    if (!existing) return false;
    
    const now = Date.now();
    if (now > existing.resetTime) {
      this.attempts.delete(key);
      return false;
    }
    
    return existing.count >= maxAttempts;
  }
  
  static reset(key?: string) {
    if (key) {
      this.attempts.delete(key);
    } else {
      this.attempts.clear();
    }
  }
  
  static getRemainingTime(key: string): number {
    const existing = this.attempts.get(key);
    if (!existing) return 0;
    
    return Math.max(0, existing.resetTime - Date.now());
  }
}

// Export everything for easy importing
export const AuthMockUtils = {
  JWT: MockJWTUtils,
  Headers: MockAuthHeaders,
  Time: MockTimeUtils,
  OTP: MockOTPUtils,
  RateLimit: MockRateLimitUtils
};

export default AuthMockUtils;