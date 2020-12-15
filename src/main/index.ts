import "v8-compile-cache";
import "source-map-support/register";
import path from "path";
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null;

const gotTheLock: boolean = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (): void => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
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
    mainWindow.on("ready-to-show", (): void => {
      mainWindow?.show();
    });
  });
}

app.on("quit", (): void => {
  mainWindow = null;
});
