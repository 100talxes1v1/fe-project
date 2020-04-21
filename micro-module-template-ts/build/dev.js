var webpackConfig = require('../conf/webpack.dev.config');
var promiseify = require('./promiseWrapper');
var path = require('path');
var webpack = require('webpack');
var rm = require('rimraf');
var express = require('express');
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxyMiddleware = require('http-proxy-middleware');

const rmPromise = promiseify(rm);

rmPromise(path.resolve(__dirname, '../dist')).then(() => {

  var port = 8080;
  var ip = '0.0.0.0';
	var url = `http://${ip}:${port}`;

  var app = express();

  app.use(require('connect-history-api-fallback')());

  var proxyTable = {};
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  });

	var compiler = webpack(webpackConfig);

	var middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
	});
	middleware.waitUntilValid(function (stats) {
    if (stats) {
      if (stats.hasErrors()) {
        console.log('> Failed!');
        server.close(function () {
          process.exit(0);
        });
        return;
      }
    }
    console.log('> Listenning at ' + url + '\n');
	});
	app.use(middleware);
	var hotMiddleware = webpackHotMiddleware(compiler);
	app.use(hotMiddleware);


	console.log('> Starting dev server...');
  var server = app.listen(port, ip);
}).catch(err => {
  let message = err.message ? err.message : err;
  console.error(message);
});

