const { app, BrowserWindow,Menu } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const mainMenu = Menu.buildFromTemplate(templateMenu);
  // Set The Menu to the Main Window
  Menu.setApplicationMenu(mainMenu);

  win.loadFile('src/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})





  const templateMenu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Product',
          accelerator: 'Ctrl+N',
          click() {
            createNewProductWindow();
          }
        },
        {
          label: 'Remove All Products',
          click() {
            mainWindow.webContents.send('products:remove-all');
          }
        },
        {
          label: 'Exit',
          accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    }
  ];


  if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
      label: 'DevTools',
      submenu: [
        {
          label: 'Show/Hide Dev Tools',
          accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: 'reload'
        }
      ]
    })
  }
