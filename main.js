const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const WinState = require("electron-win-state").default;
const createTray = require("./tray/tray");
const Store = require("electron-store");
const store = new Store();
const action = require("./controller/saveFile");
const closeWin = require("./controller/closeWin");

// open window
require("./controller/openWindow");

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
    defaultHeight: 800,
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

  store.set("update",false);

  win.loadURL("http://127.0.0.1:5173/");

  winState.manage(win);

  win.on("ready-to-show", () => {
    win.show();
  });

  win.on("close", (e) => {
    e.preventDefault();

    closeWin(function (idx) {
      if (idx.response == 0) {
        let data = store.get("word");
        action.saveas(data);
      } else if (idx.response == 1) {
        win.destroy();
      } else {
        e.preventDefault();
      }
    });
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
