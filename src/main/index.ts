import "source-map-support/register";
import { hello } from "native-addon";
import path from "path";
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null;

app.on("ready", (): void => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 320,
    minHeight: 400,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "..", "preload", "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "..", "public", "index.html"));
  mainWindow.webContents.openDevTools();
  console.log(hello());
});

app.on("quit", (): void => {
  mainWindow = null;
});
