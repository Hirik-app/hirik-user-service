// Setup for integration tests - real database, mocked external services
import { setupEnvironmentForTestType } from '../test-environments/setup-environment';
import { setupMockServer } from '../mocks/msw-server';

// Configure environment for integration testing
setupEnvironmentForTestType('integration');

// Set up MSW for external service mocking
const mockServer = setupMockServer();

// Start MSW server
mockServer.listen({
  onUnhandledRequest: 'warn' // Warn about unmocked requests
});

// Clean up after tests
process.on('exit', () => {
  mockServer.close();
});

console.log('Integration test environment configured with MSW mocking');