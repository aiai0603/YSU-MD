const { dialog, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");

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
            if (err) reject(err);
            store.set("file", res.filePaths[0]);
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
      if (err) reject(err);

      resolve(data);
    });
  });
};

ipcMain.handle("open-file-event", async (event, data) => {
  let res = data? await openFile() : await openFileLast();
  return res;
});

const saveas = async (data) => {
  let fs = require("fs");
  let path = store.get("file");

  console.log(path)

  if (path) {
    fs.writeFile(path, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        
      }
    });
  }
};

ipcMain.handle("on-save-file", async (event, data) => {
  return await saveas(data);
});

module.exports = { saveas, openFile };
