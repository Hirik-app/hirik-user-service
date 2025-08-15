// Preferences factories for creating test preference data
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestNotificationPreferences {
  id: string;
  userId: string;
  jobMatches: boolean;
  applications: boolean;
  interviews: boolean;
  messages: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  quietHours?: string;
  frequency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestJobSearchPreferences {
  id: string;
  userId: string;
  desiredJobTypes: string;
  minSalary?: number;
  maxSalary?: number;
  salaryCurrency: string;
  salaryPeriod: string;
  desiredLocations?: string;
  isRemoteOnly: boolean;
  isWillingToRelocate: boolean;
  maxCommuteMiles?: number;
  desiredRoles: string;
  desiredSkills: string;
  yearsOfExperience?: string;
  desiredIndustries: string;
  minCompanySize?: number;
  maxCompanySize?: number;
  excludedCompanies: string;
  isSearchActive: boolean;
  lastSearchDate?: Date;
  savedSearches?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class NotificationPreferencesFactory extends BaseFactory<TestNotificationPreferences> {
  protected defaultAttributes(): Partial<TestNotificationPreferences> {
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      jobMatches: faker.datatype.boolean({ probability: 0.8 }),
      applications: faker.datatype.boolean({ probability: 0.9 }),
      interviews: faker.datatype.boolean({ probability: 0.95 }),
      messages: faker.datatype.boolean({ probability: 0.85 }),
      emailEnabled: faker.datatype.boolean({ probability: 0.7 }),
      pushEnabled: faker.datatype.boolean({ probability: 0.8 }),
      quietHours: faker.helpers.maybe(() => FakeData.quietHours(), { probability: 0.6 }),
      frequency: faker.helpers.arrayElement(['immediate', 'daily', 'weekly']),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestNotificationPreferences> {
    switch (trait) {
      case 'all_enabled':
        return {
          jobMatches: true,
          applications: true,
          interviews: true,
          messages: true,
          emailEnabled: true,
          pushEnabled: true,
          frequency: 'immediate'
        };
        
      case 'minimal':
        return {
          jobMatches: false,
          applications: true,
          interviews: true,
          messages: false,
          emailEnabled: false,
          pushEnabled: true,
          frequency: 'daily'
        };
        
      case 'email_only':
        return {
          emailEnabled: true,
          pushEnabled: false,
          frequency: 'daily'
        };
        
      case 'push_only':
        return {
          emailEnabled: false,
          pushEnabled: true,
          frequency: 'immediate'
        };
        
      case 'quiet_hours':
        return {
          quietHours: JSON.stringify({
            enabled: true,
            startTime: '22:00',
            endTime: '08:00',
            timezone: 'America/New_York'
          })
        };
        
      case 'weekly_digest':
        return {
          frequency: 'weekly',
          jobMatches: true,
          applications: true,
          interviews: true,
          messages: false
        };
        
      default:
        return {};
    }
  }
}

export class JobSearchPreferencesFactory extends BaseFactory<TestJobSearchPreferences> {
  protected defaultAttributes(): Partial<TestJobSearchPreferences> {
    const minSalary = faker.number.int({ min: 60000, max: 120000 });
    const maxSalary = minSalary + faker.number.int({ min: 20000, max: 80000 });
    
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      desiredJobTypes: FakeData.jobTypes(),
      minSalary,
      maxSalary,
      salaryCurrency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'INR']),
      salaryPeriod: faker.helpers.arrayElement(['yearly', 'monthly', 'hourly']),
      desiredLocations: FakeData.locationPreferences(),
      isRemoteOnly: faker.datatype.boolean({ probability: 0.3 }),
      isWillingToRelocate: faker.datatype.boolean({ probability: 0.4 }),
      maxCommuteMiles: faker.helpers.maybe(() => 
        faker.number.int({ min: 10, max: 50 }), { probability: 0.7 }
      ),
      desiredRoles: FakeData.roleIds(),
      desiredSkills: FakeData.skillIds(),
      yearsOfExperience: FakeData.experienceLevel(),
      desiredIndustries: FakeData.industryIds(),
      minCompanySize: faker.helpers.maybe(() => 
        faker.number.int({ min: 10, max: 500 }), { probability: 0.6 }
      ),
      maxCompanySize: faker.helpers.maybe(() => 
        faker.number.int({ min: 1000, max: 50000 }), { probability: 0.6 }
      ),
      excludedCompanies: faker.helpers.maybe(() => 
        FakeData.companyIds(), { probability: 0.3 }
      ),
      isSearchActive: faker.datatype.boolean({ probability: 0.7 }),
      lastSearchDate: faker.helpers.maybe(() => 
        faker.date.recent({ days: 30 }), { probability: 0.8 }
      ),
      savedSearches: faker.helpers.maybe(() => 
        FakeData.savedSearches(), { probability: 0.5 }
      ),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestJobSearchPreferences> {
    switch (trait) {
      case 'remote_only':
        return {
          isRemoteOnly: true,
          isWillingToRelocate: false,
          maxCommuteMiles: undefined,
          desiredLocations: JSON.stringify([
            { city: 'Remote', state: null, country: null }
          ])
        };
        
      case 'local_only':
        return {
          isRemoteOnly: false,
          isWillingToRelocate: false,
          maxCommuteMiles: faker.number.int({ min: 5, max: 25 }),
          desiredLocations: JSON.stringify([
            { 
              city: faker.location.city(), 
              state: faker.location.state(), 
              country: 'USA' 
            }
          ])
        };
        
      case 'flexible':
        return {
          isRemoteOnly: false,
          isWillingToRelocate: true,
          maxCommuteMiles: 40,
          desiredJobTypes: JSON.stringify(['full-time', 'part-time', 'contract'])
        };
        
      case 'high_salary':
        return {
          minSalary: 150000,
          maxSalary: 300000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          yearsOfExperience: faker.helpers.arrayElement(['5-8 years', '8+ years'])
        };
        
      case 'entry_level':
        return {
          minSalary: 60000,
          maxSalary: 90000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          yearsOfExperience: faker.helpers.arrayElement(['0-1 years', '1-3 years'])
        };
        
      case 'startup_focused':
        return {
          minCompanySize: 10,
          maxCompanySize: 200,
          desiredIndustries: JSON.stringify(['technology', 'fintech', 'healthtech']),
          desiredJobTypes: JSON.stringify(['full-time']),
          isWillingToRelocate: true
        };
        
      case 'big_tech':
        return {
          minCompanySize: 10000,
          maxCompanySize: undefined,
          desiredIndustries: JSON.stringify(['technology', 'software']),
          minSalary: 120000,
          maxSalary: 250000,
          excludedCompanies: JSON.stringify([])
        };
        
      case 'inactive':
        return {
          isSearchActive: false,
          lastSearchDate: faker.date.past({ years: 1 }),
          savedSearches: undefined
        };
        
      case 'active_searcher':
        return {
          isSearchActive: true,
          lastSearchDate: faker.date.recent({ days: 7 }),
          savedSearches: FakeData.savedSearches()
        };
        
      case 'contract_work':
        return {
          desiredJobTypes: JSON.stringify(['contract', 'freelance']),
          salaryPeriod: 'hourly',
          minSalary: 50,
          maxSalary: 150,
          isRemoteOnly: true
        };
        
      default:
        return {};
    }
  }
}

// Export singleton instances
export const notificationPreferencesFactory = new NotificationPreferencesFactory();
export const jobSearchPreferencesFactory = new JobSearchPreferencesFactory();