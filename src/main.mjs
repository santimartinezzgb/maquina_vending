import { app, BrowserWindow } from 'electron';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1700,
        minWidth: 1700,
        maxWidth: 1700,

        height: 1000,
        minHeight: 1000,
        maxHeight: 1000
    });

    win.loadFile('src/ventana_principal.html');
}


app.whenReady().then(createWindow);
