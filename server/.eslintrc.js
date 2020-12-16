module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest/no-done-callback': 0,
    'no-prototype-builtins': 0,
    'linebreak-style': ['error', 'windows'],
    'no-plusplus': 0,
    'no-await-in-loop': 0,
    'no-shadow': 0,
    'max-len': 0,
    'no-nested-ternary': 0,
    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|table)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
  },
};
