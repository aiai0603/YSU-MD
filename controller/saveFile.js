const { dialog, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");
const os = require("os");
const closeWin = require("./closeWin");

const saveas = async (data, force) => {
  let path = store.get("file");

  if (path.length && !force) {
    fs.writeFileSync(path, data, function (err) {
      if (err) {
        console.log(err);
      }
      store.set("update", false);
    });
  } else {
    const homedir = os.homedir();
    await dialog
      .showSaveDialog({
        title: "保存文件",
        defaultPath: homedir + "/new file1.md",
        filters: [{ name: "Markdown文档", extensions: ["md"] }],
      })
      .then((res) => {
        if (!res.canceled) {
          fs.writeFileSync(res.filePath, data);
          store.set("file", res.filePath);
          store.set("update", false);
        }
      })
      .catch((req) => {
        console.log(req);
      });
  }
};

ipcMain.handle("on-save-file", async (event, data) => {
  let change = store.get("update");
  if (data.option && change) {
    return new Promise((resolve, reject) => {
      closeWin(async function (idx) {
        if (idx.response == 0) {
          await saveas(data.data, data.force).then(() => {
            resolve(0);
          });
        } else if (idx.response == 1) {
          resolve(1);
        } else {
          resolve(2);
        }
      });
    });
  } else {
    await saveas(data.data, data.force);
    return 0;
  }
});
