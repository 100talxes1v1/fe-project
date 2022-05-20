import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import log from './utils/log';
import { initServer } from './appServer';
import { GlobalConfig } from './config';
import { createMenu, windowManager } from './gui';

const logger = log.getLogger('main');

const isDevelopmentMode = !!process.env['VITE_DEV_SERVER_HOST'];
GlobalConfig.instance.developmentMode = isDevelopmentMode;

initServer();
main();

async function initApp() {
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
  }

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
      allWindows[0].focus();
    } else {
      windowManager.home.open();
    }
  });

  // Exit cleanly on request from parent process in development mode.
  if (isDevelopmentMode) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit') {
          app.quit();
        }
      });
    } else {
      process.on('SIGTERM', () => {
        app.quit();
      });
    }
  }
  await app.whenReady();
  if (isDevelopmentMode) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      // TODO: Vue Devtools failed to install: Error: Version of Electron: 18.2.3 does not match required range >=1.2.1 for extension ljjemllljcmogpfapbkkighbhhppjdbg
      console.error('Vue Devtools failed to install:', e);
    }
  }
}

function main() {
  initApp()
    .then(() => {
      // create menu
      createMenu();
      // create window
      windowManager.home.open();
    })
    .catch((e) => {
      console.error('launch electron error:', e);
    });
}
