import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },

  async getStoredData() {
    let response_ = "response_ pending";
    response_ = await ipcRenderer.invoke("getStoredData");
    return response_;
  },
  setStoredData(data) {
    ipcRenderer.invoke("setStoredData", data);
  },
  getNumber() {
    ipcRenderer.invoke("getNumber");
  },
  chooseFile() {
    ipcRenderer.send("chooseFile");
  },
  async openFile() {
    let response_ = await ipcRenderer.invoke("dialog:openFile");
    return response_;
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
