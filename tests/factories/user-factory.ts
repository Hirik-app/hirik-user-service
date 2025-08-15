// User factory for creating test user data
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestUser {
  id: string;
  phoneNumber: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserFactory extends BaseFactory<TestUser> {
  protected defaultAttributes(): Partial<TestUser> {
    const { phoneNumber, countryCode } = FakeData.phoneWithCountry();
    
    return {
      id: faker.string.uuid(),
      phoneNumber,
      countryCode,
      createdAt: faker.date.past({ years: 2 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestUser> {
    switch (trait) {
      case 'us_user':
        return {
          phoneNumber: faker.string.numeric(10),
          countryCode: '+1'
        };
        
      case 'uk_user':
        return {
          phoneNumber: faker.string.numeric(10),
          countryCode: '+44'
        };
        
      case 'india_user':
        return {
          phoneNumber: faker.string.numeric(10),
          countryCode: '+91'
        };
        
      case 'recent_user':
        return {
          createdAt: faker.date.recent({ days: 7 }),
          updatedAt: faker.date.recent({ days: 1 })
        };
        
      case 'old_user':
        return {
          createdAt: faker.date.past({ years: 2 }),
          updatedAt: faker.date.past({ months: 6 })
        };
        
      default:
        return {};
    }
  }
}

// Export singleton instance
export const userFactory = new UserFactory();