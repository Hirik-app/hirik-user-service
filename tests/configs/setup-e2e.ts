// Setup for end-to-end tests - realistic environment with controlled external services
import { setupEnvironmentForTestType } from '../test-environments/setup-environment';
import { setupMockServer } from '../mocks/msw-server';

// Configure environment for e2e testing
setupEnvironmentForTestType('e2e');

// Set up MSW with realistic delays
const mockServer = setupMockServer();

// Start MSW server with realistic behavior
mockServer.listen({
  onUnhandledRequest: 'error' // Fail on unmocked requests for e2e
});

// Add realistic delays to external service mocks for e2e testing
if (process.env.TEST_REALISTIC_DELAYS === 'true') {
  // Add small delays to simulate network latency
  mockServer.addHandlers(
    // Add delay handlers here if needed
  );
}

// Clean up after tests
process.on('exit', () => {
  mockServer.close();
});

console.log('E2E test environment configured with realistic MSW mocking');