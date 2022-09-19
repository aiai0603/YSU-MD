const { contextBridge, ipcRenderer } = require("electron");
const Store = require("electron-store");
const store = new Store();

//获得更新状态
const getUpdate = () => {
  let change = store.get("update");
  return change;
};

//更新数据
const updateText = () => {
  let change = store.get("update");
  if (change === false) {
    store.set("update", true);
    return false;
  }
  return true;
};

//自动保存
const autoSave = (text) => {
  ipcRenderer.send("on-auto-save", text);
};

//打开文件（选择框）
const openFile = async (option) => {
  let result = await ipcRenderer.invoke("open-file-event", option);
  return result;
};

//保存文件
const saveFile = async (data, option, force) => {
  let result = ipcRenderer.invoke("on-save-file", {
    data: data,
    option: option,
    force: force,
  });
  return result;
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

const systemSaveFile = (callback) => {
  ipcRenderer.on("system-save-file", callback);
};

contextBridge.exposeInMainWorld("myApi", {
  getUpdate,
  updateText,
  store,
  systemNewFile,
  systemOpenFile,
  systemSaveFile,
  systemClose,
  openFile,
  saveFile,
  autoSave,
  newFile,
});
