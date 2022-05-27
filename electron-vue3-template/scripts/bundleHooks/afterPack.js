const { writeFile, removeFile } = require('./fs');

exports.default = function (context) {
  const bakPackageInfo = require('../../package.bak.json');
  const rootPackageInfo = require('../../package.json');
  if (Object.keys(bakPackageInfo).length === 0) {
    rootPackageInfo.dependencies = undefined;
  } else {
    rootPackageInfo.dependencies = bakPackageInfo;
  }
  removeFile('package.bak.json');
  writeFile('package.json', JSON.stringify(rootPackageInfo, null, 2));
};
