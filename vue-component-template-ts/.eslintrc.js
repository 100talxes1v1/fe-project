module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/strongly-recommended",
    "@vue/typescript/recommended"
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
