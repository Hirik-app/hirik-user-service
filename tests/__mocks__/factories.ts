/**
 * Test Data Factories
 * Generate consistent test data using Faker.js
 */

import { faker } from '@faker-js/faker';

// User factory
export const createMockUser = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  phoneNumber: faker.phone.number(),
  countryCode: faker.location.countryCode(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Profile factory
export const createMockProfile = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  jobRoleId: faker.string.uuid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  location: JSON.stringify({
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country()
  }),
  expectedSalary: faker.number.int({ min: 50000, max: 200000 }).toString(),
  yearsOfExperience: faker.number.int({ min: 0, max: 20 }).toString(),
  availableToStart: faker.date.future().toISOString(),
  immediateJoiner: faker.datatype.boolean(),
  preferredRole: faker.person.jobTitle(),
  profilePicture: JSON.stringify({
    url: faker.image.avatar(),
    key: faker.string.uuid()
  }),
  cvLink: JSON.stringify({
    url: faker.internet.url(),
    key: faker.string.uuid()
  }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Resume factory
export const createMockResume = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  profileId: faker.string.uuid(),
  title: `${faker.person.jobTitle()} Resume`,
  fileName: `${faker.lorem.word()}_resume.pdf`,
  fileUrl: faker.internet.url(),
  fileSize: faker.number.int({ min: 1024, max: 5242880 }), // 1KB to 5MB
  mimeType: 'application/pdf',
  isDefault: faker.datatype.boolean(),
  isActive: true,
  uploadedAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  parsedContent: {
    skills: faker.helpers.arrayElements([
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'
    ], { min: 3, max: 7 }),
    experience: faker.helpers.arrayElements([
      'Senior Developer', 'Tech Lead', 'Software Engineer', 'Full Stack Developer'
    ], { min: 1, max: 3 }),
    education: faker.helpers.arrayElements([
      'Computer Science', 'Software Engineering', 'Information Technology'
    ], { min: 1, max: 2 })
  },
  ...overrides
});

// Education factory
export const createMockEducation = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  profileId: faker.string.uuid(),
  degree: faker.helpers.arrayElement([
    'Bachelor of Science', 'Master of Science', 'Bachelor of Engineering', 'Master of Engineering'
  ]),
  institution: faker.company.name() + ' University',
  location: JSON.stringify({
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country()
  }),
  startDate: faker.date.past({ years: 6 }).toISOString().split('T')[0],
  endDate: faker.date.past({ years: 2 }).toISOString().split('T')[0],
  grade: faker.helpers.arrayElement(['A', 'B+', 'B', '3.8 GPA', '3.5 GPA']),
  description: faker.lorem.paragraph(),
  isCurrent: faker.datatype.boolean(),
  ...overrides
});

// Experience factory
export const createMockExperience = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  profileId: faker.string.uuid(),
  jobRoleId: faker.string.uuid(),
  companyId: faker.string.uuid(),
  location: JSON.stringify({
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country()
  }),
  startDate: faker.date.past({ years: 3 }).toISOString().split('T')[0],
  endDate: faker.date.recent().toISOString().split('T')[0],
  isCurrent: faker.datatype.boolean(),
  rolesAndResponsibilities: faker.lorem.paragraphs(2),
  ...overrides
});

// Job Search Preferences factory
export const createMockJobSearchPreferences = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  desiredJobTypes: JSON.stringify([
    faker.helpers.arrayElement(['full-time', 'part-time', 'contract', 'freelance'])
  ]),
  minSalary: faker.number.int({ min: 40000, max: 80000 }),
  maxSalary: faker.number.int({ min: 100000, max: 300000 }),
  salaryCurrency: 'USD',
  salaryPeriod: 'yearly',
  desiredLocations: JSON.stringify([
    faker.location.city(),
    faker.location.city()
  ]),
  isRemoteOnly: faker.datatype.boolean(),
  isWillingToRelocate: faker.datatype.boolean(),
  maxCommuteMiles: faker.number.int({ min: 10, max: 50 }),
  desiredRoles: JSON.stringify([
    faker.string.uuid(),
    faker.string.uuid()
  ]),
  desiredSkills: JSON.stringify([
    faker.string.uuid(),
    faker.string.uuid(),
    faker.string.uuid()
  ]),
  yearsOfExperience: faker.number.int({ min: 0, max: 15 }).toString(),
  desiredIndustries: JSON.stringify([
    'Technology', 'Healthcare', 'Finance'
  ]),
  minCompanySize: faker.number.int({ min: 10, max: 100 }),
  maxCompanySize: faker.number.int({ min: 500, max: 10000 }),
  excludedCompanies: JSON.stringify([]),
  isSearchActive: true,
  lastSearchDate: faker.date.recent(),
  savedSearches: JSON.stringify([]),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Notification Preferences factory
export const createMockNotificationPreferences = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  jobMatches: true,
  applications: true,
  interviews: true,
  messages: true,
  emailEnabled: true,
  pushEnabled: true,
  quietHours: JSON.stringify({
    start: '22:00',
    end: '08:00',
    timezone: 'UTC'
  }),
  frequency: faker.helpers.arrayElement(['immediate', 'daily', 'weekly']),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Recruiter Profile factory
export const createMockRecruiterProfile = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  fullName: faker.person.fullName(),
  companyId: faker.string.uuid(),
  jobRoleId: faker.string.uuid(),
  workEmail: faker.internet.email(),
  location: JSON.stringify({
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country()
  }),
  isVerified: faker.datatype.boolean(),
  workEmailVerified: faker.datatype.boolean(),
  emailVerificationToken: faker.string.uuid(),
  emailVerificationTokenExpiresAt: faker.date.future(),
  recruiterVerificationMethodsId: faker.string.uuid(),
  verifiedBy: faker.string.uuid(),
  verificationDetails: JSON.stringify({
    method: 'email',
    verifiedAt: faker.date.recent().toISOString(),
    documents: []
  }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// OTP factory
export const createMockOTP = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  phoneNumber: faker.phone.number(),
  countryCode: faker.location.countryCode(),
  otp: faker.string.numeric(6),
  expiresAt: faker.date.future(),
  attempts: faker.number.int({ min: 0, max: 3 }),
  userId: faker.string.uuid(),
  verified: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Email OTP factory
export const createMockEmailOTP = (overrides: any = {}) => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  otp: faker.string.numeric(6),
  expiresAt: faker.date.future(),
  attempts: faker.number.int({ min: 0, max: 3 }),
  userId: faker.string.uuid(),
  verified: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Batch factory for creating multiple records
export const createMockBatch = <T>(factory: (overrides?: any) => T, count: number, overrides: any = {}): T[] => {
  return Array.from({ length: count }, () => factory(overrides));
};

// Helper to create related data sets
export const createMockUserWithProfile = (userOverrides: any = {}, profileOverrides: any = {}) => {
  const user = createMockUser(userOverrides);
  const profile = createMockProfile({ userId: user.id, ...profileOverrides });
  return { user, profile };
};

export const createMockProfileWithEducation = (profileOverrides: any = {}, educationOverrides: any = {}) => {
  const profile = createMockProfile(profileOverrides);
  const education = createMockEducation({ profileId: profile.id, ...educationOverrides });
  return { profile, education };
};

export const createMockProfileWithResume = (profileOverrides: any = {}, resumeOverrides: any = {}) => {
  const profile = createMockProfile(profileOverrides);
  const resume = createMockResume({ profileId: profile.id, ...resumeOverrides });
  return { profile, resume };
};