const path = require('path');

module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": path.resolve(__dirname, "./tsconfig.json"),
    "tsconfigRootDir": __dirname
  },
  "env": {
    "es6": true,
    "node": true
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-parameter-properties": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};
