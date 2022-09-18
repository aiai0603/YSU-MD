const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const WinState = require("electron-win-state").default;
const createTray = require("./tray/tray");


// 获取网站的截图
require("./controller/getSource");

// alert
require("./controller/alert");

// open window
require("./controller/openWindow");


// buildMenu
require("./controller/buildMenu");

const createWindow = () => {
  const winState = new WinState({
    dafaultWidth: 1000,
    defaultHeight: 800,
    electronStoreOptions: {
      name: "window-state-main",
    },
  });

  const win = new BrowserWindow({
    // 自定义窗口状态
    ...winState.winOptions,
    title:"YSU-MD",

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      // 定义预加载的js
      preload: path.resolve(__dirname, "./preload/index.js"),
    },

    show: false,
  });

  win.loadURL("http://127.0.0.1:5173/");

  win.webContents.openDevTools();

  winState.manage(win);

  win.on("ready-to-show", () => {
    win.show();
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
