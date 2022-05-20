import { BrowserWindow, shell } from 'electron';
import path from 'path';
import log from '../utils/log';
import { GlobalConfig } from '../config';
import { launchServer } from '../appServer';

const logger = log.getLogger('EWindow');

export class EWindow {
  obj: BrowserWindow | undefined = undefined;
  defaultWidth: number;
  defaultHeight: number;
  defaultX?: number;
  defaultY?: number;

  constructor(
    public name: string,
    public url: string,
    width?: number,
    height?: number,
    x?: number,
    y?: number
  ) {
    if (width) {
      this.defaultWidth = width;
    } else {
      this.defaultWidth = 1200;
    }
    if (height) {
      this.defaultHeight = height;
    } else {
      this.defaultHeight = 800;
    }
    if (x) {
      this.defaultX = x;
    }
    if (y) {
      this.defaultY = y;
    }
  }

  open() {
    if (!this.obj) {
      this.obj = new BrowserWindow({
        width: this.defaultWidth,
        height: this.defaultHeight,
        x: this.defaultX,
        y: this.defaultY,
        webPreferences: {
          preload: path.resolve(__dirname, '../../preload/dist/preload.umd.js'),
          allowRunningInsecureContent: false
          // nodeIntegration: true,
          // nodeIntegrationInWorker: true,
          // enableRemoteModule: true
        }
      });
      if (!this.obj) {
        logger.error('create window fail');
        return;
      }
      // Make all links open with the browser, not with the application
      this.obj.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url);
        return { action: 'deny' };
      });

      this.obj.on('show', () => {
        // 将name挂到 webContents 上，将来在各种回调中方便找到对应窗口
        if (this.obj) {
          this.obj.webContents.name = this.name;
        }
      });
      this.obj.on('closed', () => {
        this.obj = undefined;
      });

      if (GlobalConfig.instance.developmentMode) {
        // dev环境
        this.obj.loadURL(this.url);
        this.obj.webContents.openDevTools();
      } else {
        launchServer();
        this.obj.loadURL(this.url);
      }
    } else {
      this.obj.focus();
    }
  }

  send(name: string, v: any) {
    if (this.obj) {
      this.obj.webContents.send(name, v);
    }
  }
}

function genUrl(pathname: string): string {
  if (process.env['VITE_DEV_SERVER_HOST']) {
    return `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}${pathname}`;
  } else {
    return `app://render${pathname}`;
  }
}

export const windowManager = {
  home: new EWindow('home', genUrl('/apps/home'), 1200, 800, 640, 50),
  about: new EWindow('about', genUrl('/apps/about'), 500, 260)
};
