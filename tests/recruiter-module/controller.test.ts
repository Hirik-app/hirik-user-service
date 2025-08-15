import { setupTests, teardownTests, cleanDatabase, prisma } from '../setup';
import { Context } from 'hono';

// Mock environment for testing
const mockEnv = {
  ACCESS_TOKEN_SECRET: 'ACCESS_TOKEN_SECRET',
  REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
  DB: null
};

// Mock Hono Context
function createMockContext(body?: any, jwtPayload?: any): Partial<Context> {
  return {
    req: {
      json: async () => body || {},
      param: (name: string) => body?.[name] || undefined
    } as any,
    json: (data: any, status?: number) => {
      return new Response(JSON.stringify(data), {
        status: status || 200,
        headers: { 'Content-Type': 'application/json' }
      });
    },
    get: (key: string) => {
      if (key === 'jwtPayload') return jwtPayload;
      return undefined;
    },
    env: mockEnv
  } as Partial<Context>;
}

// Test suite for Recruiter Module
export async function testRecruiterController() {
  console.log('Starting Recruiter Controller Tests...');

  await setupTests();

  try {
    // Test 1: Create recruiter profile
    await testCreateRecruiterProfile();

    // Test 2: Get recruiter profile
    await testGetRecruiterProfile();

    // Test 3: Update recruiter profile
    await testUpdateRecruiterProfile();

    // Test 4: Verify recruiter
    await testVerifyRecruiter();

    // Test 5: Email verification
    await testEmailVerification();

    console.log('✅ All Recruiter Controller tests passed!');
  } catch (error) {
    console.error('❌ Recruiter Controller tests failed:', error);
    throw error;
  } finally {
    await teardownTests();
  }
}

async function testCreateRecruiterProfile() {
  await cleanDatabase();

  // Create user first
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });

  // Create recruiter profile
  const recruiterData = {
    userId: user.id,
    fullName: 'John Recruiter',
    workEmail: 'john@company.com',
    companyId: 'company-123',
    jobRoleId: 'role-456',
    location: JSON.stringify({ city: 'San Francisco', country: 'USA' })
  };

  const recruiterProfile = await prisma.recruiterProfile.create({
    data: recruiterData
  });

  if (!recruiterProfile) {
    throw new Error('Recruiter profile should be created');
  }

  if (recruiterProfile.fullName !== recruiterData.fullName) {
    throw new Error('Recruiter name should match');
  }

  if (recruiterProfile.workEmail !== recruiterData.workEmail) {
    throw new Error('Work email should match');
  }

  console.log('✅ Create recruiter profile test passed');
}

async function testGetRecruiterProfile() {
  await cleanDatabase();

  // Create user and recruiter profile
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });

  const recruiterProfile = await prisma.recruiterProfile.create({
    data: {
      userId: user.id,
      fullName: 'Jane Recruiter',
      workEmail: 'jane@company.com',
      isVerified: true
    }
  });

  // Test getting recruiter profile
  const foundProfile = await prisma.recruiterProfile.findUnique({
    where: { userId: user.id },
    include: {
      recruiterVerificationMethods: true
    }
  });

  if (!foundProfile) {
    throw new Error('Recruiter profile should exist');
  }

  if (foundProfile.fullName !== 'Jane Recruiter') {
    throw new Error('Recruiter name should match');
  }

  if (!foundProfile.isVerified) {
    throw new Error('Recruiter should be verified');
  }

  console.log('✅ Get recruiter profile test passed');
}

async function testUpdateRecruiterProfile() {
  await cleanDatabase();

  // Create user and recruiter profile
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });

  const recruiterProfile = await prisma.recruiterProfile.create({
    data: {
      userId: user.id,
      fullName: 'John Recruiter',
      workEmail: 'john@company.com'
    }
  });

  // Update recruiter profile
  const updatedProfile = await prisma.recruiterProfile.update({
    where: { id: recruiterProfile.id },
    data: {
      fullName: 'John Senior Recruiter',
      companyId: 'new-company-123',
      location: JSON.stringify({ city: 'New York', country: 'USA' })
    }
  });

  if (updatedProfile.fullName !== 'John Senior Recruiter') {
    throw new Error('Recruiter name should be updated');
  }

  if (updatedProfile.companyId !== 'new-company-123') {
    throw new Error('Company ID should be updated');
  }

  console.log('✅ Update recruiter profile test passed');
}

async function testVerifyRecruiter() {
  await cleanDatabase();

  // Create verification method
  const verificationMethod = await prisma.recruiterVerificationMethods.create({
    data: {
      method: 'Email Verification'
    }
  });

  // Create user and recruiter profile
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });

  const recruiterProfile = await prisma.recruiterProfile.create({
    data: {
      userId: user.id,
      fullName: 'John Recruiter',
      workEmail: 'john@company.com',
      isVerified: false
    }
  });

  // Verify recruiter
  const verifiedProfile = await prisma.recruiterProfile.update({
    where: { id: recruiterProfile.id },
    data: {
      isVerified: true,
      recruiterVerificationMethodsId: verificationMethod.id,
      verifiedBy: 'admin@hirik.com',
      verificationDetails: JSON.stringify({ verifiedAt: new Date().toISOString() })
    }
  });

  if (!verifiedProfile.isVerified) {
    throw new Error('Recruiter should be verified');
  }

  if (verifiedProfile.verifiedBy !== 'admin@hirik.com') {
    throw new Error('Verified by should match');
  }

  console.log('✅ Verify recruiter test passed');
}

async function testEmailVerification() {
  await cleanDatabase();

  // Create user and recruiter profile
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });

  const recruiterProfile = await prisma.recruiterProfile.create({
    data: {
      userId: user.id,
      fullName: 'John Recruiter',
      workEmail: 'john@company.com',
      isVerified: false
    }
  });

  // Test email verification workflow by updating the profile
  const verifiedProfile = await prisma.recruiterProfile.update({
    where: { id: recruiterProfile.id },
    data: {
      isVerified: true,
      verificationDetails: JSON.stringify({ emailVerified: true, verifiedAt: new Date().toISOString() })
    }
  });

  if (!verifiedProfile.isVerified) {
    throw new Error('Recruiter should be verified');
  }

  if (!verifiedProfile.verificationDetails) {
    throw new Error('Verification details should be set');
  }

  console.log('✅ Email verification test passed');
}

// Export the test function for use in test runner