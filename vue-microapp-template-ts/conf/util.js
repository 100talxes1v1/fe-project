var path = require('path');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_test() {
  return path.resolve(__dirname, '../test/unit');
}

function __path_modules(dir) {
  return path.join(__dirname, '..', dir)
}

exports.__path_src = __path_src;
exports.__path_test = __path_test;
exports.__path_modules = __path_modules;
