import "v8-compile-cache";
import "source-map-support/register";
import path from "path";
import { app, BrowserWindow } from "electron";
import { mainReloader } from "electron-hot-reload";
import isDev from "electron-is-dev";

if (isDev) {
  const mainFile: string = path.join(__dirname, "index.js");
  mainReloader(mainFile, undefined, (): void => {
    const date: Date = new Date();
    // eslint-disable-next-line no-console
    console.log(
      `[Reloaded at]: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`,
    );
  });
}

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
