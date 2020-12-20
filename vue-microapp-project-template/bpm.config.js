
const path = require('path');
const webpack = require('webpack');
require('dotenv/config');
module.exports = {
  name: '<%=appName%>',
  type: 'mainapp',
  entry: 'src/index.js',
  registry: 'https://b.xes1v1.com',
  webpack: config => {
    const jsIndex = config.module.rules.findIndex(r => {
      if (r && r.test) {
        if (r.test.toString().indexOf('.js') > -1) {
          return true;
        }
      }
      return false;
    });
    config.module.rules[jsIndex].use[0].options.plugins.push('@vue/transform-vue-jsx');
    config.plugins.push(
      new webpack.DefinePlugin({
        IS_MOCK: process.env.IS_MOCK,
        MOCK_API_URL: JSON.stringify(process.env.MOCK_API_URL),
      })
    );
    return {
      ...config,
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '~': path.resolve(__dirname, './src'),
          '@': path.resolve(__dirname, './src'),
        },
      },
    };
  },
  proxyTable: {
    '/api': {
      target: 'http://superqa-gateway.test-dahai.com',
      changeOrigin: true
    },
  }
};
