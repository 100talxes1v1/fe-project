var createBaseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var { getStyleRules } = require('./styleRule');

var testConfig = merge(createBaseConfig('test'), {
  mode: 'development',
	devtool: 'inline-source-map',
  module: {
    rules: getStyleRules('test')
  }
});

module.exports = testConfig;
