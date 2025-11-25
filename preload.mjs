const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    saludo: () => "Hola desde preload"
});
