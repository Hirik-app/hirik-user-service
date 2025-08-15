// Profile factory for creating test profile data
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestProfile {
  id: string;
  userId: string;
  jobRoleId?: string;
  fullName?: string;
  email?: string;
  bio?: string;
  location?: string;
  expectedSalary?: string;
  yearsOfExperience?: string;
  availableToStart?: string;
  immediateJoiner?: boolean;
  preferredRole?: string;
  profilePicture?: string;
  cvLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProfileFactory extends BaseFactory<TestProfile> {
  protected defaultAttributes(): Partial<TestProfile> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      jobRoleId: faker.helpers.arrayElement(['frontend-developer', 'backend-developer', 'fullstack-developer']),
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      bio: faker.lorem.paragraph({ min: 1, max: 3 }),
      location: FakeData.location(),
      expectedSalary: faker.helpers.arrayElement([
        '$80,000 - $120,000', '$120,000 - $160,000', '$160,000 - $200,000',
        '₹15,00,000 - ₹25,00,000', '€60,000 - €90,000', '£50,000 - £80,000'
      ]),
      yearsOfExperience: FakeData.experienceLevel(),
      availableToStart: faker.helpers.arrayElement([
        'Immediately', '2 weeks', '1 month', '2 months', '3+ months'
      ]),
      immediateJoiner: faker.datatype.boolean(),
      preferredRole: faker.helpers.arrayElement([
        'Software Engineer', 'Senior Software Engineer', 'Tech Lead',
        'Frontend Developer', 'Backend Developer', 'Full Stack Developer'
      ]),
      profilePicture: FakeData.profilePicture(),
      cvLink: FakeData.cvLink(),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent()
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestProfile> {
    switch (trait) {
      case 'incomplete':
        return {
          fullName: undefined,
          email: undefined,
          bio: undefined,
          profilePicture: undefined,
          cvLink: undefined
        };
        
      case 'complete':
        return {
          fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
          email: faker.internet.email(),
          bio: faker.lorem.paragraphs(2),
          profilePicture: FakeData.profilePicture(),
          cvLink: FakeData.cvLink()
        };
        
      case 'experienced':
        return {
          yearsOfExperience: faker.helpers.arrayElement(['5-8 years', '8+ years']),
          expectedSalary: faker.helpers.arrayElement([
            '$160,000 - $200,000', '$200,000 - $250,000'
          ]),
          preferredRole: faker.helpers.arrayElement([
            'Senior Software Engineer', 'Tech Lead', 'Engineering Manager'
          ])
        };
        
      case 'entry_level':
        return {
          yearsOfExperience: faker.helpers.arrayElement(['0-1 years', '1-3 years']),
          expectedSalary: faker.helpers.arrayElement([
            '$60,000 - $80,000', '$80,000 - $100,000'
          ]),
          preferredRole: faker.helpers.arrayElement([
            'Junior Software Engineer', 'Software Engineer', 'Associate Developer'
          ])
        };
        
      case 'immediate_joiner':
        return {
          immediateJoiner: true,
          availableToStart: 'Immediately'
        };
        
      case 'notice_period':
        return {
          immediateJoiner: false,
          availableToStart: faker.helpers.arrayElement(['2 weeks', '1 month', '2 months'])
        };
        
      case 'frontend_focused':
        return {
          jobRoleId: 'frontend-developer',
          preferredRole: faker.helpers.arrayElement([
            'Frontend Developer', 'React Developer', 'UI Developer'
          ]),
          bio: 'Passionate frontend developer with expertise in modern JavaScript frameworks and responsive design.'
        };
        
      case 'backend_focused':
        return {
          jobRoleId: 'backend-developer',
          preferredRole: faker.helpers.arrayElement([
            'Backend Developer', 'API Developer', 'Server Engineer'
          ]),
          bio: 'Experienced backend developer specializing in scalable systems and database design.'
        };
        
      default:
        return {};
    }
  }
}

// Export singleton instance
export const profileFactory = new ProfileFactory();