// MSW (Mock Service Worker) setup for API mocking
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Define mock handlers for external services
const meilisearchHandlers = [
  // Mock Meilisearch search endpoint
  http.post('http://localhost:7700/indexes/test-index/search', () => {
    return HttpResponse.json({
      hits: [
        {
          id: 'test-job-1',
          title: 'Test Job Title',
          company: 'Test Company',
          location: 'Test Location',
          skills: ['JavaScript', 'TypeScript']
        }
      ],
      query: 'test',
      processingTimeMs: 1,
      limit: 20,
      offset: 0,
      estimatedTotalHits: 1
    });
  }),
  
  // Mock Meilisearch document addition
  http.post('http://localhost:7700/indexes/test-index/documents', () => {
    return HttpResponse.json({
      taskUid: 123,
      indexUid: 'test-index',
      status: 'enqueued'
    });
  }),
  
  // Mock Meilisearch index settings
  http.get('http://localhost:7700/indexes/test-index/settings', () => {
    return HttpResponse.json({
      rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
      searchableAttributes: ['*'],
      displayedAttributes: ['*'],
      stopWords: [],
      synonyms: {},
      distinctAttribute: null
    });
  })
];

const emailServiceHandlers = [
  // Mock email sending service
  http.post('*/send-email', () => {
    return HttpResponse.json({
      success: true,
      messageId: 'test-message-id',
      status: 'sent'
    });
  })
];

const smsServiceHandlers = [
  // Mock SMS/Twilio service
  http.post('https://api.twilio.com/2010-04-01/Accounts/*/Messages.json', () => {
    return HttpResponse.json({
      sid: 'test-message-sid',
      status: 'sent',
      to: '+1234567890',
      from: '+0987654321',
      body: 'Your OTP is: 123456'
    });
  })
];

const fileUploadHandlers = [
  // Mock Cloudflare R2 file upload
  http.put('*/upload/*', () => {
    return HttpResponse.json({
      success: true,
      url: 'https://test-bucket.r2.dev/test-file.pdf',
      key: 'test-file.pdf'
    });
  }),
  
  // Mock file deletion
  http.delete('*/upload/*', () => {
    return HttpResponse.json({
      success: true
    });
  })
];

const externalApiHandlers = [
  // Mock external job service calls
  http.get('http://localhost:3001/jobs/*', () => {
    return HttpResponse.json({
      id: 'test-job-1',
      title: 'Test Job',
      company: 'Test Company',
      description: 'Test job description',
      requirements: ['JavaScript', 'React'],
      location: 'Remote',
      salary: '$100,000'
    });
  }),
  
  // Mock company service calls
  http.get('http://localhost:3002/companies/*', () => {
    return HttpResponse.json({
      id: 'test-company-1',
      name: 'Test Company',
      description: 'A test company',
      website: 'https://testcompany.com',
      employees: '50-100'
    });
  }),
  
  // Mock chat service calls
  http.post('http://localhost:3003/messages', () => {
    return HttpResponse.json({
      id: 'test-message-1',
      content: 'Test message',
      senderId: 'test-user-1',
      receiverId: 'test-user-2',
      timestamp: new Date().toISOString()
    });
  })
];

// Error simulation handlers for testing error scenarios
const errorHandlers = [
  // 500 Internal Server Error
  http.get('*/error/500', () => {
    return new HttpResponse(null, { status: 500 });
  }),
  
  // 404 Not Found
  http.get('*/error/404', () => {
    return new HttpResponse(null, { status: 404 });
  }),
  
  // 429 Too Many Requests
  http.post('*/error/429', () => {
    return new HttpResponse(null, { 
      status: 429,
      headers: {
        'Retry-After': '60'
      }
    });
  }),
  
  // Timeout simulation
  http.get('*/error/timeout', async () => {
    await new Promise(resolve => setTimeout(resolve, 6000));
    return HttpResponse.json({ message: 'This should timeout' });
  })
];

// Combine all handlers
const handlers = [
  ...meilisearchHandlers,
  ...emailServiceHandlers,
  ...smsServiceHandlers,
  ...fileUploadHandlers,
  ...externalApiHandlers,
  ...errorHandlers
];

// Create and export the mock server
export function setupMockServer() {
  const server = setupServer(...handlers);
  
  // Add server utilities for test control
  return {
    ...server,
    
    // Add custom handlers dynamically
    addHandlers: (...newHandlers: any[]) => {
      server.use(...newHandlers);
    },
    
    // Reset to original handlers
    resetToOriginalHandlers: () => {
      server.resetHandlers(...handlers);
    },
    
    // Simulate network errors
    simulateNetworkError: (url: string) => {
      server.use(
        http.get(url, () => {
          return HttpResponse.error();
        })
      );
    },
    
    // Simulate slow responses
    simulateSlowResponse: (url: string, delay: number = 3000) => {
      server.use(
        http.get(url, async () => {
          await new Promise(resolve => setTimeout(resolve, delay));
          return HttpResponse.json({ delayed: true });
        })
      );
    }
  };
}

export { handlers };