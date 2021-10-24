module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:vue/strongly-recommended",
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "spaced-comment": ["error", "always"],
    "no-whitespace-before-property": "error",
    "block-spacing": ["error", "always"],
    "eqeqeq": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "indent": ["error", 2],
    "no-unused-vars": "warn"
  }
};
