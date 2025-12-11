const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

    // Gestión del stock
    guardarStock: (stock) => ipcRenderer.invoke('guardar-stock', stock),
    cargarStock: () => ipcRenderer.invoke('cargar-stock'),

    // Gestión de precios
    guardarPrecios: (precios) => ipcRenderer.invoke('guardar-precios', precios),
    cargarPrecios: () => ipcRenderer.invoke('cargar-precios'),

    // Gestión del saldo
    guardarSaldo: (saldo) => ipcRenderer.invoke('guardar-saldo', saldo),
    cargarSaldo: () => ipcRenderer.invoke('cargar-saldo'),

    // Gestión del dinero recaudado
    guardarDineroRecaudado: (dinero) => ipcRenderer.invoke('guardar-dinero-recaudado', dinero),
    cargarDineroRecaudado: () => ipcRenderer.invoke('cargar-dinero-recaudado'),

    // Gestión del total de recaudaciones
    guardarTotalRecaudaciones: (total) => ipcRenderer.invoke('guardar-total-recaudaciones', total),
    cargarTotalRecaudaciones: () => ipcRenderer.invoke('cargar-total-recaudaciones')
});
