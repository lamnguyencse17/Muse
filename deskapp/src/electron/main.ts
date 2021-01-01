import {app, BrowserWindow} from "electron";
import * as path from "path";
import * as url from "url";
import os from "os";
import {REACT_DEV_PATH} from "../common/constants/config";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    BrowserWindow.addDevToolsExtension(
        path.join(os.homedir(), REACT_DEV_PATH)
    )
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

app.on("ready", createWindow);
app.allowRendererProcessReuse = true;
