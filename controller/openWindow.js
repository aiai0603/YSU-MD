const { ipcMain, BrowserWindow } = require('electron')
const WinState = require('electron-win-state').default
const path = require('path')
const action = require('./saveFile')

const cssText = `width: 80px; height: 30px; border-radius: 5px; line-height: 30px; text-align: center; background-color: cornflowerblue; position: fixed; bottom: 50px; right: 20px; z-index: 1000; color: #fff; cursor: default`

const js = `
  const div = document.createElement('div')
  div.innerHTML = '关闭窗口'
  div.style.cssText = '${cssText}'
  div.addEventListener('click', () => { myApi.close() })
  document.body.appendChild(div)
`

let win = null

ipcMain.handle('on-close-event', (e) => {
  win.close()
})