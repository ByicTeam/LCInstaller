const __electron = require('electron');
const { join } = require('path');

function createWindow () {
    const __Window = new __electron.BrowserWindow({
      
      width: 861,
      height: 484,
      frame: false, 
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#202020',
        symbolColor: '#fff',
        height: "16px",
      },
      trafficLightPosition: { x: 10, y: 10 },
      maximizable: false,
      webPreferences: {
        preload: join(__dirname, '/preloads/loads.ts'),
        nodeIntegration: true,
        contextIsolation: false,
    }
    })

    // Window Controls #10
    __Window.maximizable = false;
    __Window.setResizable(false);


    const filter = {
      urls: ['*://kodk.com/api/*/systeminformation/*']
    };
  
    __Window.webContents.session.webRequest.onBeforeRequest(filter, (details, callback) => {
      __Window.webContents.setUserAgent(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.4577.63 Safari/537.36`);
      callback({ cancel: true });
    })

    __Window.loadFile(join(__dirname + '/html/in.html'))
  }
  
  __electron.app.whenReady().then(() => {
    createWindow()
  
    __electron.app.on('activate', () => {
      if (__electron.BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  __electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      __electron.app.quit()
    }
  })

