import "v8-compile-cache";
import { contextBridge, ContextBridge } from "electron";
import isElectron from "is-electron";

const { exposeInMainWorld }: ContextBridge = contextBridge;

exposeInMainWorld("myAPI", {
  isElectron: isElectron,
});
