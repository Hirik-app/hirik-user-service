// Tests for vitest configuration validation
import { describe, test, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import vitestConfig from '../vitest.config';

describe('Vitest Configuration Validation', () => {
  test('should have correct base configuration structure', () => {
    expect(vitestConfig).toBeDefined();
    expect(vitestConfig.test).toBeDefined();
    expect(vitestConfig.resolve).toBeDefined();
    expect(vitestConfig.define).toBeDefined();
  });

  test('should have proper path aliases configured', () => {
    const aliases = vitestConfig.resolve?.alias;
    expect(aliases).toBeDefined();
    expect(aliases).toHaveProperty('@');
    expect(aliases).toHaveProperty('@tests');
    expect(aliases).toHaveProperty('@utils');
    expect(aliases).toHaveProperty('@auth');
    expect(aliases).toHaveProperty('@user');
    expect(aliases).toHaveProperty('@recruiter');
    expect(aliases).toHaveProperty('@education');
    expect(aliases).toHaveProperty('@preferences');
    expect(aliases).toHaveProperty('@resume');
  });

  test('should have coverage configuration with 90% thresholds', () => {
    const coverage = vitestConfig.test?.coverage;
    expect(coverage).toBeDefined();
    expect(coverage?.thresholds?.global?.branches).toBe(90);
    expect(coverage?.thresholds?.global?.functions).toBe(90);
    expect(coverage?.thresholds?.global?.lines).toBe(90);
    expect(coverage?.thresholds?.global?.statements).toBe(90);
  });

  test('should have auth module coverage at 95%', () => {
    const coverage = vitestConfig.test?.coverage;
    const authThresholds = coverage?.thresholds?.['src/auth-module/**'];
    expect(authThresholds?.branches).toBe(95);
    expect(authThresholds?.functions).toBe(95);
    expect(authThresholds?.lines).toBe(95);
    expect(authThresholds?.statements).toBe(95);
  });

  test('should have proper test environment configuration', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.environment).toBe('happy-dom');
    expect(testConfig?.globals).toBe(true);
    expect(testConfig?.isolate).toBe(true);
  });

  test('should have parallel execution configured', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.pool).toBe('forks');
    expect(testConfig?.poolOptions?.forks?.maxForks).toBe(4);
    expect(testConfig?.poolOptions?.forks?.minForks).toBe(1);
    expect(testConfig?.sequence?.concurrent).toBe(true);
  });

  test('should have proper timeout configurations', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.testTimeout).toBe(30000);
    expect(testConfig?.hookTimeout).toBe(10000);
    expect(testConfig?.teardownTimeout).toBe(10000);
  });

  test('should have benchmark configuration', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.benchmark).toBeDefined();
    expect(testConfig?.benchmark?.include).toContain('**/*.{bench,benchmark}.?(c|m)[jt]s?(x)');
  });

  test('should exclude generated files from coverage', () => {
    const coverage = vitestConfig.test?.coverage;
    expect(coverage?.exclude).toContain('src/generated/**');
    expect(coverage?.exclude).toContain('**/*.d.ts');
    expect(coverage?.exclude).toContain('**/*.test.{js,jsx,ts,tsx}');
  });

  test('should have proper include/exclude patterns', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.include).toContain('tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}');
    expect(testConfig?.exclude).toContain('**/node_modules/**');
    expect(testConfig?.exclude).toContain('**/dist/**');
    expect(testConfig?.exclude).toContain('**/coverage/**');
  });

  test('should have environment variables configured', () => {
    const testEnv = vitestConfig.test?.env;
    expect(testEnv).toBeDefined();
    expect(testEnv?.NODE_ENV).toBe('test');
    expect(testEnv?.VITEST).toBe('true');
  });

  test('should have proper reporter configuration', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.reporter).toContain('verbose');
    expect(testConfig?.reporter).toContain('json');
    expect(testConfig?.reporter).toContain('html');
  });

  test('should have output file configuration', () => {
    const outputFile = vitestConfig.test?.outputFile;
    expect(outputFile).toBeDefined();
    expect(outputFile?.json).toBe('./coverage/test-results.json');
    expect(outputFile?.html).toBe('./coverage/test-results.html');
  });

  test('should have proper define configuration', () => {
    const defines = vitestConfig.define;
    expect(defines?.__TEST__).toBe(true);
    expect(defines?.__DEV__).toBe(false);
    expect(defines?.__PROD__).toBe(false);
  });

  test('should have browser configuration disabled by default', () => {
    const browserConfig = vitestConfig.test?.browser;
    expect(browserConfig?.enabled).toBe(false);
  });
});

describe('Test Environment Configuration Files', () => {
  test('should have unit test configuration file', () => {
    const unitConfigPath = join(__dirname, 'configs', 'vitest.unit.config.ts');
    expect(() => readFileSync(unitConfigPath, 'utf8')).not.toThrow();
  });

  test('should have integration test configuration file', () => {
    const integrationConfigPath = join(__dirname, 'configs', 'vitest.integration.config.ts');
    expect(() => readFileSync(integrationConfigPath, 'utf8')).not.toThrow();
  });

  test('should have e2e test configuration file', () => {
    const e2eConfigPath = join(__dirname, 'configs', 'vitest.e2e.config.ts');
    expect(() => readFileSync(e2eConfigPath, 'utf8')).not.toThrow();
  });
});

describe('Mock Server Configuration', () => {
  test('should have MSW server setup file', () => {
    const mswServerPath = join(__dirname, 'mocks', 'msw-server.ts');
    expect(() => readFileSync(mswServerPath, 'utf8')).not.toThrow();
  });

  test('should have test environment setup file', () => {
    const setupEnvPath = join(__dirname, 'test-environments', 'setup-environment.ts');
    expect(() => readFileSync(setupEnvPath, 'utf8')).not.toThrow();
  });
});

describe('Performance and Resource Configuration', () => {
  test('should have memory monitoring enabled', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.logHeapUsage).toBe(true);
  });

  test('should have retry configuration', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.retry).toBe(1);
    expect(testConfig?.bail).toBe(0);
  });

  test('should not pass with no tests', () => {
    const testConfig = vitestConfig.test;
    expect(testConfig?.passWithNoTests).toBe(false);
  });
});