var gulp = require('gulp');
var eslint = require('gulp-eslint');
var del = require('del');
var rollup = require('rollup');
var rollupConfig = require('./rollup.config');

function clean() {
  return del([
    './dist/**/*'
  ]);
}

function lint() {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format('node_modules/eslint-friendly-formatter'))
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('./dist/'));
}

function bundle() {
  return rollup.rollup(rollupConfig).then(bundler => {
    return bundler.write(rollupConfig.output);
  })
}

exports.default = gulp.series(lint, clean, bundle);

exports.lint = lint;
