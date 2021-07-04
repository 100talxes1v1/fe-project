var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __vueCssLoaders(preProcessorName) {
  let loaders = [
    'vue-style-loader',
    'css-loader',
    'postcss-loader'
  ];
  if (preProcessorName === 'scss') {
    loaders.push({
      loader: 'sass-loader',
      options: {
        data: '@import "@/assets/style/variables.scss";'
      }
    });
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

let config = {
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '../src/index.ts')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:7].js',
    chunkFilename: 'static/js/[id].[chunkhash:7].js',
    publicPath: '/'
  },
	resolve: {
		alias: {
		}
	},
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'development',
      template: 'conf/index.html',
      favicon: path.resolve(__dirname, '../favicon.ico'),
      inject: true
    })
  ]
};

module.exports = merge(baseConfig, config);
