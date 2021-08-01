module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      pathRegex: '\\.(spec|test)\\.ts$',
      diagnostics: false
    }
  },
  testPathIgnorePatterns: [
    'build'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/build/'
  ],
};

