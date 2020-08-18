const path = require('path');

module.exports = {
  resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '~': path.resolve(__dirname, '../src'),
        '@': path.resolve(__dirname, '../src'),
        // 'vue$': 'vue/dist/vue.esm.js'
      }
  },
}