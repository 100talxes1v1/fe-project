var path = require('path');
var merge = require('webpack-merge');
var prodConfig = require('./webpack.prod.config');
var packageInfo = require('../package.json');

let config = {
  output: {
    path: path.resolve(__dirname, `../dist/app/${packageInfo.microAppName}`),
    publicPath: `/app/${packageInfo.microAppName}/`
  }
};

module.exports = merge(prodConfig, config);
