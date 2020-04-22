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
