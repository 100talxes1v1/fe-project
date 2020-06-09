var path = require('path');
var webpack = require('webpack');
var createBaseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { getStyleRules } = require('./styleRule');

let config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '../src/demo/index.ts')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:7].js',
    chunkFilename: 'static/js/[id].[chunkhash:7].js',
    publicPath: '/'
  },
  module: {
    rules: getStyleRules('dev')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'development',
      template: 'conf/index.html',
      inject: true
    })
  ]
};

module.exports = merge(createBaseConfig('dev'), config);
