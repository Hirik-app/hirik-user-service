// Recruiter factory for creating test recruiter data
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestRecruiterProfile {
  id: string;
  userId: string;
  fullName?: string;
  companyId?: string;
  jobRoleId?: string;
  workEmail?: string;
  location?: string;
  isVerified: boolean;
  workEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date;
  recruiterVerificationMethodsId?: string;
  verifiedBy?: string;
  verificationDetails?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestRecruiterVerificationMethods {
  id: string;
  method: string;
}

export class RecruiterProfileFactory extends BaseFactory<TestRecruiterProfile> {
  protected defaultAttributes(): Partial<TestRecruiterProfile> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const companyName = faker.company.name();
    
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      fullName: `${firstName} ${lastName}`,
      companyId: faker.string.uuid(),
      jobRoleId: faker.helpers.arrayElement([
        'hr-manager', 'talent-acquisition', 'recruiter', 'hiring-manager'
      ]),
      workEmail: FakeData.workEmail(companyName),
      location: FakeData.location(),
      isVerified: faker.datatype.boolean(),
      workEmailVerified: faker.datatype.boolean(),
      emailVerificationToken: faker.string.uuid(),
      emailVerificationTokenExpiresAt: faker.date.future(),
      recruiterVerificationMethodsId: faker.string.uuid(),
      verifiedBy: faker.string.uuid(),
      verificationDetails: FakeData.verificationDetails(),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestRecruiterProfile> {
    switch (trait) {
      case 'verified':
        return {
          isVerified: true,
          workEmailVerified: true,
          emailVerificationToken: undefined,
          emailVerificationTokenExpiresAt: undefined,
          verifiedBy: faker.string.uuid(),
          verificationDetails: FakeData.verificationDetails()
        };
        
      case 'unverified':
        return {
          isVerified: false,
          workEmailVerified: false,
          emailVerificationToken: faker.string.uuid(),
          emailVerificationTokenExpiresAt: faker.date.future(),
          verifiedBy: undefined,
          verificationDetails: undefined
        };
        
      case 'email_verified_only':
        return {
          isVerified: false,
          workEmailVerified: true,
          emailVerificationToken: undefined,
          emailVerificationTokenExpiresAt: undefined
        };
        
      case 'pending_verification':
        return {
          isVerified: false,
          workEmailVerified: true,
          emailVerificationToken: undefined,
          emailVerificationTokenExpiresAt: undefined,
          verificationDetails: JSON.stringify({
            method: 'manual_review',
            submittedAt: faker.date.recent().toISOString(),
            status: 'pending',
            documents: [
              {
                type: 'linkedin_profile',
                url: faker.internet.url(),
                verified: false
              }
            ]
          })
        };
        
      case 'expired_token':
        return {
          isVerified: false,
          workEmailVerified: false,
          emailVerificationToken: faker.string.uuid(),
          emailVerificationTokenExpiresAt: faker.date.past()
        };
        
      case 'hr_manager':
        return {
          jobRoleId: 'hr-manager',
          fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
          workEmail: FakeData.workEmail('HR Solutions Inc'),
          isVerified: true,
          workEmailVerified: true
        };
        
      case 'talent_acquisition':
        return {
          jobRoleId: 'talent-acquisition',
          fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
          workEmail: FakeData.workEmail('Talent Pro'),
          isVerified: true,
          workEmailVerified: true
        };
        
      case 'startup_recruiter':
        return {
          jobRoleId: 'recruiter',
          companyId: faker.string.uuid(),
          workEmail: FakeData.workEmail('TechStartup'),
          isVerified: true,
          workEmailVerified: true,
          verificationDetails: JSON.stringify({
            method: 'email_domain',
            companySize: 'startup',
            fundingStage: 'series-a',
            verifiedAt: faker.date.recent().toISOString()
          })
        };
        
      case 'enterprise_recruiter':
        return {
          jobRoleId: 'hiring-manager',
          companyId: faker.string.uuid(),
          workEmail: FakeData.workEmail('BigTech Corp'),
          isVerified: true,
          workEmailVerified: true,
          verificationDetails: JSON.stringify({
            method: 'company_verification',
            companySize: 'enterprise',
            industry: 'technology',
            verifiedAt: faker.date.recent().toISOString()
          })
        };
        
      default:
        return {};
    }
  }
}

export class RecruiterVerificationMethodsFactory extends BaseFactory<TestRecruiterVerificationMethods> {
  protected defaultAttributes(): Partial<TestRecruiterVerificationMethods> {
    return {
      id: faker.string.uuid(),
      method: faker.helpers.arrayElement([
        'email_domain', 'linkedin_verification', 'manual_review', 
        'company_verification', 'phone_verification'
      ])
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestRecruiterVerificationMethods> {
    switch (trait) {
      case 'email_domain':
        return { method: 'email_domain' };
      case 'linkedin':
        return { method: 'linkedin_verification' };
      case 'manual':
        return { method: 'manual_review' };
      case 'company':
        return { method: 'company_verification' };
      case 'phone':
        return { method: 'phone_verification' };
      default:
        return {};
    }
  }
}

// Export singleton instances
export const recruiterProfileFactory = new RecruiterProfileFactory();
export const recruiterVerificationMethodsFactory = new RecruiterVerificationMethodsFactory();