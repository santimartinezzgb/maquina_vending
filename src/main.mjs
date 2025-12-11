import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import conectarDB from './database/database.mjs';
import * as dbOperaciones from './database/db-operations.mjs';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hacer que la ventana principal sea una variable global
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
    mainWindow.loadFile('src/views/ventana_principal.html');

};

// ipcMain.handle(). Gestiona la conexión entre el main process y el renderer process a través de canales IPC.
// Un canal IPC es un identificador único para cada tipo de comunicación que se quiere establecer entre ambos procesos.

// Stock
ipcMain.handle('guardar-stock', async (stock) => { await dbOperaciones.guardarStock(stock); });
ipcMain.handle('cargar-stock', async () => { return await dbOperaciones.cargarStock(); });

// Precios
ipcMain.handle('guardar-precios', async (precios) => { await dbOperaciones.guardarPrecios(precios); });
ipcMain.handle('cargar-precios', async () => { return await dbOperaciones.cargarPrecios(); });

// Saldo
ipcMain.handle('guardar-saldo', async (saldo) => { await dbOperaciones.guardarSaldo(saldo); });
ipcMain.handle('cargar-saldo', async () => { return await dbOperaciones.cargarSaldo(); });

// Dinero recaudado
ipcMain.handle('guardar-dinero-recaudado', async (dinero) => { await dbOperaciones.guardarDineroRecaudado(dinero); });
ipcMain.handle('cargar-dinero-recaudado', async () => { return await dbOperaciones.cargarDineroRecaudado(); });

// Total recaudaciones
ipcMain.handle('guardar-total-recaudaciones', async (total) => { await dbOperaciones.guardarTotalRecaudaciones(total); });
ipcMain.handle('cargar-total-recaudaciones', async () => { return await dbOperaciones.cargarTotalRecaudaciones(); });




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
