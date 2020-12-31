import { app, BrowserWindow, ipcMain } from "electron";``
import * as path from "path";
import * as url from "url";
import {
  GET_PEER_ID,
  GET_PEER_ID_REPLY,
  PEERJS_CHANNEL,
  SET_PEER_ID,
  SET_PEER_ID_REPLY
} from "../common/constants/peerjs";

let mainWindow: Electron.BrowserWindow | null;

let peerId: string;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
    },
    backgroundColor: "#fff"
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`);
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.on(PEERJS_CHANNEL, (event, arg: {eventName: string, payload: any}) => {
  switch (arg.eventName) {
    case GET_PEER_ID: event.reply(GET_PEER_ID_REPLY, peerId); break;
    case SET_PEER_ID: peerId = arg.payload; event.reply(SET_PEER_ID_REPLY, true); break;
    default: event.returnValue = null;
  }
})

app.on("ready", createWindow);
app.allowRendererProcessReuse = true;
