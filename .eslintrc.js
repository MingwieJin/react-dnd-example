module.exports = {
  extends: ['eslint:recommended', 'next', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-empty-function': 1,
      },
    },
  ],
  rules: {
    'no-unused-vars': 1,
  },
};
