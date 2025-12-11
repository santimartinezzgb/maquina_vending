import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import conectarDB from './database.mjs';
import * as dbOps from './db-operations.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = async () => {

    // Conectar a MongoDB Atlas
    await conectarDB();

    // Crear la ventana del navegador
    mainWindow = new BrowserWindow({
        width: 1700,
        minWidth: 1700,
        maxWidth: 1700,

        height: 1000,
        minHeight: 1000,
        maxHeight: 1000,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Cargar el archivo HTML de la interfaz
    mainWindow.loadFile('src/ventana_principal.html');

};

// HANDLERS. Sirven para comunicar la ventana con las operaciones de la base de datos

// Stock
ipcMain.handle('guardar-stock', async (event, stock) => {
    await dbOps.guardarStock(stock);
});

ipcMain.handle('cargar-stock', async () => {
    return await dbOps.cargarStock();
});

// Precios
ipcMain.handle('guardar-precios', async (event, precios) => {
    await dbOps.guardarPrecios(precios);
});

ipcMain.handle('cargar-precios', async () => {
    return await dbOps.cargarPrecios();
});

// Saldo
ipcMain.handle('guardar-saldo', async (event, saldo) => {
    await dbOps.guardarSaldo(saldo);
});

ipcMain.handle('cargar-saldo', async () => {
    return await dbOps.cargarSaldo();
});

// Dinero recaudado
ipcMain.handle('guardar-dinero-recaudado', async (event, dinero) => {
    await dbOps.guardarDineroRecaudado(dinero);
});

ipcMain.handle('cargar-dinero-recaudado', async () => {
    return await dbOps.cargarDineroRecaudado();
});

// Total recaudaciones
ipcMain.handle('guardar-total-recaudaciones', async (event, total) => {
    await dbOps.guardarTotalRecaudaciones(total);
});

ipcMain.handle('cargar-total-recaudaciones', async () => {
    return await dbOps.cargarTotalRecaudaciones();
});





// Iniciar la aplicación
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
