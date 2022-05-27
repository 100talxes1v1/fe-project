const fs = require('fs');

exports.writeFile = function (destinationFile, data) {
  fs.writeFileSync(destinationFile, data, {
    encoding: 'utf8'
  });
}

exports.removeFile = function (destinationFile) {
  fs.rmSync(destinationFile, {
    force: true
  });
}
