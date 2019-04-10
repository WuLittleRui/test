import { app, BrowserWindow, ipcMain } from 'electron'

// import { autoUpdater } from "electron-updater"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.maximize();

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// autoUpdater.on('checking-for-update', () => {
//   sendUpdateMessage('Checking for update...');
// })
// autoUpdater.on('update-available', (info) => {
//   sendUpdateMessage('Update available.');
// })
// autoUpdater.on('update-not-available', (info) => {
//   sendUpdateMessage('Update not available.');
// })
// autoUpdater.on('error', (err) => {
//   sendUpdateMessage('Error in auto-updater. ' + err);
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendUpdateMessage(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//   sendUpdateMessage('Update downloaded');
// });

// ipcMain.on("checkForUpdate",()=>{
//   //执行自动更新检查
//   sendUpdateMessage("ok");
//   autoUpdater.checkForUpdatesAndNotify();
// })

// // 通过main进程发送事件给renderer进程，提示更新信息
// function sendUpdateMessage(text) {
//   mainWindow.webContents.send('message', text)
// }

app.on('ready', function() {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */


import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('message', "检测到系统有更新，系统将进行更新!")
})

ipcMain.on("checkForUpdate",()=>{
  //执行自动更新检查
  autoUpdater.quitAndInstall();
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

 