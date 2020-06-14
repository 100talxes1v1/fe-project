var path = require('path');
var createBaseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var DeclarationBundlerPlugin = require('declaration-bundler-webpack4-plugin');
var bostonDependencies = require('../package.json').bostonDependencies;
var BostonWebpackPlugin = require('@xes/dh-boston-webpack-plugin');
var { getStyleRules } = require('./styleRule');
var packageInfo = require('../package.json');

function __externalConfig() {
  const c = {};
  if (bostonDependencies) {
    Object.keys(bostonDependencies).forEach(libName => {
      bostonDependencies[libName].forEach(name => {
        c[name] = name;
      });
    });
  }
  return c;
}

let config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, '../src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: '',
    library: `${packageInfo.bostonAppName}`,
		libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageInfo.bostonAppName}`
  },
	externals: [__externalConfig()],
  module: {
    rules: getStyleRules('prod')
  },
  optimization: {
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new DeclarationBundlerPlugin({
      out: 'index.d.ts'
    }),
    new BostonWebpackPlugin()
  ]
};

module.exports = merge(createBaseConfig('prod'), config);
