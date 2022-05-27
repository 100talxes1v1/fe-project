const { writeFile } = require('./fs');

exports.default = function (context) {
  const clientPackageInfo = require('../../packages/client/package.json');
  const rootPackageInfo = require('../../package.json');
  writeFile('package.bak.json', JSON.stringify(rootPackageInfo.dependencies || {}, null, 2));
  rootPackageInfo.dependencies = clientPackageInfo.dependencies;
  writeFile('package.json', JSON.stringify(rootPackageInfo, null, 2));
};
