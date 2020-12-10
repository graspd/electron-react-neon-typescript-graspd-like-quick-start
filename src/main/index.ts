import "source-map-support/register";
import path from "path";
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null;

app.on("ready", (): void => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 320,
    minHeight: 400,
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "..", "preload", "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "..", "public", "index.html"));
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
    // mainWindow?.webContents.openDevTools(); <- to enable devtools
  });
});

app.on("quit", (): void => {
  mainWindow = null;
});
