const { dialog, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");
const os = require("os");

const saveas = async (data) => {
  let fs = require("fs");
  let path = store.get("file");

  if (path.length) {
    fs.writeFileSync(path, data, function (err) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    const homedir = os.homedir();
    dialog
      .showSaveDialog({
        title: "保存文件",
        defaultPath: homedir + "/new file1.md",
        filters: [{ name: "Markdown文档", extensions: ["md"] }],
      })
      .then((res) => {
        if (!res.canceled) {
          fs.writeFileSync(res.filePath, data);
          console.log(res.filePath)
          store.set("file",res.filePath);
        }
      })
      .catch((req) => {
        console.log(req);
      });
  }
};

ipcMain.handle("on-save-file", async (event, data) => {
  return await saveas(data);
});

module.exports = { saveas };
