var config = {
  presets: [
    [
      "@babel/env", {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  plugins: [
    "@vue/babel-plugin-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": false
      }
    ]
  ]
};
if (process.env.BABEL_ENV === 'test') {
  config.plugins.push("istanbul");
}

module.exports = config;
