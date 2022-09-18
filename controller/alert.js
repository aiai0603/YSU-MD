const { dialog, ipcMain } = require('electron')


const alertDialog = (msg) => {
  dialog.showMessageBox({
    title:'操作失败',
    message: msg,
    type: 'error'
  })
};

ipcMain.handle('on-alert-event', (e, msg) => {
  alertDialog(msg)
})

module.exports =  alertDialog ;