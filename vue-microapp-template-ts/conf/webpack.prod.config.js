var path = require('path');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var DeclarationBundlerPlugin = require('declaration-bundler-webpack4-plugin');
var bostonDependencies = require('../package.json').bostonDependencies;
var BostonWebpackPlugin = require('@xes/dh-boston-webpack-plugin');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __vueCssLoaders(preProcessorName) {
  let loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
  ];
  if (preProcessorName === 'scss') {
    loaders.push('sass-loader');
  } else if (preProcessorName === 'sass') {
    loaders.push({
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
      }
    });
  } else if (preProcessorName === 'less') {
    loaders.push('less-loader');
  }
  return loaders;
}

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
		libraryTarget: 'umd',
    jsonpFunction: 'webpackJsonp_<%=appName%>'
  },
	externals: [__externalConfig()],
  module: {
    rules: [
			{
				resource: {
					test: /\.css$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders()
			},
			{
				resource: {
					test: /\.scss$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders('scss')
			},
			{
				resource: {
					test: /\.sass$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders('sass')
			},
			{
				resource: {
					test: /\.less$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders('less')
			}
    ]
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
      out: '../dist/index.d.ts'
    }),
    new BostonWebpackPlugin()
  ]
};

module.exports = merge(baseConfig, config);
