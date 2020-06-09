var VueLoaderPlugin = require('vue-loader/lib/plugin');
var { __path_src, __path_test, __path_modules } = require('./util');

/**
 * nodeEnv: 'dev', 'test', 'prod'
 */
module.exports = function (nodeEnv) {
  function __module_js_includes() {
    if (nodeEnv === 'prod') {
      return [
        __path_src(),
        __path_test()
      ];
    } else {
      return [
        __path_src(),
        __path_test()
      ];
    }
  }

  return {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': __path_src(),
        'vue$': 'vue/dist/vue.esm.js'
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
                extensions: ['.ts', '.js', '.html', '.vue'],
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
              loader: 'vue-loader'
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
          test: /\.ts$/,
          include: __module_js_includes(),
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                configFile: __path_modules(nodeEnv=== 'test' ? 'test/tsconfig.json' : (nodeEnv === 'dev' ? 'src/demo/tsconfig.json' : 'tsconfig.json')),
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
                name: '[name].[hash:7].[ext]'
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
                name: '[name].[hash:7].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
};
