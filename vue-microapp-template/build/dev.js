var webpackDevConfig = require('../conf/webpack.dev.config');
var webpackAppConfig = require('../conf/webpack.dev.app.config');
var promiseify = require('./promiseWrapper');
var path = require('path');
var webpack = require('webpack');
var rm = require('rimraf');
var ora = require('ora');
var chalk = require('chalk');
var express = require('express');
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxyMiddleware = require('http-proxy-middleware');
var serveStatic = require('serve-static');

const rmPromise = promiseify(rm);
const webpackCompilePromise = function (webpackConfig) {
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};
var spinner = null;
rmPromise(path.resolve(__dirname, '../dist')).then(() => {
  spinner= ora('Building boston app...\n');
  spinner.start();
  return webpackCompilePromise(webpackAppConfig);
}).then(stats => {
  spinner.stop();
  if (stats) {
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');
    if (stats.hasErrors()) {
      throw new Error('  Build fail.\n');
    }
  }
  console.log(chalk.cyan('  Build complete.\n'));
}).then(() => {

  var port = 8080;
  var ip = '0.0.0.0';
  var url = `http://${ip}:${port}`;

  spinner= ora('Starting dev server...\n');
  spinner.start();

  var app = express();

  app.use('/app', serveStatic(path.resolve(__dirname, '../dist/app/')));

  app.use(require('connect-history-api-fallback')());

  var proxyTable = {};
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  });

	var compiler = webpack(webpackDevConfig);

	var middleware = webpackMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    writeToDisk: true
	});
	middleware.waitUntilValid(function (stats) {
    spinner.stop();
    if (stats) {
      if (stats.hasErrors()) {
        console.error(chalk.red('  Start dev server fail.\n'));
        server.close(function () {
          process.exit(0);
        });
        return;
      }
    }
    console.log(chalk.cyan('  Dev server Listenning at ' + url + '\n'));
	});
	app.use(middleware);
	var hotMiddleware = webpackHotMiddleware(compiler);
	app.use(hotMiddleware);

  spinner.stop();
  console.log(chalk.cyan('  Dev server Listenning at ' + url + '\n'));
  app.listen(port, ip);
}).catch(err => {
  let message = err.message ? err.message : err;
  console.error(message);
});

