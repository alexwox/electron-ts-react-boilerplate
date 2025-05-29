import { ipcMain, WebContents } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  //Use this wrapper and never ipcMain.handle() directly.

  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, () => handler());
}

export function ipcWebcontentsSend<Key extends keyof EventPayloadMapping>(
  // "Use this wrapper and never ipcMain.handle() directly"
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}
