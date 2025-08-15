# Hirik User Service - Test Suite

This directory contains comprehensive test cases for the Hirik User Service using Vitest.

## Overview

The test suite covers:
- **Auth Module**: User authentication, OTP verification, JWT token management
- **User Module**: User profile management, CRUD operations
- **Recruiter Module**: Recruiter profile management, verification processes
- **Integration Tests**: Database operations, end-to-end workflows

## Test Structure

```
tests/
├── setup.ts                           # Test setup and database utilities
├── integration.test.ts                 # Integration tests
├── run-tests.ts                       # Custom test runner
├── auth-module/
│   └── controller.test.ts             # Auth controller tests
├── user-module/
│   └── controller.test.ts             # User controller tests
└── recruiter-module/
    └── controller.test.ts             # Recruiter controller tests
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.test` file or set environment variables:

```bash
DATABASE_URL="file:./test.db"
ACCESS_TOKEN_SECRET="test-access-secret"
REFRESH_TOKEN_SECRET="test-refresh-secret"
NODE_ENV="test"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations for test database
npm run db:migrate
```

## Running Tests

### Using Vitest (Recommended)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests once (CI mode)
npm run test:run
```

### Using Custom Test Runner

```bash
# Run custom test suite
npx tsx tests/run-tests.ts

# Run integration tests only
npx tsx tests/integration.test.ts
```

## Test Categories

### Auth Module Tests

- **Login with Phone**: Tests user creation and OTP generation
- **OTP Verification**: Tests OTP validation and JWT token generation
- **Rate Limiting**: Tests OTP request rate limiting
- **Token Refresh**: Tests JWT token refresh functionality

### User Module Tests

- **Profile Management**: CRUD operations for user profiles
- **User Information**: Getting user data with relations
- **Profile Updates**: Testing profile field updates

### Recruiter Module Tests

- **Recruiter Profile**: CRUD operations for recruiter profiles
- **Verification Process**: Testing recruiter verification workflow
- **Email Verification**: Testing work email verification

### Integration Tests

- **Database Connectivity**: Basic database connection tests
- **CRUD Operations**: End-to-end database operations
- **Relations**: Testing database relationships
- **Data Integrity**: Testing foreign key constraints

## Test Utilities

### Setup Functions

```typescript
import { setupTests, teardownTests, cleanDatabase, prisma } from './setup';

// Initialize test environment
await setupTests();

// Clean database before each test
await cleanDatabase();

// Cleanup after all tests
await teardownTests();
```

### Mock Context

```typescript
// Create mock Hono context for testing
const mockContext = createMockContext(
  { phoneNumber: '1234567890', countryCode: '+1' }, // Request body
  { userId: 'user-123' } // JWT payload
);
```

## Coverage

The test suite aims for:
- **80%+ Line Coverage**
- **80%+ Function Coverage**
- **80%+ Branch Coverage**
- **80%+ Statement Coverage**

View coverage reports:

```bash
npm run test:coverage
open coverage/index.html
```

## Best Practices

### 1. Test Isolation
- Each test cleans the database before running
- Tests don't depend on each other
- Use `cleanDatabase()` in `beforeEach` hooks

### 2. Mock Data
- Use realistic but safe test data
- Avoid hardcoded IDs when possible
- Use factory functions for complex objects

### 3. Error Testing
- Test both success and failure scenarios
- Verify error messages and status codes
- Test edge cases and boundary conditions

### 4. Async Testing
- Always await async operations
- Use proper error handling
- Test timeout scenarios

## Debugging Tests

### Enable Debug Logging

```bash
DEBUG=* npm test
```

### Run Specific Tests

```bash
# Run specific test file
npx vitest auth-module/controller.test.ts

# Run tests matching pattern
npx vitest --grep "login"
```

### Database Inspection

```bash
# Open test database in Prisma Studio
npm run db:studio
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test User Service

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run db:generate
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure DATABASE_URL is set correctly
   - Run `npm run db:generate` after schema changes

2. **Test Timeouts**
   - Increase timeout in vitest.config.ts
   - Check for hanging async operations

3. **Import Errors**
   - Ensure all dependencies are installed
   - Check TypeScript configuration

4. **Prisma Errors**
   - Regenerate Prisma client: `npm run db:generate`
   - Reset test database: `rm test.db && npm run db:migrate`

### Getting Help

- Check the [Vitest documentation](https://vitest.dev/)
- Review [Prisma testing guide](https://www.prisma.io/docs/guides/testing)
- Consult the [Hono testing docs](https://hono.dev/getting-started/testing)

## Contributing

When adding new features:

1. **Write tests first** (TDD approach)
2. **Maintain coverage** above 80%
3. **Test edge cases** and error scenarios
4. **Update documentation** as needed
5. **Run full test suite** before committing

```bash
# Pre-commit checklist
npm run test:coverage
npm run lint
npm run type-check
```