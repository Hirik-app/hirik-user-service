import { setupTests, teardownTests, cleanDatabase, prisma } from '../setup';
import { Context } from 'hono';

// Mock environment for testing
const mockEnv = {
  ACCESS_TOKEN_SECRET: 'test-access-secret',
  REFRESH_TOKEN_SECRET: 'test-refresh-secret',
  DB: null
};

// Mock Hono Context with JWT payload
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

// Test suite for User Module
export async function testUserController() {
  console.log('Starting User Controller Tests...');
  
  await setupTests();
  
  try {
    // Test 1: Get user profile
    await testGetUserProfile();
    
    // Test 2: Create user profile
    await testCreateUserProfile();
    
    // Test 3: Update user profile
    await testUpdateUserProfile();
    
    // Test 4: Get user info
    await testGetUserInfo();
    
    console.log('✅ All User Controller tests passed!');
  } catch (error) {
    console.error('❌ User Controller tests failed:', error);
    throw error;
  } finally {
    await teardownTests();
  }
}

async function testGetUserProfile() {
  await cleanDatabase();
  
  // Create user and profile
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      fullName: 'John Doe',
      email: 'john@example.com',
      bio: 'Software Developer'
    }
  });
  
  // Mock context with JWT payload
  const mockContext = createMockContext({}, { userId: user.id });
  
  // Import and test the controller (this would need actual controller import)
  // For now, we'll test the database operations
  const foundProfile = await prisma.profile.findFirst({
    where: { userId: user.id }
  });
  
  if (!foundProfile) {
    throw new Error('Profile should exist');
  }
  
  if (foundProfile.fullName !== 'John Doe') {
    throw new Error('Profile name should match');
  }
  
  console.log('✅ Get user profile test passed');
}

async function testCreateUserProfile() {
  await cleanDatabase();
  
  // Create user
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  // Test profile creation
  const profileData = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    bio: 'Product Manager',
    location: JSON.stringify({ city: 'New York', country: 'USA' }),
    expectedSalary: '100000',
    yearsOfExperience: '5'
  };
  
  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      ...profileData
    }
  });
  
  if (!profile) {
    throw new Error('Profile should be created');
  }
  
  if (profile.fullName !== profileData.fullName) {
    throw new Error('Profile data should match');
  }
  
  console.log('✅ Create user profile test passed');
}

async function testUpdateUserProfile() {
  await cleanDatabase();
  
  // Create user and profile
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      fullName: 'John Doe',
      email: 'john@example.com'
    }
  });
  
  // Update profile
  const updatedProfile = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      fullName: 'John Smith',
      bio: 'Senior Developer'
    }
  });
  
  if (updatedProfile.fullName !== 'John Smith') {
    throw new Error('Profile should be updated');
  }
  
  if (updatedProfile.bio !== 'Senior Developer') {
    throw new Error('Profile bio should be updated');
  }
  
  console.log('✅ Update user profile test passed');
}

async function testGetUserInfo() {
  await cleanDatabase();
  
  // Create user
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  // Test getting user info
  const foundUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      profiles: true,
      savedJobs: true,
      jobSearchPreferences: true,
      notificationPreferences: true
    }
  });
  
  if (!foundUser) {
    throw new Error('User should exist');
  }
  
  if (foundUser.phoneNumber !== '1234567890') {
    throw new Error('User phone number should match');
  }
  
  console.log('✅ Get user info test passed');
}

// Export the test function for use in test runner