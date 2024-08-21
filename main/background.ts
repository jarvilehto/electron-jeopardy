import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";

const store = new Store();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

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
