/**
 * Enhanced Mock Context Implementation
 * Provides comprehensive Hono Context mocking with all required methods
 */

import { vi } from 'vitest';
import { Context } from 'hono';

export interface MockRequestOptions {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
  query?: Record<string, string>;
}

export interface MockContextOptions {
  request?: MockRequestOptions;
  env?: Record<string, any>;
  jwtPayload?: any;
  variables?: Record<string, any>;
}

/**
 * Creates a comprehensive mock Hono Context with all required methods
 * @param options Configuration options for the mock context
 * @returns Mocked Hono Context
 */
export const createMockContext = (options: MockContextOptions = {}): Context => {
  const {
    request = {},
    env = {},
    jwtPayload = null,
    variables = {}
  } = options;

  const {
    method = 'GET',
    url = 'http://localhost:3000/test',
    headers = {},
    body = {},
    params = {},
    query = {}
  } = request;

  // Create mock headers object
  const mockHeaders = new Headers();
  Object.entries(headers).forEach(([key, value]) => {
    mockHeaders.set(key, value);
  });

  // Create comprehensive mock request object
  const mockRequest = {
    // Core request methods
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(typeof body === 'string' ? body : JSON.stringify(body)),
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
    blob: vi.fn().mockResolvedValue(new Blob()),
    formData: vi.fn().mockResolvedValue(new FormData()),
    
    // Parameter and query methods - key missing methods causing failures
    param: vi.fn().mockImplementation((key: string) => params[key]),
    query: vi.fn().mockImplementation((key: string) => query[key]),
    queries: vi.fn().mockImplementation((key: string) => {
      const value = query[key];
      return value ? [value] : [];
    }),
    header: vi.fn().mockImplementation((key: string) => mockHeaders.get(key)),
    
    // Request properties
    method,
    url,
    headers: mockHeaders,
    
    // Additional Hono request methods
    raw: {
      method,
      url,
      headers: mockHeaders,
      body: JSON.stringify(body)
    },
    
    // Parsing methods
    parseBody: vi.fn().mockResolvedValue(body),
    valid: vi.fn().mockImplementation((target: string) => {
      if (target === 'json') return body;
      if (target === 'query') return query;
      if (target === 'param') return params;
      return {};
    })
  };

  // Create comprehensive mock context
  const mockContext = {
    // Request object with all methods
    req: mockRequest,
    
    // Environment (including Cloudflare Worker bindings)
    env: {
      DB: 'mock-db',
      ...env
    },
    
    // Response methods
    json: vi.fn().mockImplementation((data: any, status?: number, headers?: Record<string, string>) => {
      const responseHeaders = new Headers();
      responseHeaders.set('Content-Type', 'application/json');
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          responseHeaders.set(key, value);
        });
      }
      
      return new Response(JSON.stringify(data), {
        status: status || 200,
        headers: responseHeaders
      });
    }),
    
    text: vi.fn().mockImplementation((text: string, status?: number, headers?: Record<string, string>) => {
      const responseHeaders = new Headers();
      responseHeaders.set('Content-Type', 'text/plain');
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          responseHeaders.set(key, value);
        });
      }
      
      return new Response(text, {
        status: status || 200,
        headers: responseHeaders
      });
    }),
    
    html: vi.fn().mockImplementation((html: string, status?: number, headers?: Record<string, string>) => {
      const responseHeaders = new Headers();
      responseHeaders.set('Content-Type', 'text/html');
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          responseHeaders.set(key, value);
        });
      }
      
      return new Response(html, {
        status: status || 200,
        headers: responseHeaders
      });
    }),
    
    redirect: vi.fn().mockImplementation((location: string, status?: number) => {
      const responseHeaders = new Headers();
      responseHeaders.set('Location', location);
      
      return new Response(null, {
        status: status || 302,
        headers: responseHeaders
      });
    }),
    
    // Response building methods
    status: vi.fn().mockReturnThis(),
    header: vi.fn().mockReturnThis(),
    cookie: vi.fn().mockReturnThis(),
    
    // Context variable management
    get: vi.fn().mockImplementation((key: string) => {
      if (key === 'jwtPayload') return jwtPayload;
      return variables[key];
    }),
    set: vi.fn().mockImplementation((key: string, value: any) => {
      variables[key] = value;
    }),
    var: vi.fn().mockImplementation((key: string, value?: any) => {
      if (value !== undefined) {
        variables[key] = value;
        return mockContext;
      }
      return variables[key];
    }),
    
    // Response creation
    newResponse: vi.fn().mockImplementation((data?: any, init?: ResponseInit) => {
      return new Response(data, init);
    }),
    
    // Body parsing (legacy method names)
    body: vi.fn().mockResolvedValue(body),
    bodyCache: {},
    
    // Execution context
    executionCtx: {
      waitUntil: vi.fn(),
      passThroughOnException: vi.fn()
    },
    
    // Event handling
    event: {
      request: mockRequest
    },
    
    // Additional Hono context properties
    finalized: false,
    error: vi.fn(),
    
    // Runtime info
    runtime: {
      ...globalThis
    }
  };

  return mockContext as any as Context;
};

/**
 * Creates a mock context specifically for authenticated requests
 * @param jwtPayload JWT payload to include in the context
 * @param options Additional context options
 * @returns Authenticated mock context
 */
export const createAuthenticatedMockContext = (
  jwtPayload: any,
  options: MockContextOptions = {}
): Context => {
  return createMockContext({
    ...options,
    jwtPayload
  });
};

/**
 * Creates a mock context for API requests with body data
 * @param body Request body data
 * @param options Additional context options
 * @returns Mock context with body data
 */
export const createMockContextWithBody = (
  body: any,
  options: MockContextOptions = {}
): Context => {
  return createMockContext({
    ...options,
    request: {
      ...options.request,
      body,
      method: 'POST'
    }
  });
};

/**
 * Creates a mock context for requests with URL parameters
 * @param params URL parameters
 * @param options Additional context options
 * @returns Mock context with parameters
 */
export const createMockContextWithParams = (
  params: Record<string, string>,
  options: MockContextOptions = {}
): Context => {
  return createMockContext({
    ...options,
    request: {
      ...options.request,
      params
    }
  });
};

/**
 * Creates a mock context for requests with query parameters
 * @param query Query parameters
 * @param options Additional context options
 * @returns Mock context with query parameters
 */
export const createMockContextWithQuery = (
  query: Record<string, string>,
  options: MockContextOptions = {}
): Context => {
  return createMockContext({
    ...options,
    request: {
      ...options.request,
      query
    }
  });
};

/**
 * Factory for creating different types of mock contexts based on HTTP methods
 */
export const mockContextFactory = {
  GET: (options: MockContextOptions = {}) => createMockContext({
    ...options,
    request: { ...options.request, method: 'GET' }
  }),
  
  POST: (body: any, options: MockContextOptions = {}) => createMockContext({
    ...options,
    request: { ...options.request, method: 'POST', body }
  }),
  
  PUT: (body: any, options: MockContextOptions = {}) => createMockContext({
    ...options,
    request: { ...options.request, method: 'PUT', body }
  }),
  
  PATCH: (body: any, options: MockContextOptions = {}) => createMockContext({
    ...options,
    request: { ...options.request, method: 'PATCH', body }
  }),
  
  DELETE: (options: MockContextOptions = {}) => createMockContext({
    ...options,
    request: { ...options.request, method: 'DELETE' }
  })
};

/**
 * Helper to create mock JWT payload with default values
 * @param overrides Override default JWT payload values
 * @returns Mock JWT payload
 */
export const createMockJWTPayload = (overrides: Partial<any> = {}) => {
  return {
    userId: 'test-user-id',
    phoneNumber: '+1234567890',
    type: 'access',
    exp: Date.now() + 3600000, // 1 hour from now
    ...overrides
  };
};

/**
 * Assert that a mock context method was called with specific parameters
 * @param mockContext The mock context
 * @param method The method name to check
 * @param expectedCalls Array of expected call arguments
 */
export const assertMockContextCalls = (
  mockContext: Context,
  method: string,
  expectedCalls: any[][]
) => {
  const mockMethod = (mockContext as any)[method];
  expect(mockMethod).toHaveBeenCalledTimes(expectedCalls.length);
  
  expectedCalls.forEach((expectedArgs, index) => {
    expect(mockMethod).toHaveBeenNthCalledWith(index + 1, ...expectedArgs);
  });
};