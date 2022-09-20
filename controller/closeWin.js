const { dialog, ipcMain } = require("electron");

//关闭的组件，做了一个小封装
const closeWin = (cb) => {
  dialog
    .showMessageBox({
      type: "info",
      title: "提示",
      message: "你还没有保存内容，是否退出",
      buttons: ["保存并且退出", "直接退出", "取消"],
      cancelId: 2,
    })
    .then((idx) => {
      cb(idx);
    });
};



module.exports = closeWin;
