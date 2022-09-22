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

const createWindow = async () => {
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

  // Load the index.html when not in development
  if (app.isPackaged) {
    win.loadURL(`file://${__dirname}/common/index.html`);
  } else {
    let url = "http://localhost:5173"; // 本地启动的vue项目路径
    win.loadURL(url);
  }

  winState.manage(win);

  win.on("ready-to-show", () => {
    win.show();
    const filePath = process.argv[1];
    filePath!="." && onOpenFile(filePath);
  });

  win.on("close", (e) => {
    win.show();
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

const onOpenFile = (url) => {
  store.set("file", url);
  BrowserWindow.getFocusedWindow().webContents.send("system-open-file");
};
