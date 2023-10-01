module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'eslint-plugin-eslint-config-prettier',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
  plugins: [
    'eslint-config-prettier',
    'eslint-plugin-eslint-config-prettier',
    'prettier',
  ],
};
