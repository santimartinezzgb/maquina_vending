import { app, BrowserWindow } from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 1900,
        height: 1000
    });

    win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);
