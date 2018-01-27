const {
  app,
  Tray,
  Menu,
  BrowserWindow
} = require('electron');

const path = require('path');
const iconPath = path.join(__dirname, '/images/tray.ico');
const ylogo = path.join(__dirname, '/images/logo.png');

let appIcon = null;
let win = null;


app.on('ready', function() {
  win = new BrowserWindow({
    show: false
  });
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([

    {
      label: 'Remote Support Portal',
      click: function() {
      require('electron').shell.openExternal('http://help.ypcr.com');
      
      }
    },
    {
      label: 'Create Ticket',
      click: function() {
      require('electron').shell.openExternal('http://helpdesk.ypcr.com');
      }
    },
    {
      label: 'Close SystemCare App',
      role: 'quit'

    }

  ]);
  appIcon.setToolTip('YPCR SystemCare App');
  appIcon.setContextMenu(contextMenu);
});