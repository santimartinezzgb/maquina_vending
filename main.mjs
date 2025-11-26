import { app, BrowserWindow } from 'electron';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1700,
        height: 1000,
        minWidth: 1700,
        minHeight: 1000,
        maxWidth: 1700,
        maxHeight: 1000
    });

    win.loadFile('ventana_principal.html');
}

app.whenReady().then(createWindow);
