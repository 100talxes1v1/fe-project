
module.exports = {
  name: '<%=appName%>',
  type: 'mainapp',
  entry: 'src/index.js',
  baseUrl: '/plus/portal',
  webpack: {
    configFile: 'conf/webpack.config.js',
    devServer: {
      hot: true,
    }
  },
  proxyTable: {
    '/mock/967/api': {
      target: 'http://au.test-dahai.com',
      changeOrigin: true
    },
    '/api': {
      target: 'http://wangxiaoronghe-gateway.test-dahai.com',
      changeOrigin: true
    },
  }
};
