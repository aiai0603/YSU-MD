const { dialog, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");
const os = require("os");
const closeWin = require("./closeWin");

const saveas = async (data, force) => {
  let path = store.get("file");

  if (typeof path != "undefined" && path.length && !force) {
    try {
      fs.writeFileSync(path, data);
      store.set("update", false);
      re = path.split("\\").pop();
      return re;
    } catch (e) {
      return 2;
    }
  } else {
    const homedir = os.homedir();

    return new Promise((resolve, reject) => {
      dialog
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
            resolve(res.filePath.split("\\").pop());
          } else {
            resolve(2);
          }
        })
        .catch((req) => {
          console.log(req);
        });
    });
  }
};

ipcMain.handle("on-save-file", async (event, data) => {
  let change = store.get("update");
  if (data.option && change) {
    return new Promise(async (resolve, reject) => {
      closeWin(async function (idx) {
        if (idx.response == 0) {
          let res = await saveas(data.data, data.force);
          resolve(res);
        } else if (idx.response == 1) {
          resolve(1);
        } else {
          resolve(2);
        }
      });
    });
  } else {
    return new Promise(async (resolve, reject) => {
      let res = await saveas(data.data, data.force);
      resolve(res);
    });
  }
});
