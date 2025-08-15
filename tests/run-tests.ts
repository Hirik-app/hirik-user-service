import { testAuthController } from './auth-module/controller.test';
import { testUserController } from './user-module/controller.test';

// Simple test runner
async function runAllTests() {
  console.log('🚀 Starting Hirik User Service Tests...');
  console.log('=' .repeat(50));
  
  const startTime = Date.now();
  let passedTests = 0;
  let failedTests = 0;
  
  const tests = [
    { name: 'Auth Controller', fn: testAuthController },
    { name: 'User Controller', fn: testUserController }
  ];
  
  for (const test of tests) {
    try {
      console.log(`\n📋 Running ${test.name} tests...`);
      await test.fn();
      passedTests++;
      console.log(`✅ ${test.name} tests completed successfully`);
    } catch (error) {
      failedTests++;
      console.error(`❌ ${test.name} tests failed:`, error);
    }
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 Test Results Summary:');
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`⏱️  Duration: ${duration}ms`);
  
  if (failedTests > 0) {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    throw new Error(`${failedTests} test(s) failed`);
  } else {
    console.log('\n🎉 All tests passed!');
  }
  
  return { passedTests, failedTests, duration };
}

// Run tests
runAllTests().catch((error) => {
  console.error('💥 Test runner failed:', error);
  throw error;
});

// Export for external use
export { runAllTests };