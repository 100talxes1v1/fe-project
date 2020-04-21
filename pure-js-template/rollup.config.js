var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var babel = require("rollup-plugin-babel");
var { uglify } = require("rollup-plugin-uglify");
var externalDependencies = Object.keys(require('./package.json').dependencies);

var config = {
  input: 'src/index.js',
  output: {
    file: 'dist/<%=libraryName%>.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ],
  external: function (moduleName) {
    return externalDependencies.some(item => moduleName.startsWith(item));
  }
};
if (process.env.NODE_ENV === 'production') {
  config.output.sourcemap = false;
  if (config.output.format === 'esm') {
    config.output.file = 'dist/<%=libraryName%>.esm.js';
  } else {
    config.output.file = 'dist/<%=libraryName%>.min.js';
    config.plugins.push(uglify());
  }
}

module.exports = config;
