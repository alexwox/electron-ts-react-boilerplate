import { IpcRendererEvent } from "electron";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {});

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(
    key,
    (_: IpcRendererEvent, payload: EventPayloadMapping[Key]) =>
      callback(payload)
  );
}
