/**
 * MSW Request Handlers
 * Mock API responses for external services
 */

import { http, HttpResponse } from 'msw';

// Meilisearch API handlers
const meilisearchHandlers = [
  // Mock search endpoint
  http.post('*/indexes/*/search', () => {
    return HttpResponse.json({
      hits: [],
      query: '',
      processingTimeMs: 1,
      limit: 20,
      offset: 0,
      estimatedTotalHits: 0
    });
  }),
  
  // Mock index creation
  http.post('*/indexes', () => {
    return HttpResponse.json({
      taskUid: 1,
      indexUid: 'test-index',
      status: 'enqueued',
      type: 'indexCreation',
      enqueuedAt: new Date().toISOString()
    });
  }),
  
  // Mock document addition
  http.post('*/indexes/*/documents', () => {
    return HttpResponse.json({
      taskUid: 2,
      indexUid: 'test-index',
      status: 'enqueued',
      type: 'documentAdditionOrUpdate',
      enqueuedAt: new Date().toISOString()
    });
  })
];

// Email service handlers
const emailHandlers = [
  // Mock email sending
  http.post('*/send-email', () => {
    return HttpResponse.json({
      success: true,
      messageId: 'test-message-id',
      timestamp: new Date().toISOString()
    });
  }),
  
  // Mock email template rendering
  http.post('*/render-template', () => {
    return HttpResponse.json({
      html: '<html><body>Test email</body></html>',
      text: 'Test email',
      subject: 'Test Subject'
    });
  })
];

// File storage handlers
const storageHandlers = [
  // Mock file upload
  http.post('*/upload', () => {
    return HttpResponse.json({
      url: 'https://test-storage.com/test-file.pdf',
      key: 'test-file-key',
      size: 1024,
      contentType: 'application/pdf'
    });
  }),
  
  // Mock file deletion
  http.delete('*/files/*', () => {
    return HttpResponse.json({
      success: true,
      deletedAt: new Date().toISOString()
    });
  })
];

// Export all handlers
export const handlers = [
  ...meilisearchHandlers,
  ...emailHandlers,
  ...storageHandlers
];