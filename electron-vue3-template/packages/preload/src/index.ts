import { domReady } from './utils';
import { useLoading } from './loading';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// 页面loading
const { appendLoading, removeLoading } = useLoading();
window.removeLoading = removeLoading;
window.addEventListener('load', () => {
  removeLoading();
});

domReady().then(appendLoading);

// exposeInMainWorld 可以传递对象到浏览器的windows上，但是只能传递函数、map等，如果传递了对象，对象附带的函数会消失
// 此处直接暴露了ipc的原始 send和 on方法，仅仅是为了示例，实际开发不推荐这么暴露接口
contextBridge.exposeInMainWorld('electron', {
  send: ipcRenderer.send,
  on: function (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void
  ) {
    ipcRenderer.on.apply(ipcRenderer, [channel, listener]);
  }
});
