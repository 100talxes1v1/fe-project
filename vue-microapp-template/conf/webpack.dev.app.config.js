var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var prodConfig = require('./webpack.prod.config');
var packageInfo = require('../package.json');

let config = {
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, `../dist/app/${packageInfo.bostonAppName}`),
    publicPath: `/app/${packageInfo.bostonAppName}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(prodConfig, config);
