const electron = require("electron");
// failing – requires signature
// require('update-electron-app')({
//   repo: 'vicramon/summit-electron',
// });

const { app, BrowserWindow } = electron;

const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let initPath;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.allowRendererProcessReuse = true;

app.on("ready", () => {
  initPath = path.join(app.getPath("userData"), "init.json");

  try {
    data = JSON.parse(fs.readFileSync(initPath, "utf8"));
  } catch (e) {}

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 880,
    icon: path.join(__dirname, "assets/icons/png/64x64.png"),
    titleBarStyle: 'hidden',
    title: "Summit",
    darkTheme: true,
    trafficLightPosition: { x: 15, y: 14 },
    backgroundColor: "#000",
    // frame: false,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      zoomFactor: 1.0,
      enableRemoteModule: true,
      devTools: true,
    },
  });

  //mainWindow.loadURL("file://" + __dirname + "/index.html");
  mainWindow.loadURL("http://localhost:3000");

  // Display Dev Tools
  // mainWindow.openDevTools();


// Quit when all windows are closed.
// app.on("window-all-closed", () => {
//   data = {
//     bounds: mainWindow.getBounds(),
//   };
//   fs.writeFileSync(initPath, JSON.stringify(data));
//   app.quit();
// });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('page-title-updated', (event, title, explicitSet) => {
    if (title[title.length - 1] == "*" ) {
      app.dock.setBadge("•")
    } else {
      app.dock.setBadge('')
    }
  })

  if (process.platform === 'darwin') {
    var forceQuit = false;
    app.on('before-quit', function() {
      forceQuit = true;
    });
    mainWindow.on('close', function(event) {
      if (!forceQuit) {
        event.preventDefault();
        mainWindow.hide();
      }
    });
  }

});

app.on('activate', () => mainWindow.show());

// app.dock.setBadge("•")
// app.setBadgeCount(3)
