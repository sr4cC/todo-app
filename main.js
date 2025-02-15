const { app, BrowserWindow } = require('electron');
const path = require('path'); 

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'images/todo-icon.ico'), 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    
    win.loadFile(path.join(__dirname, 'index.html'));

    
    win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});