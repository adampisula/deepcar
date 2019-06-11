const { app, BrowserWindow, ipcMain:ipc } = require('electron');
const Net = require('net');

const port = 5000;
const host = '172.16.1.105';

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  win.loadFile('index.html');

  win.webContents.openDevTools();

  var client = new Net.Socket();
  
  client.connect({ port: port, host: host }, function() {
    client.on('data', function(chunk) {
      win.webContents.send('data', chunk.toString());
    });

    ipc.on('direction', (event, direction) => {
      client.write(direction);
    });
  });
});