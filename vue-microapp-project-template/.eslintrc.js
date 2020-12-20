module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', '@xes/dahai'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'array-callback-return': 'error',
    'vue/require-default-prop': 'off',
    'no-debugger': 2,
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'vue/prop-name-casing': 'off',
  },
};
