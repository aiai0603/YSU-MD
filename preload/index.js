const { contextBridge, ipcRenderer } = require("electron");

//打开文件（选择框）
const openFile = async () => {
  let result = await ipcRenderer.invoke("open-file-event", true);
  return result;
};

//打开上一次的文件
const openFileLast = async () => {
  let result = await ipcRenderer.invoke("open-file-event", false);
  console.log(result);
  return result;
};

//自动保存
const autoSave = (text) => {
  ipcRenderer.send("on-auto-save", text);
};

//保存文件
const saveFile = (data) => {
  ipcRenderer.invoke("on-save-file", data);
};

//新建文件
const newFile = async () => {
  ipcRenderer.invoke("new-file-event");
};

const alert = (msg) => {
  ipcRenderer.invoke("on-alert-event", msg);
};

const close = () => {
  ipcRenderer.invoke("on-close-event");
};

const openDialog = () => {
  ipcRenderer.send("on-opendialog-event");
};

const onUpdateCounter = (callback) =>
  ipcRenderer.on("update-counter", callback);

contextBridge.exposeInMainWorld("myApi", {
  onUpdateCounter,
  openDialog,
  alert,
  open,
  close,
  openFile,
  saveFile,
  openFileLast,
  autoSave,
  newFile,
});
