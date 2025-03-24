export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '^@Store(.*)$': '<rootDir>/src/store/$1',
    '^@Utils(.*)$': '<rootDir>/src/utils/$1',
    '^@Types(.*)$': '<rootDir>/src/types/$1',
    '^@Assets(.*)$': '<rootDir>/src/assets/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
};
