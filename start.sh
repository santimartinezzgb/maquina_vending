#!/bin/bash

# Iniciar backend en segundo plano
echo "Iniciando backend..."
bun run backend/server.mjs &
BACKEND_PID=$!

# Esperar unos segundos para asegurar que el backend arranca
sleep 2

# Iniciar la app Electron
echo "Iniciando la app Electron..."
bun run dev

# Al cerrar Electron, terminar el backend
kill $BACKEND_PID