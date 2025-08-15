import { setupTests, teardownTests, cleanDatabase, prisma } from './setup';

// Integration tests for the user service
export async function runIntegrationTests() {
  console.log('🚀 Starting Integration Tests...');
  
  await setupTests();
  
  try {
    // Test 1: Database connection
    await testDatabaseConnection();
    
    // Test 2: User CRUD operations
    await testUserCRUD();
    
    // Test 3: Profile operations
    await testProfileOperations();
    
    // Test 4: Recruiter profile operations
    await testRecruiterProfileOperations();
    
    console.log('✅ All integration tests passed!');
  } catch (error) {
    console.error('❌ Integration tests failed:', error);
    throw error;
  } finally {
    await teardownTests();
  }
}

async function testDatabaseConnection() {
  // Test basic database connectivity
  const result = await prisma.$queryRaw`SELECT 1 as test`;
  
  if (!result) {
    throw new Error('Database connection failed');
  }
  
  console.log('✅ Database connection test passed');
}

async function testUserCRUD() {
  await cleanDatabase();
  
  // Create user
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  if (!user.id) {
    throw new Error('User creation failed');
  }
  
  // Read user
  const foundUser = await prisma.user.findUnique({
    where: { id: user.id }
  });
  
  if (!foundUser) {
    throw new Error('User read failed');
  }
  
  // Update user (users don't have many updatable fields, so we'll test with updatedAt)
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      updatedAt: new Date()
    }
  });
  
  if (updatedUser.updatedAt <= user.updatedAt) {
    throw new Error('User update failed');
  }
  
  // Delete user
  await prisma.user.delete({
    where: { id: user.id }
  });
  
  const deletedUser = await prisma.user.findUnique({
    where: { id: user.id }
  });
  
  if (deletedUser) {
    throw new Error('User deletion failed');
  }
  
  console.log('✅ User CRUD test passed');
}

async function testProfileOperations() {
  await cleanDatabase();
  
  // Create user first
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  // Create profile
  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      fullName: 'John Doe',
      email: 'john@example.com',
      bio: 'Software Developer',
      location: JSON.stringify({ city: 'San Francisco', country: 'USA' }),
      expectedSalary: '100000',
      yearsOfExperience: '5'
    }
  });
  
  if (!profile.id) {
    throw new Error('Profile creation failed');
  }
  
  // Test profile with relations
  const profileWithUser = await prisma.profile.findUnique({
    where: { id: profile.id },
    include: {
      user: true,
      education: true,
      experience: true,
      resumes: true
    }
  });
  
  if (!profileWithUser || !profileWithUser.user) {
    throw new Error('Profile relations failed');
  }
  
  // Update profile
  const updatedProfile = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      bio: 'Senior Software Developer',
      expectedSalary: '120000'
    }
  });
  
  if (updatedProfile.bio !== 'Senior Software Developer') {
    throw new Error('Profile update failed');
  }
  
  console.log('✅ Profile operations test passed');
}

async function testRecruiterProfileOperations() {
  await cleanDatabase();
  
  // Create user first
  const user = await prisma.user.create({
    data: {
      phoneNumber: '1234567890',
      countryCode: '+1'
    }
  });
  
  // Create verification method
  const verificationMethod = await prisma.recruiterVerificationMethods.create({
    data: {
      method: 'Email Verification'
    }
  });
  
  // Create recruiter profile
  const recruiterProfile = await prisma.recruiterProfile.create({
    data: {
      userId: user.id,
      fullName: 'Jane Recruiter',
      workEmail: 'jane@company.com',
      companyId: 'company-123',
      location: JSON.stringify({ city: 'New York', country: 'USA' }),
      isVerified: false
    }
  });
  
  if (!recruiterProfile.id) {
    throw new Error('Recruiter profile creation failed');
  }
  
  // Test recruiter profile with relations
  const recruiterWithRelations = await prisma.recruiterProfile.findUnique({
    where: { id: recruiterProfile.id },
    include: {
      recruiterVerificationMethods: true
    }
  });
  
  if (!recruiterWithRelations) {
    throw new Error('Recruiter profile relations failed');
  }
  
  // Update recruiter profile
  const updatedRecruiter = await prisma.recruiterProfile.update({
    where: { id: recruiterProfile.id },
    data: {
      isVerified: true,
      recruiterVerificationMethodsId: verificationMethod.id,
      verifiedBy: 'admin@hirik.com'
    }
  });
  
  if (!updatedRecruiter.isVerified) {
    throw new Error('Recruiter profile verification failed');
  }
  
  console.log('✅ Recruiter profile operations test passed');
}

// Export for use in test runner