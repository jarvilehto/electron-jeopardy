import {
  Database,
  OPEN_READWRITE,
} from "./../node_modules/sqlite3/lib/sqlite3.d";
import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./databases/test.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);

    console.log("connection successful");
  }
);

/*
//db.run(`CREATE TABLE tester(category, id)`);
const sql = `INSERT INTO tester(category, id)
              VALUES(?,?)`;
              */

/*
db.run(sql, ["placeholder", 1], (err) => {
  if (err) return console.error(err.message);
  console.log("A new row has been created");
});
*/

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const getDBPath = (filename): string => {
  let base = app.getAppPath();
  if (app.isPackaged) {
    base = base.replace("/app.asar", "");
  }
  return path.resolve(base, `databases/${filename}`);
};

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

app.on("window-all-closed", () => {
  db.close((err) => {
    if (err) return console.error(err.message);
  });
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.on("greet", async (event, arg) => {
  console.log(arg);
});

ipcMain.on("searchDb", async (event, arg) => {
  console.log(getDBPath(arg));
});

ipcMain.on("asynchronous-message", (event, arg) => {
  const sql = arg;
  db.all(sql, (err, rows) => {
    event.reply("asynchronous-reply", (err && err.message) || rows);
  });
});

ipcMain.on("fetchDb", async (event, arg) => {
  const sql = `SELECT * FROM tester`;

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.map((row) => console.log(row));
  });
});
