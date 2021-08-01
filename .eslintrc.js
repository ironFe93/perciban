module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 10,
  },
  ignorePatterns: ['build'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-tabs': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'no-var': ['error'],
    'no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': 0,
  },
};
