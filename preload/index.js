const { contextBridge, ipcRenderer } = require("electron");
const Store = require("electron-store");
const store = new Store();

//获得更新状态
const getUpdate = () => {
  let change = store.get("update");
  return change;
};

const getSaved = () => {
  store.set("file", "");
  return store.get("word");
};

//自动保存
const autoSave = (text) => {
  store.set("update", true);
  store.set("word", text);
};

//打开文件（选择框）
const openFile = async (option) => {
  let result = await ipcRenderer.invoke("open-file-event", option);
  return result;
};

//保存文件
const saveFile = async (data, option, force) => {
  let result = await ipcRenderer.invoke("on-save-file", {
    data: data,
    option: option,
    force: force,
  });

  console.log(result)

  return result;
};

//新建文件
const quitFile = async () => {
  ipcRenderer.invoke("close-event");
};

//新建文件
const newFile = async () => {
  ipcRenderer.invoke("new-file-event");
};

//系统关闭文件
const systemClose = (callback) => {
  ipcRenderer.on("system-close", callback);
};

//系统打开文件
const systemOpenFile = (callback) => {
  ipcRenderer.on("system-open-file", callback);
};

//系统新建文件
const systemNewFile = (callback) => {
  ipcRenderer.on("system-new-file", callback);
};

//系统保存文件
const systemSaveFile = (callback) => {
  ipcRenderer.on("system-save-file", callback);
};

//关闭应用
const systemQuit = (callback) => {
  ipcRenderer.on("system-quit", callback);
};


//系统黑体
const systemBlack = (callback) => {
  ipcRenderer.on("system-black", callback);
};

contextBridge.exposeInMainWorld("myApi", {
  getSaved,
  quitFile,
  systemQuit,
  getUpdate,
  store,
  systemNewFile,
  systemOpenFile,
  systemSaveFile,
  systemClose,
  openFile,
  saveFile,
  autoSave,
  newFile,
  systemBlack
});
