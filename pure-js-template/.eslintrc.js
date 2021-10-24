module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "extends": [
    "eslint:recommended"
  ],
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
