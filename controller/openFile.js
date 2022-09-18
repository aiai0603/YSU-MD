const { dialog, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");
const alertDialog = require("./alert");

const openFile = async () => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        title: "打开文件", // 对话框的标题
        filters: [
          {
            name: "md",
            extensions: ["md"], // 只允许 jpg 和 png 格式的文件
          },
        ],
      })
      .then((res) => {
        if (!res.canceled) {
          fs.readFile(res.filePaths[0], "utf8", (err, data) => {
            if (err) {
              alertDialog("打开失败,请确保文件可以正常使用")
              reject(err);
            };
            store.set("file", res.filePaths[0]);
            store.set("word", String(data));
            resolve(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const openFileLast = async () => {
  let path = store.get("file");

  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        alertDialog("打开失败,请确保文件没有重命名或者改变路径")
        reject(err);
      }
      resolve(data);
    });
  });
};

ipcMain.handle("open-file-event", async (event, data) => {
  let res = data ? await openFile() : await openFileLast();
  return res;
});

ipcMain.handle("new-file-event", async () => {
    store.set("file", "");
    store.set("word", String(""));
});


module.exports = { openFile };
