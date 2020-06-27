var path = require('path');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_modules(dir) {
  return path.join(__dirname, '..', dir)
}

function __vueCssLoaders(preProcessorName) {
  let loaders = [
    'vue-style-loader',
    'css-loader',
    'postcss-loader'
  ];
  if (preProcessorName === 'scss') {
    loaders.push({
      loader: 'sass-loader'
      // options: {
      //   data: '@import "@/assets/style/common/variables.scss";'
      // }
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
    index: path.resolve(__dirname, '../src/demo/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:7].js',
    chunkFilename: 'static/js/[id].[chunkhash:7].js',
    publicPath: '/'
  },
  resolve: {
    symlinks: false,
		alias: {
			'@xes/dh-catalyst$': '@xes/dh-catalyst/src/index.js',
			'@xes/dh-component-vue-mp-ui$': '@xes/dh-component-vue-mp-ui/src/index.js'
		}
	},
  module: {
    rules: [
			{
				resource: {
					test: /\.css$/,
					include: [
            __path_src(),
            __path_modules('node_modules/element-ui'),
            __path_modules('node_modules/@xes/dh-catalyst'),
            __path_modules('node_modules/@xes/dh-component-vue-mp-ui'),
            __path_modules('node_modules/viewerjs')
					]
				},
				use: __vueCssLoaders()
			},
			{
				resource: {
					test: /\.scss$/,
					include: [
						__path_src(),
            __path_modules('node_modules/@xes/dh-catalyst'),
            __path_modules('node_modules/@xes/dh-component-vue-mp-ui')
					]
				},
				use: __vueCssLoaders('scss')
			},
			{
				resource: {
					test: /\.sass$/,
					include: [
						__path_src(),
            __path_modules('node_modules/@xes/dh-catalyst'),
            __path_modules('node_modules/@xes/dh-component-vue-mp-ui')
					]
				},
				use: __vueCssLoaders('sass')
			},
			{
				resource: {
					test: /\.less$/,
					include: [
						__path_src(),
            __path_modules('node_modules/@xes/dh-catalyst'),
            __path_modules('node_modules/@xes/dh-component-vue-mp-ui')
					]
				},
				use: __vueCssLoaders('less')
			}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      template: 'conf/index.html',
      inject: true
    })
  ]
};

module.exports = merge(baseConfig, config);
