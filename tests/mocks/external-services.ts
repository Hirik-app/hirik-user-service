// External service mocks for Meilisearch, email, SMS, etc.
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

// Meilisearch Mock
export class MockMeilisearchClient {
  private indexes: Map<string, MockMeilisearchIndex> = new Map();
  private _isHealthy = true;
  
  constructor(config?: { host: string; apiKey: string }) {
    // Initialize with default test index
    this.indexes.set('test-users', new MockMeilisearchIndex('test-users'));
  }
  
  index(indexUid: string): MockMeilisearchIndex {
    if (!this.indexes.has(indexUid)) {
      this.indexes.set(indexUid, new MockMeilisearchIndex(indexUid));
    }
    return this.indexes.get(indexUid)!;
  }
  
  async getIndexes() {
    return Array.from(this.indexes.values()).map(index => ({
      uid: index.uid,
      primaryKey: index.primaryKey,
      createdAt: index.createdAt,
      updatedAt: index.updatedAt
    }));
  }
  
  async createIndex(uid: string, options?: { primaryKey?: string }) {
    const index = new MockMeilisearchIndex(uid, options?.primaryKey);
    this.indexes.set(uid, index);
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: uid,
      status: 'enqueued',
      type: 'indexCreation',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async deleteIndex(uid: string) {
    const deleted = this.indexes.delete(uid);
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: uid,
      status: deleted ? 'enqueued' : 'failed',
      type: 'indexDeletion',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async getTask(taskUid: number) {
    return {
      uid: taskUid,
      status: faker.helpers.arrayElement(['enqueued', 'processing', 'succeeded', 'failed']),
      type: faker.helpers.arrayElement(['indexCreation', 'documentAdditionOrUpdate', 'indexDeletion']),
      enqueuedAt: faker.date.recent().toISOString(),
      startedAt: faker.date.recent().toISOString(),
      finishedAt: faker.date.recent().toISOString()
    };
  }
  
  async isHealthy() {
    return this._isHealthy;
  }
  
  async health() {
    return { status: this._isHealthy ? 'available' : 'unavailable' };
  }
  
  // Test utilities
  setHealthy(healthy: boolean) {
    this._isHealthy = healthy;
  }
  
  reset() {
    this.indexes.clear();
    this.indexes.set('test-users', new MockMeilisearchIndex('test-users'));
    this._isHealthy = true;
  }
  
  getIndex(uid: string) {
    return this.indexes.get(uid);
  }
}

class MockMeilisearchIndex {
  public uid: string;
  public primaryKey: string;
  public createdAt: string;
  public updatedAt: string;
  private documents: Map<string, any> = new Map();
  private settings: any = {
    rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
    searchableAttributes: ['*'],
    displayedAttributes: ['*'],
    stopWords: [],
    synonyms: {},
    distinctAttribute: null
  };
  
  constructor(uid: string, primaryKey: string = 'id') {
    this.uid = uid;
    this.primaryKey = primaryKey;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
  
  async search(query: string, options: any = {}) {
    const {
      limit = 20,
      offset = 0,
      filter = null,
      sort = null,
      facets = null,
      attributesToRetrieve = ['*']
    } = options;
    
    let results = Array.from(this.documents.values());
    
    // Simple query matching (in real implementation, this would be more sophisticated)
    if (query) {
      const queryLower = query.toLowerCase();
      results = results.filter(doc => {
        return Object.values(doc).some(value => 
          String(value).toLowerCase().includes(queryLower)
        );
      });
    }
    
    // Apply pagination
    const paginatedResults = results.slice(offset, offset + limit);
    
    return {
      hits: paginatedResults,
      query,
      processingTimeMs: faker.number.int({ min: 1, max: 50 }),
      limit,
      offset,
      estimatedTotalHits: results.length,
      facetDistribution: facets ? {} : undefined
    };
  }
  
  async addDocuments(documents: any[], options?: { primaryKey?: string }) {
    documents.forEach(doc => {
      const key = doc[this.primaryKey] || faker.string.uuid();
      this.documents.set(key, { ...doc, [this.primaryKey]: key });
    });
    
    this.updatedAt = new Date().toISOString();
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: this.uid,
      status: 'enqueued',
      type: 'documentAdditionOrUpdate',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async addDocumentsInBatches(documents: any[], batchSize: number = 1000) {
    const batches = [];
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      const task = await this.addDocuments(batch);
      batches.push(task);
    }
    return batches;
  }
  
  async updateDocuments(documents: any[]) {
    return this.addDocuments(documents);
  }
  
  async deleteDocument(id: string) {
    const deleted = this.documents.delete(id);
    this.updatedAt = new Date().toISOString();
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: this.uid,
      status: deleted ? 'enqueued' : 'failed',
      type: 'documentDeletion',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async deleteDocuments(ids: string[]) {
    let deletedCount = 0;
    ids.forEach(id => {
      if (this.documents.delete(id)) {
        deletedCount++;
      }
    });
    
    this.updatedAt = new Date().toISOString();
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: this.uid,
      status: 'enqueued',
      type: 'documentDeletion',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async deleteAllDocuments() {
    this.documents.clear();
    this.updatedAt = new Date().toISOString();
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: this.uid,
      status: 'enqueued',
      type: 'documentDeletion',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async getDocument(id: string) {
    return this.documents.get(id) || null;
  }
  
  async getDocuments(options: { limit?: number; offset?: number } = {}) {
    const { limit = 20, offset = 0 } = options;
    const docs = Array.from(this.documents.values());
    
    return {
      results: docs.slice(offset, offset + limit),
      offset,
      limit,
      total: docs.length
    };
  }
  
  async getStats() {
    return {
      numberOfDocuments: this.documents.size,
      isIndexing: false,
      fieldDistribution: {}
    };
  }
  
  async getSettings() {
    return { ...this.settings };
  }
  
  async updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
    this.updatedAt = new Date().toISOString();
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: this.uid,
      status: 'enqueued',
      type: 'settingsUpdate',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  async resetSettings() {
    this.settings = {
      rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
      searchableAttributes: ['*'],
      displayedAttributes: ['*'],
      stopWords: [],
      synonyms: {},
      distinctAttribute: null
    };
    
    return {
      taskUid: faker.number.int({ min: 1, max: 10000 }),
      indexUid: this.uid,
      status: 'enqueued',
      type: 'settingsUpdate',
      enqueuedAt: new Date().toISOString()
    };
  }
  
  // Test utilities
  seedDocuments(docs: any[]) {
    docs.forEach(doc => {
      const key = doc[this.primaryKey] || faker.string.uuid();
      this.documents.set(key, { ...doc, [this.primaryKey]: key });
    });
  }
  
  getDocumentCount() {
    return this.documents.size;
  }
  
  hasDocument(id: string) {
    return this.documents.has(id);
  }
  
  clear() {
    this.documents.clear();
  }
}

// Email Service Mock (SendGrid/Generic)
export class MockEmailService {
  private sentEmails: Array<{
    to: string[];
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: any;
    sentAt: Date;
  }> = [];
  
  private shouldFail = false;
  private failureMessage = 'Mock email service failure';
  
  async send(emailData: {
    to: string | string[];
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: any;
  }) {
    if (this.shouldFail) {
      throw new Error(this.failureMessage);
    }
    
    const email = {
      ...emailData,
      to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
      sentAt: new Date()
    };
    
    this.sentEmails.push(email);
    
    return {
      messageId: faker.string.uuid(),
      status: 'sent'
    };
  }
  
  async sendMultiple(emails: any[]) {
    return Promise.all(emails.map(email => this.send(email)));
  }
  
  // Test utilities
  getSentEmails() {
    return [...this.sentEmails];
  }
  
  getEmailsSentTo(recipient: string) {
    return this.sentEmails.filter(email => email.to.includes(recipient));
  }
  
  getEmailsWithSubject(subject: string) {
    return this.sentEmails.filter(email => email.subject.includes(subject));
  }
  
  getLastEmail() {
    return this.sentEmails[this.sentEmails.length - 1];
  }
  
  clearSentEmails() {
    this.sentEmails = [];
  }
  
  simulateFailure(shouldFail = true, message = 'Mock email service failure') {
    this.shouldFail = shouldFail;
    this.failureMessage = message;
  }
  
  getEmailCount() {
    return this.sentEmails.length;
  }
}

// SMS Service Mock (Twilio)
export class MockSMSService {
  private sentMessages: Array<{
    to: string;
    from: string;
    body: string;
    sid: string;
    status: string;
    sentAt: Date;
  }> = [];
  
  private shouldFail = false;
  private failureMessage = 'Mock SMS service failure';
  
  async send(messageData: {
    to: string;
    from: string;
    body: string;
  }) {
    if (this.shouldFail) {
      throw new Error(this.failureMessage);
    }
    
    const message = {
      ...messageData,
      sid: faker.string.alphanumeric(34),
      status: 'sent',
      sentAt: new Date()
    };
    
    this.sentMessages.push(message);
    
    return {
      sid: message.sid,
      status: message.status,
      to: message.to,
      from: message.from,
      body: message.body
    };
  }
  
  async getMessageStatus(sid: string) {
    const message = this.sentMessages.find(msg => msg.sid === sid);
    return message ? {
      sid: message.sid,
      status: faker.helpers.arrayElement(['sent', 'delivered', 'failed']),
      to: message.to,
      from: message.from
    } : null;
  }
  
  // Test utilities
  getSentMessages() {
    return [...this.sentMessages];
  }
  
  getMessagesSentTo(recipient: string) {
    return this.sentMessages.filter(msg => msg.to === recipient);
  }
  
  getMessagesWithBody(bodyContent: string) {
    return this.sentMessages.filter(msg => msg.body.includes(bodyContent));
  }
  
  getLastMessage() {
    return this.sentMessages[this.sentMessages.length - 1];
  }
  
  clearSentMessages() {
    this.sentMessages = [];
  }
  
  simulateFailure(shouldFail = true, message = 'Mock SMS service failure') {
    this.shouldFail = shouldFail;
    this.failureMessage = message;
  }
  
  getMessageCount() {
    return this.sentMessages.length;
  }
}

// File Upload Service Mock (Cloudflare R2 / Generic Storage)
export class MockFileUploadService {
  private uploadedFiles: Map<string, {
    key: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    uploadedAt: Date;
  }> = new Map();
  
  private shouldFail = false;
  private failureMessage = 'Mock file upload failure';
  
  async upload(file: {
    originalName: string;
    mimeType: string;
    size: number;
    buffer?: Buffer;
    key?: string;
  }) {
    if (this.shouldFail) {
      throw new Error(this.failureMessage);
    }
    
    const key = file.key || faker.string.uuid();
    const url = `https://storage.example.com/uploads/${key}/${file.originalName}`;
    
    const uploadedFile = {
      key,
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      url,
      uploadedAt: new Date()
    };
    
    this.uploadedFiles.set(key, uploadedFile);
    
    return {
      key,
      url,
      success: true
    };
  }
  
  async delete(key: string) {
    const deleted = this.uploadedFiles.delete(key);
    return { success: deleted };
  }
  
  async getFileInfo(key: string) {
    return this.uploadedFiles.get(key) || null;
  }
  
  async getDownloadUrl(key: string, expirationSeconds = 3600) {
    const file = this.uploadedFiles.get(key);
    if (!file) return null;
    
    return `${file.url}?expires=${Date.now() + (expirationSeconds * 1000)}`;
  }
  
  // Test utilities
  getUploadedFiles() {
    return Array.from(this.uploadedFiles.values());
  }
  
  hasFile(key: string) {
    return this.uploadedFiles.has(key);
  }
  
  getFileCount() {
    return this.uploadedFiles.size;
  }
  
  clearFiles() {
    this.uploadedFiles.clear();
  }
  
  simulateFailure(shouldFail = true, message = 'Mock file upload failure') {
    this.shouldFail = shouldFail;
    this.failureMessage = message;
  }
}

// Combined external services mock
export const ExternalServiceMocks = {
  Meilisearch: MockMeilisearchClient,
  Email: MockEmailService,
  SMS: MockSMSService,
  FileUpload: MockFileUploadService,
  
  // Factory methods for easy setup
  createMeilisearch: (config?: any) => new MockMeilisearchClient(config),
  createEmailService: () => new MockEmailService(),
  createSMSService: () => new MockSMSService(),
  createFileUpload: () => new MockFileUploadService()
};

export default ExternalServiceMocks;