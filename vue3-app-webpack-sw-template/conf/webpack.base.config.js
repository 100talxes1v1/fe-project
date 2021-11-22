var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var DotenvWebpack = require('dotenv-webpack');
var { DefinePlugin } = require('webpack');
var getAppVersion = require('./version.js');

const envConfigPath = {
  development: path.resolve(__dirname, '../.env.development'), // 开发环境配置
  test: path.resolve(__dirname, '../.env.test'), // 测试环境配置
  production: path.resolve(__dirname, '../.env.production'), // 正式环境配置
};

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_test() {
  return path.resolve(__dirname, '../test/unit');
}

function __path_modules(dir) {
  return path.join(__dirname, '..', dir)
}

function __module_js_includes() {
	if (process.env.NODE_ENV === 'production') {
    return [
      __path_src(),
      __path_test(),
      __path_modules('node_modules/vue-router'),
      __path_modules('node_modules/vuex')
    ];
  } else {
    return [
      __path_src(),
      __path_test(),
      __path_modules('node_modules/vue-router'),
      __path_modules('node_modules/vuex')
    ];
  }
}

module.exports = {
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
		alias: {
			'@': __path_src()
		}
	},
	module: {
		rules: [
      {
        parser: {
          system: false
        }
      },
			{
				enforce: 'pre',
				test: /\.(ts|js|html|vue)$/,
				include: [
					__path_src()
				],
				use: [
					{
						loader: 'eslint-loader',
						options: {
              formatter: require('eslint-friendly-formatter'),
              fix: true,
              extensions: ['.ts', '.tsx', '.js', '.html', '.vue'],
              failOnError: true
						}
					}
				]
			},
			{
				test: /\.vue$/,
				include: [
					__path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'vue-loader',
						options: {
							transformAssetUrls: {
								'~': __path_src()
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				include: __module_js_includes(),
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.tsx?$/,
				include: __module_js_includes(),
				use: [
					{
						loader: 'babel-loader'
					},
					{
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/TS\.vue$/],
              appendTsxSuffixTo: [/TSX\.vue$/],
              configFile: __path_modules(process.env.BABEL_ENV === 'test' ? 'test/tsconfig.json' : 'tsconfig.json'),
              allowTsInNodeModules: true
            }
					}
				]
			},
			{
				test: /\.html$/,
				include: [
					__path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				resource: {
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					include: [
						__path_src(),
            __path_test()
					]
				},
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'static/img/[name].[hash:7].[ext]'
						}
					}
				]
			},
      {
				resource: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					include: [
						__path_src(),
            __path_test()
					]
				},
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'static/fonts/[name].[hash:7].[ext]'
						}
					}
				]
      }
		]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DotenvWebpack({
      path: envConfigPath[process.env.NODE_ENV] // 根据环境配置文件路径
    }),
    new DefinePlugin({
      SERVICE_WORKER_VERSION: getAppVersion()
    })
  ]
};
