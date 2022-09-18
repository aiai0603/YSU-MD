const { contextBridge, ipcRenderer } = require("electron");
let value = "";
const sendUrl = async (url) => {
  let result = await ipcRenderer.invoke("on-url-event", url);
  return result;
};

const openFile = async () => {
  let result = await ipcRenderer.invoke("open-file-event",true);
  return result;
};

const openFileLast = async () => {
  let result = await ipcRenderer.invoke("open-file-event",false);
  return result;
};

const alert = (msg) => {
  ipcRenderer.invoke("on-alert-event", msg);
};

const open = (url) => {
  ipcRenderer.invoke("on-open-event", url);
};

const saveFile = (data) => {

  ipcRenderer.invoke("on-save-file", data);
};

const close = () => {
  ipcRenderer.invoke("on-close-event");
};

const getFilelist = async () => {
  const filelist = await ipcRenderer.invoke("on-getfiles-event");
  return filelist;
};

const openDialog = () => {
  ipcRenderer.send("on-opendialog-event");
};

const onRendererEvent = (cb) => {
  ipcRenderer.on("on-renderer-event", (e, msg) => {
    cb();
  });
};

contextBridge.exposeInMainWorld("myApi", {
  sendUrl,
  alert,
  open,
  close,
  getFilelist,
  openDialog,
  onRendererEvent,
  openFile,
  saveFile,
  openFileLast
});
