const { Tray, Menu } = require("electron");

function createTray(app, win) {
  const tray = new Tray("./public/icon.png");
  tray.setToolTip("YSU-MD");
  tray.on("click", () => {
    win.show();
  });
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "保存",
      click: () => {},
    },
    {
      type: "separator",
    },
    {
      label: "退出",
      click: () => {},
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.on("right-click", () => {
    tray.popUpContextMenu(contextMenu);
  });
}

module.exports = createTray;
