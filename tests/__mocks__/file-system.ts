/**
 * File System Mocks
 * Mock implementations for file upload, processing, and cloud storage
 */

import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

// Mock file object structure
export interface MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
  text: () => Promise<string>;
  stream: () => ReadableStream;
}

// Create mock file
export const createMockFile = (overrides: Partial<MockFile> = {}): MockFile => {
  const defaultFile = {
    name: `${faker.lorem.word()}.pdf`,
    size: faker.number.int({ min: 1024, max: 5242880 }), // 1KB to 5MB
    type: 'application/pdf',
    lastModified: Date.now(),
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(1024)),
    text: vi.fn().mockResolvedValue('Mock file content'),
    stream: vi.fn().mockReturnValue(new ReadableStream())
  };
  
  return { ...defaultFile, ...overrides };
};

// Mock file processor for resume parsing
export const mockFileProcessor = {
  // Parse resume content
  parseResume: vi.fn().mockImplementation((file: MockFile) => {
    return Promise.resolve({
      text: 'John Doe\nSoftware Engineer\nExperience: 5 years\nSkills: JavaScript, React, Node.js',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: [
        {
          title: 'Software Engineer',
          company: 'Tech Corp',
          duration: '2020-2023',
          description: 'Developed web applications'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'University of Technology',
          year: '2020'
        }
      ],
      contact: {
        email: 'john.doe@example.com',
        phone: '+1234567890'
      }
    });
  }),
  
  // Validate file format
  validateFile: vi.fn().mockImplementation((file: MockFile) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return {
      isValid: allowedTypes.includes(file.type) && file.size <= maxSize,
      errors: [
        ...(allowedTypes.includes(file.type) ? [] : ['Invalid file type']),
        ...(file.size <= maxSize ? [] : ['File too large'])
      ]
    };
  }),
  
  // Extract metadata
  extractMetadata: vi.fn().mockImplementation((file: MockFile) => {
    return Promise.resolve({
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      checksum: faker.string.alphanumeric(32)
    });
  })
};

// Mock cloud storage service
export const mockCloudStorage = {
  // Upload file to cloud storage
  upload: vi.fn().mockImplementation((file: MockFile, key: string) => {
    return Promise.resolve({
      url: `https://mock-storage.com/${key}`,
      key: key,
      bucket: 'mock-bucket',
      size: file.size,
      contentType: file.type,
      etag: faker.string.alphanumeric(32),
      uploadedAt: new Date().toISOString()
    });
  }),
  
  // Delete file from cloud storage
  delete: vi.fn().mockImplementation((key: string) => {
    return Promise.resolve({
      success: true,
      key: key,
      deletedAt: new Date().toISOString()
    });
  }),
  
  // Get file URL
  getUrl: vi.fn().mockImplementation((key: string) => {
    return `https://mock-storage.com/${key}`;
  }),
  
  // Get signed URL for temporary access
  getSignedUrl: vi.fn().mockImplementation((key: string, expiresIn: number = 3600) => {
    return Promise.resolve({
      url: `https://mock-storage.com/${key}?signature=${faker.string.alphanumeric(32)}`,
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString()
    });
  }),
  
  // Check if file exists
  exists: vi.fn().mockImplementation((key: string) => {
    return Promise.resolve(true);
  }),
  
  // Get file metadata
  getMetadata: vi.fn().mockImplementation((key: string) => {
    return Promise.resolve({
      key: key,
      size: faker.number.int({ min: 1024, max: 5242880 }),
      contentType: 'application/pdf',
      lastModified: faker.date.recent().toISOString(),
      etag: faker.string.alphanumeric(32)
    });
  })
};

// File utilities for testing
export const fileUtils = {
  // Create test file with specific content
  createTestFile: (content: string, fileName: string = 'test.pdf', mimeType: string = 'application/pdf'): MockFile => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    
    return {
      name: fileName,
      size: data.length,
      type: mimeType,
      lastModified: Date.now(),
      arrayBuffer: vi.fn().mockResolvedValue(data.buffer),
      text: vi.fn().mockResolvedValue(content),
      stream: vi.fn().mockReturnValue(new ReadableStream({
        start(controller) {
          controller.enqueue(data);
          controller.close();
        }
      }))
    };
  },
  
  // Create large file for testing size limits
  createLargeFile: (sizeInMB: number): MockFile => {
    const size = sizeInMB * 1024 * 1024;
    return createMockFile({
      name: 'large-file.pdf',
      size: size,
      type: 'application/pdf'
    });
  },
  
  // Create file with invalid type
  createInvalidFile: (): MockFile => {
    return createMockFile({
      name: 'invalid.exe',
      type: 'application/x-executable'
    });
  },
  
  // Simulate file corruption
  createCorruptedFile: (): MockFile => {
    const file = createMockFile();
    file.arrayBuffer = vi.fn().mockRejectedValue(new Error('File corrupted'));
    file.text = vi.fn().mockRejectedValue(new Error('File corrupted'));
    return file;
  }
};

// Mock FormData for file uploads
export const createMockFormData = (file: MockFile, fieldName: string = 'file') => {
  const formData = new FormData();
  formData.append(fieldName, file as any);
  return formData;
};

// Reset all file system mocks
export const resetFileSystemMocks = () => {
  Object.values(mockFileProcessor).forEach(fn => {
    if (typeof fn === 'function' && 'mockReset' in fn) {
      fn.mockReset();
    }
  });
  
  Object.values(mockCloudStorage).forEach(fn => {
    if (typeof fn === 'function' && 'mockReset' in fn) {
      fn.mockReset();
    }
  });
};

// Setup default mock implementations
export const setupFileSystemMocks = () => {
  // Reset all mocks first
  resetFileSystemMocks();
  
  // Set up default successful responses
  mockFileProcessor.parseResume.mockImplementation((file: MockFile) => {
    return Promise.resolve({
      text: 'Mock resume content',
      skills: ['JavaScript', 'TypeScript', 'React'],
      experience: [],
      education: [],
      contact: { email: 'test@example.com' }
    });
  });
  
  mockFileProcessor.validateFile.mockImplementation((file: MockFile) => {
    return {
      isValid: true,
      errors: []
    };
  });
  
  mockCloudStorage.upload.mockImplementation((file: MockFile, key: string) => {
    return Promise.resolve({
      url: `https://mock-storage.com/${key}`,
      key: key,
      bucket: 'mock-bucket',
      size: file.size,
      contentType: file.type,
      etag: faker.string.alphanumeric(32),
      uploadedAt: new Date().toISOString()
    });
  });
};