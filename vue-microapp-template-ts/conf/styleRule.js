var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var { __path_src, __path_test, __path_modules } = require('./util');

/**
 * nodeEnv: 'dev', 'test', 'prod'
 */
exports.getStyleRules = function (nodeEnv) {
  function __vueCssLoaders(preProcessorName) {
    let loaders = [
      'css-loader',
      'postcss-loader'
    ];
    if (nodeEnv === 'prod') {
      loaders.unshift(MiniCssExtractPlugin.loader);
    } else {
      loaders.unshift('vue-style-loader');
    }
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

  function __module_css_includes() {
    if (nodeEnv === 'prod') {
      return  [
        __path_src()
      ];
    } else if (nodeEnv === 'test') {
      return  [
        __path_src(),
        __path_test()
      ];
    } else {
      return  [
        __path_src(),
        __path_modules('node_modules/element-ui')
      ];
    }
  }

  return [
    {
      resource: {
        test: /\.css$/,
        include: __module_css_includes()
      },
      use: __vueCssLoaders()
    },
    {
      resource: {
        test: /\.scss$/,
        include: __module_css_includes()
      },
      use: __vueCssLoaders('scss')
    },
    {
      resource: {
        test: /\.sass$/,
        include: __module_css_includes()
      },
      use: __vueCssLoaders('sass')
    },
    {
      resource: {
        test: /\.less$/,
        include: __module_css_includes()
      },
      use: __vueCssLoaders('less')
    }
  ];
};
