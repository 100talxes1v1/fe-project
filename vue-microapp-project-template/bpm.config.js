
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
    '/api': {
      target: 'http://superqa-gateway.test-dahai.com',
      changeOrigin: true
    },
  }
};
