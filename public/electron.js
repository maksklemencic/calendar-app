const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  (async () => { // Start of IIFE
    let isDev;
    try {
      isDev = (await import('electron-is-dev')).default;
      console.log('Loaded electron-is-dev:', isDev)
    } catch (error) {
      console.error('Failed to load electron-is-dev:', error);
      isDev = false;
    }

    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
    mainWindow.loadURL(startUrl);

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => mainWindow = null);
  })(); // End of IIFE
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
