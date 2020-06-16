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
var packageInfo = require('../package.json');

var port = 8080;
var ip = '0.0.0.0';
var url = `http://${ip}:${port}`;
var app = express();

const rmPromise = promiseify(rm);
var spinner = null;
rmPromise(path.resolve(__dirname, '../dist')).then(() => {
  spinner= ora('Starting development server...\n');
  spinner.start();

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

  // compile dev.app.config
  var appCompilePromise = new Promise((resolve, reject) => {
    var appCompiler = webpack(webpackAppConfig);
    var appMiddleware = webpackMiddleware(appCompiler, {
      publicPath: webpackAppConfig.output.publicPath,
      logLevel: 'error',
      writeToDisk: true
    });
    appMiddleware.waitUntilValid(function (stats) {
      spinner.stop();
      if (stats) {
        if (stats.hasErrors()) {
          reject(stats);
          return;
        }
      }
      resolve();
    });
    app.use(appMiddleware);

    var appHotMiddleware = webpackHotMiddleware(appCompiler);
    app.use(appHotMiddleware);
  });

  // compile dev.config
  var demoCompilePromise = new Promise((resolve, reject) => {
    var compiler = webpack(webpackDevConfig);
    var middleware = webpackMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      logLevel: 'error'
    });
    middleware.waitUntilValid(function (stats) {
      spinner.stop();
      if (stats) {
        if (stats.hasErrors()) {
          reject(stats);
          return;
        }
      }
      resolve();
    });
    app.use(middleware);
  });

  Promise.all([
    appCompilePromise,
    demoCompilePromise
  ]).then(() => {
    var appPath = path.resolve('/', packageInfo.bostonBaseUrl, packageInfo.bostonAppName);
    console.log(chalk.cyan('  Development server Listenning at ' + url + '\n  You can visit boston app at ' + url + appPath + '\n'));
  }).catch(err => {
    // console.error(err);
    server.close(function () {
      process.exit(0);
    });
  });

  var server = app.listen(port, ip);
}).catch(err => {
  let message = err.message ? err.message : err;
  console.error(message);
});

