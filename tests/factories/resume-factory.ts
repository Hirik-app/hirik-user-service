// Resume and supporting data factories
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestResume {
  id: string;
  profileId: string;
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType: string;
  isDefault: boolean;
  isActive: boolean;
  uploadedAt: Date;
  updatedAt: Date;
}

export interface TestSavedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
}

export interface TestSkillUserMap {
  id: string;
  skillId: string;
  profileId: string;
  createdAt: Date;
}

export interface TestFCMToken {
  id: string;
  userId: string;
  token: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestOTP {
  id: string;
  phoneNumber: string;
  countryCode: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  userId?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestEmailOTP {
  id: string;
  email: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  userId?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ResumeFactory extends BaseFactory<TestResume> {
  protected defaultAttributes(): Partial<TestResume> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fileName = `${firstName}_${lastName}_Resume.pdf`;
    
    return {
      id: faker.string.uuid(),
      profileId: faker.string.uuid(),
      title: faker.helpers.arrayElement([
        'Software Engineer Resume',
        'Frontend Developer CV',
        'Backend Engineer Resume',
        'Full Stack Developer CV',
        'Senior Software Engineer Resume'
      ]),
      fileName,
      fileUrl: `https://storage.example.com/resumes/${faker.string.uuid()}/${fileName}`,
      fileSize: faker.number.int({ min: 100000, max: 2000000 }),
      mimeType: faker.helpers.arrayElement([
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]),
      isDefault: faker.datatype.boolean({ probability: 0.4 }),
      isActive: faker.datatype.boolean({ probability: 0.9 }),
      uploadedAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestResume> {
    switch (trait) {
      case 'default_resume':
        return {
          isDefault: true,
          isActive: true,
          title: 'Primary Resume',
          mimeType: 'application/pdf'
        };
        
      case 'inactive_resume':
        return {
          isDefault: false,
          isActive: false,
          title: 'Old Resume - Archived'
        };
        
      case 'pdf_resume':
        return {
          mimeType: 'application/pdf',
          fileName: `${faker.person.firstName()}_${faker.person.lastName()}_Resume.pdf`,
          fileSize: faker.number.int({ min: 200000, max: 1500000 })
        };
        
      case 'word_resume':
        return {
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          fileName: `${faker.person.firstName()}_${faker.person.lastName()}_Resume.docx`,
          fileSize: faker.number.int({ min: 50000, max: 800000 })
        };
        
      case 'recent_upload':
        return {
          uploadedAt: faker.date.recent({ days: 7 }),
          updatedAt: faker.date.recent({ days: 1 }),
          isActive: true
        };
        
      case 'large_file':
        return {
          fileSize: faker.number.int({ min: 5000000, max: 10000000 }),
          title: 'Comprehensive Portfolio Resume'
        };
        
      default:
        return {};
    }
  }
}

export class SavedJobFactory extends BaseFactory<TestSavedJob> {
  protected defaultAttributes(): Partial<TestSavedJob> {
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      jobId: faker.string.uuid(),
      createdAt: faker.date.past({ months: 6 })
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestSavedJob> {
    switch (trait) {
      case 'recent':
        return {
          createdAt: faker.date.recent({ days: 7 })
        };
        
      case 'old':
        return {
          createdAt: faker.date.past({ years: 1 })
        };
        
      default:
        return {};
    }
  }
}

export class SkillUserMapFactory extends BaseFactory<TestSkillUserMap> {
  protected defaultAttributes(): Partial<TestSkillUserMap> {
    return {
      id: faker.string.uuid(),
      skillId: faker.helpers.arrayElement([
        'javascript', 'typescript', 'react', 'nodejs', 'python',
        'java', 'golang', 'rust', 'sql', 'mongodb', 'aws', 'docker',
        'kubernetes', 'graphql', 'redux', 'vue', 'angular', 'express'
      ]),
      profileId: faker.string.uuid(),
      createdAt: faker.date.past({ years: 1 })
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestSkillUserMap> {
    switch (trait) {
      case 'frontend':
        return {
          skillId: faker.helpers.arrayElement([
            'javascript', 'typescript', 'react', 'vue', 'angular', 'css', 'html'
          ])
        };
        
      case 'backend':
        return {
          skillId: faker.helpers.arrayElement([
            'nodejs', 'python', 'java', 'golang', 'rust', 'sql', 'mongodb'
          ])
        };
        
      case 'devops':
        return {
          skillId: faker.helpers.arrayElement([
            'aws', 'docker', 'kubernetes', 'terraform', 'jenkins', 'git'
          ])
        };
        
      default:
        return {};
    }
  }
}

export class FCMTokenFactory extends BaseFactory<TestFCMToken> {
  protected defaultAttributes(): Partial<TestFCMToken> {
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      token: faker.string.alphanumeric({ length: 163 }), // FCM token length
      platform: faker.helpers.arrayElement(['ios', 'android']),
      createdAt: faker.date.past({ months: 3 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestFCMToken> {
    switch (trait) {
      case 'ios':
        return { platform: 'ios' };
      case 'android':
        return { platform: 'android' };
      case 'recent':
        return {
          createdAt: faker.date.recent({ days: 7 }),
          updatedAt: faker.date.recent({ days: 1 })
        };
      default:
        return {};
    }
  }
}

export class OTPFactory extends BaseFactory<TestOTP> {
  protected defaultAttributes(): Partial<TestOTP> {
    const { phoneNumber, countryCode } = FakeData.phoneWithCountry();
    
    return {
      id: faker.string.uuid(),
      phoneNumber,
      countryCode,
      otp: faker.string.numeric(6),
      expiresAt: faker.date.future({ minutes: 15 }),
      attempts: faker.number.int({ min: 0, max: 3 }),
      userId: faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.7 }),
      verified: faker.datatype.boolean({ probability: 0.6 }),
      createdAt: faker.date.recent({ minutes: 10 }),
      updatedAt: faker.date.recent({ minutes: 5 })
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestOTP> {
    switch (trait) {
      case 'valid':
        return {
          otp: '123456',
          expiresAt: faker.date.future({ minutes: 10 }),
          attempts: 0,
          verified: false
        };
        
      case 'expired':
        return {
          expiresAt: faker.date.past({ minutes: 5 }),
          verified: false
        };
        
      case 'verified':
        return {
          verified: true,
          attempts: 1
        };
        
      case 'max_attempts':
        return {
          attempts: 3,
          verified: false
        };
        
      default:
        return {};
    }
  }
}

export class EmailOTPFactory extends BaseFactory<TestEmailOTP> {
  protected defaultAttributes(): Partial<TestEmailOTP> {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      otp: faker.string.numeric(6),
      expiresAt: faker.date.future({ minutes: 15 }),
      attempts: faker.number.int({ min: 0, max: 3 }),
      userId: faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.7 }),
      verified: faker.datatype.boolean({ probability: 0.6 }),
      createdAt: faker.date.recent({ minutes: 10 }),
      updatedAt: faker.date.recent({ minutes: 5 })
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestEmailOTP> {
    switch (trait) {
      case 'valid':
        return {
          otp: '654321',
          expiresAt: faker.date.future({ minutes: 10 }),
          attempts: 0,
          verified: false
        };
        
      case 'expired':
        return {
          expiresAt: faker.date.past({ minutes: 5 }),
          verified: false
        };
        
      case 'verified':
        return {
          verified: true,
          attempts: 1
        };
        
      case 'work_email':
        return {
          email: FakeData.workEmail()
        };
        
      default:
        return {};
    }
  }
}

// Export singleton instances
export const resumeFactory = new ResumeFactory();
export const savedJobFactory = new SavedJobFactory();
export const skillUserMapFactory = new SkillUserMapFactory();
export const fcmTokenFactory = new FCMTokenFactory();
export const otpFactory = new OTPFactory();
export const emailOtpFactory = new EmailOTPFactory();