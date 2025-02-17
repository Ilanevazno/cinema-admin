module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@providers$': '<rootDir>/src/providers',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/**/*.d.ts',
    '!src/models/**',
  ],
}; 