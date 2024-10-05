import path from "node:path";
import {
  app,
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  dialog,
  protocol,
  net,
} from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";
import fs from "fs";
import url, { fileURLToPath, pathToFileURL } from "node:url";

const store = new Store();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
};

(async () => {
  await app.whenReady().then(() => {
    protocol.handle("media-loader", (request) => {
      const reqUrl = new URL(request.url);
      return net.fetch(pathToFileURL(reqUrl.pathname.substring(1)));
    });
  });

  ipcMain.handle("dialog:openFile", handleFileOpen);

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.handle("getStoredData", async (event, arg) => {
  var fetchedData = await store.get("games");
  console.log("fetched data", fetchedData);
  return fetchedData;
});

ipcMain.handle("setStoredData", async (event, arg) => {
  store.set("games", arg);
  console.log("set data", arg);
  return 1;
});

ipcMain.handle("getNumber", async (event, arg) => {
  return 1;
});

app.on("window-all-closed", () => {
  app.quit();
});
