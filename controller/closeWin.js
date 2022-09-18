const { dialog } = require("electron");
const Store = require("electron-store");
const store = new Store();


const closeWin = (e,win) => {
  dialog
    .showMessageBox({
      type: "info",
      title: "提示",
      message: "你还没有保存内容，是否退出",
      buttons: ["保存并且退出", "直接退出", "取消"],
      cancelId: 2,
    })
    .then((idx) => {
      if (idx.response == 0) {
        let data = store.get("word");
        action.saveas(data);
      } else if (idx.response == 1) {
        win.destroy();
      } else {
        e.preventDefault();
      }
    });
};


module.exports =  closeWin ;