import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },

  async getStoredData(v) {
    let response_ = "response_ pending";
    response_ = await ipcRenderer.invoke("getStoredData", v);
    return response_;
  },
  setStoredData(data) {
    ipcRenderer.invoke("setStoredData", data);
  },
  getNumber() {
    ipcRenderer.invoke("getNumber");
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
