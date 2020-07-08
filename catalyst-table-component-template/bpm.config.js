const CopyPlugin = require('copy-webpack-plugin');
const packageInfo = require('./package.json');

module.exports = {
  name: packageInfo.name,
  type: 'library',
  entry: 'src/index.js',
  webpack: {
    plugins: [
      new CopyPlugin([
        { from: 'meta.json' },
        { from: 'readme.md' },
        { from: 'thumbnail.png' },
        { from: 'custom_logo.jpg' }
      ])
    ]
  }
};
