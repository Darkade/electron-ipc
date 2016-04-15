'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain;

let mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index1.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

let mainWindow2;
function createWindow2 () {
  mainWindow2 = new BrowserWindow({width: 800, height: 600});
  mainWindow2.loadURL('file://' + __dirname + '/index2.html');
  mainWindow2.webContents.openDevTools();
  mainWindow2.on('closed', function() {
    mainWindow2 = null;
  });
}




ipcMain.on('asynchronous-message', function(event, arg) {
  console.log(arg);  // prints "ping"
mainWindow2.webContents.send('asynchronous-reply', arg);
});

//ipcMain.on('synchronous-message', function(event, arg) {
//  console.log(arg);  // prints "ping"
//  event.returnValue = 'pong';
//});




app.on('ready', createWindow);
app.on('ready', createWindow2);
app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
