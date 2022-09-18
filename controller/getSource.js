const { ipcMain, BrowserWindow } = require('electron')

const getSource = (url) => {
  return new Promise((resolve, reject) => {
    const win = new BrowserWindow({
      width: 500,
      height: 500,
      show: false,
      webPreferences: {
        offscreen: true
      }
    })

    win.loadURL(url)

    win.webContents.on('did-finish-load', async () => {
      const title = win.getTitle()
      
      try {
        // nativeImage
        const image = await win.webContents.capturePage()
        
        if (!image.isEmpty()) {
          const screenshot = image.toDataURL()
  
          resolve({
            title,
            screenshot,
            url
          })
        } else {
          resolve({
            msg: '无法访问该站点。'
          })
        }
      } catch(e) {
        reject(e)
      }
    })
  })
}

ipcMain.handle('on-url-event', async (e, url) => {
  const result = await getSource(url)
  return result
})