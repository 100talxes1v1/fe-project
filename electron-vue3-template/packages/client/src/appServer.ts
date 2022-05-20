import { app, protocol, ProtocolResponse } from 'electron';
import { resolve } from 'path';
import { isDir, isPathExist, makeDir } from './utils/fs';
import log from './utils/log';
const logger = log.getLogger('appServer');

const appRootPath = resolve(__dirname, '../../render/dist');
const extensionRootPath = resolve(app.getPath('userData'), 'extensions');

export function initServer() {
  // Scheme must be registered before the app is ready
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: { secure: true, standard: true, bypassCSP: true }
    }
  ]);

  initPluginService();
}

function initPluginService() {
  logger.info('pluginRoot: ', extensionRootPath);
  if (!isPathExist(extensionRootPath)) {
    makeDir(extensionRootPath);
  }
}

export function launchServer() {
  logger.info('webRoot: ', appRootPath);
  function response404(): ProtocolResponse {
    return {
      statusCode: 404,
      mimeType: 'text/html',
      path: resolve(appRootPath, '404.html')
    };
  }

  protocol.registerFileProtocol('app', (req, cb) => {
    const urlEntity = new URL(req.url);
    let pathname = urlEntity.pathname;
    if (pathname.length > 0) {
      // 去掉开头的'/'
      pathname = pathname.substring(1);
    }

    const pathnames = pathname.split('/');
    if (pathnames.length < 2) {
      cb(response404());
      return;
    }
    const [category, name] = pathname.split('/').slice(0, 2);
    if (category === 'apps') {
      const appPathname = `${category}/${name}`;
      const appPath = resolve(appRootPath, appPathname);
      const appIndexHtml = resolve(appPath, 'index.html');
      const resourcePath = resolve(appRootPath, pathname);
      if (isPathExist(resourcePath)) {
        if (isDir(resourcePath)) {
          cb(
            isPathExist(appIndexHtml) ? { path: appIndexHtml } : response404()
          );
        } else {
          cb({
            path: resourcePath
          });
        }
      } else {
        cb(isPathExist(appIndexHtml) ? { path: appIndexHtml } : response404());
      }
    } else if (category === 'plugins') {
      // 插件代码
      const pluginPathname = `${category}/${name}`;
      const pluginPath = resolve(extensionRootPath, pluginPathname);
      const pluginIndexHtml = resolve(pluginPath, 'index.html');
      const resourcePath = resolve(extensionRootPath, pathname);
      if (isPathExist(resourcePath)) {
        if (isDir(resourcePath)) {
          cb(
            isPathExist(pluginIndexHtml)
              ? { path: pluginIndexHtml }
              : response404()
          );
        } else {
          cb({ path: resourcePath });
        }
      } else {
        cb(
          isPathExist(pluginIndexHtml)
            ? { path: pluginIndexHtml }
            : response404()
        );
      }
    } else {
      cb(response404());
    }
  });
}
