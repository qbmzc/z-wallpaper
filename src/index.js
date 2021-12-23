const { app, screen, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
let mainWindow
const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    roundedCorners: false,
    // autoHideMenuBar:true,

    type: 'desktop',
  });
  // and load the index.html of the app.
  //mainWindow.loadFile(path.join(__dirname, '../project/nier/index.html'));
  mainWindow.loadURL('https://snowyan.gitee.io/nier/')
  //mainWindow.loadURL('https://snowyan.gitee.io/time-wallpaper/')
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

let win
const newWindow = () => {
  const displays = screen.getAllDisplays()
  displays.forEach(d => {

  })
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  if (externalDisplay) {
    const { width, height } = externalDisplay.workAreaSize
    win = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y+10,
      width: width,
      height: height,
      frame: false,
      roundedCorners: false,
      type: 'desktop'
    })
    win.loadURL('https://snowyan.gitee.io/time-wallpaper/')
  };
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null
app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, '/static/image/a.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "关于", role: "about",
    },
    {
      label: "壁纸切换", submenu: [{
        label: 'snow',
        click:()=>{
          mainWindow.loadURL('http://snow.congco.com/')
        }
      }, {
        type: 'separator'
      }, {
        label: 'wlop',
        click: () => {
          mainWindow.loadURL('https://snowyan.gitee.io/time-wallpaper/')
        }
      }, {
        label: '视频'
      }]
    },
    {
      label: '退出', click: () => {
        app.exit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
  // tray.setToolTip('This is my application')
  // tray.setTitle('zwallpaper')
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) { createWindow(); newWindow() }
  })
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    newWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
