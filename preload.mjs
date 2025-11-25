import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
    saludo: () => "Hola desde preload"
});
