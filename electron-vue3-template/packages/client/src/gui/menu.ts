import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { windowManager } from './window';

const menuList: MenuItemConstructorOptions[] = [
  {
    label: app.name,
    submenu: [
      {
        label: '关于',
        click: () => {
          windowManager.about.open();
        }
      },
      {
        type: 'separator'
      },
      {
        label: '缩放',
        accelerator: 'CmdOrCtrl+z',
        role: 'zoom'
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+c',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+v',
        role: 'paste'
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl+a',
        role: 'selectAll'
      },
      {
        type: 'separator'
      },
      {
        label: '关闭',
        role: 'close'
      },
      {
        role: 'quit'
      }
    ]
  },
  {
    label: '窗口',
    submenu: [
      {
        label: '主页',
        accelerator: 'CmdOrCtrl+h',
        click: () => {
          windowManager.home.open();
        }
      }
    ]
  },
  {
    label: '调试',
    submenu: [
      {
        label: '刷新',
        accelerator: 'CmdOrCtrl+r',
        role: 'reload'
      },
      {
        label: '打开调试工具',
        accelerator: 'CmdOrCtrl+d',
        click: () => {
          const fw = BrowserWindow.getFocusedWindow();
          if (fw) {
            fw.webContents.openDevTools();
          }
        }
      }
    ]
  }
];

export function createMenu() {
  const menu = Menu.buildFromTemplate(menuList);
  Menu.setApplicationMenu(menu);
}
