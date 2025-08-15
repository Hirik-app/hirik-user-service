// Base factory class for creating test data
import { faker } from '@faker-js/faker';

export abstract class BaseFactory<T> {
  protected abstract defaultAttributes(): Partial<T>;
  
  // Create a single instance
  async create(overrides?: Partial<T>): Promise<T> {
    const defaults = this.defaultAttributes();
    return { ...defaults, ...overrides } as T;
  }
  
  // Create multiple instances
  async createList(count: number, overrides?: Partial<T>): Promise<T[]> {
    const items: T[] = [];
    for (let i = 0; i < count; i++) {
      items.push(await this.create(overrides));
    }
    return items;
  }
  
  // Create with specific trait/scenario
  async createWith(trait: string, overrides?: Partial<T>): Promise<T> {
    const traitAttributes = this.getTraitAttributes(trait);
    return this.create({ ...traitAttributes, ...overrides });
  }
  
  // Override this method to define traits
  protected getTraitAttributes(trait: string): Partial<T> {
    return {};
  }
}

// Utility functions for common fake data patterns
export const FakeData = {
  // Location data as JSON strings
  location: () => JSON.stringify({
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    zipCode: faker.location.zipCode(),
    latitude: parseFloat(faker.location.latitude()),
    longitude: parseFloat(faker.location.longitude())
  }),
  
  // Profile picture metadata
  profilePicture: () => JSON.stringify({
    url: faker.image.avatar(),
    filename: `profile_${faker.string.uuid()}.jpg`,
    size: faker.number.int({ min: 50000, max: 500000 }),
    mimeType: 'image/jpeg',
    uploadedAt: faker.date.recent().toISOString()
  }),
  
  // CV/Resume link metadata
  cvLink: () => JSON.stringify({
    url: `https://storage.example.com/resumes/${faker.string.uuid()}.pdf`,
    filename: `resume_${faker.person.firstName()}_${faker.person.lastName()}.pdf`,
    size: faker.number.int({ min: 100000, max: 2000000 }),
    mimeType: 'application/pdf',
    uploadedAt: faker.date.recent().toISOString()
  }),
  
  // Verification details for recruiters
  verificationDetails: () => JSON.stringify({
    method: faker.helpers.arrayElement(['linkedin', 'email_domain', 'company_verification']),
    verifiedAt: faker.date.recent().toISOString(),
    documents: [
      {
        type: 'company_email',
        verified: true,
        verifiedAt: faker.date.recent().toISOString()
      }
    ]
  }),
  
  // Quiet hours for notifications
  quietHours: () => JSON.stringify({
    enabled: faker.datatype.boolean(),
    startTime: '22:00',
    endTime: '08:00',
    timezone: faker.location.timeZone()
  }),
  
  // Job types array
  jobTypes: () => JSON.stringify(
    faker.helpers.arrayElements(
      ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
      { min: 1, max: 3 }
    )
  ),
  
  // Location preferences
  locationPreferences: () => JSON.stringify(
    faker.helpers.arrayElements([
      { city: 'San Francisco', state: 'CA', country: 'USA' },
      { city: 'New York', state: 'NY', country: 'USA' },
      { city: 'Austin', state: 'TX', country: 'USA' },
      { city: 'Seattle', state: 'WA', country: 'USA' },
      { city: 'Remote', state: null, country: null }
    ], { min: 1, max: 3 })
  ),
  
  // Skill IDs array (logical references)
  skillIds: () => JSON.stringify(
    faker.helpers.arrayElements([
      'javascript', 'typescript', 'react', 'nodejs', 'python', 
      'java', 'golang', 'rust', 'sql', 'mongodb', 'aws', 'docker'
    ], { min: 2, max: 6 })
  ),
  
  // Role IDs array (logical references)
  roleIds: () => JSON.stringify(
    faker.helpers.arrayElements([
      'frontend-developer', 'backend-developer', 'fullstack-developer',
      'devops-engineer', 'data-scientist', 'product-manager'
    ], { min: 1, max: 3 })
  ),
  
  // Industry IDs array
  industryIds: () => JSON.stringify(
    faker.helpers.arrayElements([
      'technology', 'healthcare', 'finance', 'education', 'retail',
      'manufacturing', 'consulting', 'media', 'government'
    ], { min: 1, max: 4 })
  ),
  
  // Company IDs array
  companyIds: () => JSON.stringify(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => 
      faker.string.uuid()
    )
  ),
  
  // Saved searches
  savedSearches: () => JSON.stringify([
    {
      name: 'Frontend Jobs in SF',
      query: 'frontend developer',
      location: 'San Francisco, CA',
      salary: { min: 100000, max: 180000 },
      remote: true,
      createdAt: faker.date.recent().toISOString()
    },
    {
      name: 'Senior Backend Roles',
      query: 'senior backend',
      skills: ['nodejs', 'python', 'aws'],
      experience: '5+',
      createdAt: faker.date.recent().toISOString()
    }
  ]),
  
  // Phone number with country code
  phoneWithCountry: () => ({
    phoneNumber: faker.string.numeric(10),
    countryCode: faker.helpers.arrayElement(['+1', '+44', '+91', '+49', '+33'])
  }),
  
  // Professional email based on company domain
  workEmail: (companyName?: string) => {
    const domain = companyName 
      ? `${companyName.toLowerCase().replace(/\s+/g, '')}.com`
      : faker.internet.domainName();
    return faker.internet.email({ provider: domain });
  },
  
  // Experience level strings
  experienceLevel: () => faker.helpers.arrayElement([
    '0-1 years', '1-3 years', '3-5 years', '5-8 years', '8+ years'
  ]),
  
  // Date strings for experience/education
  dateString: () => faker.date.past({ years: 5 }).toISOString().split('T')[0],
  
  // Grade/GPA strings
  grade: () => faker.helpers.arrayElement([
    'A+', 'A', 'A-', 'B+', 'B', 'B-',
    '3.8/4.0', '3.5/4.0', '3.2/4.0',
    'First Class', 'Upper Second Class', 'Second Class'
  ])
};

export default BaseFactory;