const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const WinState = require("electron-win-state").default;
const createTray = require("./tray/tray");
const Store = require("electron-store");
const store = new Store();
const action = require("./controller/saveFile");
const closeWin = require("./controller/closeWin");


// buildMenu
require("./controller/buildMenu");

// close
require("./controller/closeWin");

// open
require("./controller/openFile");

// save
require("./controller/saveFile");

const createWindow = () => {
  const winState = new WinState({
    dafaultWidth: 1000,
    defaultHeight: 1000,
    electronStoreOptions: {
      name: "window-state-main",
    },
  });

  const win = new BrowserWindow({
    ...winState.winOptions,
    title: "YSU-MD",

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.resolve(__dirname, "./preload/index.js"),
    },

    show: false,
  });

  ipcMain.handle("close-event", async (event, data) => {
    win.destroy();
  });

  store.set("update", false);
  store.set("word", "");

  win.loadURL("http://127.0.0.1:5173/");

  winState.manage(win);

  win.on("ready-to-show", () => {
    win.show();
  });

  win.on("close", (e) => {
    e.preventDefault();
    BrowserWindow.getFocusedWindow().webContents.send("system-quit");
  });

  createTray(app, win);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
