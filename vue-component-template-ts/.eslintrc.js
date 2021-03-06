module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/strongly-recommended",
    "@xes/dahai",
    "@vue/typescript/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-parameter-properties": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        "prefixWithI": "always"
      },
      {
        "prefixWithI": "always"
      },
      {
        "prefixWithI": "always"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};