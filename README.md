# MÁQUINA VENDING COCA-COLA

Simulador de máquina expendedora de bebidas Coca-Cola desarrollado con Electron. Incluye sistema de gestión completo con control de stock, precios y recaudación.

## Características

- **Interfaz de Usuario**: Simulación realista de máquina vending
- **Sistema de Pago**: Introducir monedas y billetes virtuales
- **Gestión de Stock**: Control de inventario por producto
- **Panel de Administración**: Configuración de precios y reabastecimiento
- **Persistencia de Datos**: Almacenamiento local de saldo, stock y recaudaciones
- **Control de Versiones**: Auto-tagging mediante GitHub Actions

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/santimartinezzgb/maquina_vending.git
cd maquina_vending

# Instalar
bun install

# Ejecutar
./start.sh
```

## Uso

### Interfaz Principal (Cliente)

<img width="1675" height="960" alt="pantalla_inicio" src="https://github.com/user-attachments/assets/0743b674-4ffd-4879-9732-0a7ef2339307" />

1. **Introducir Dinero**: Click en el botón para agregar saldo (monedas de 0.05€ a 20€)
2. **Seleccionar Bebida**: Click en la bebida deseada
3. **Recoger Producto**: La bebida se expulsa si hay saldo y stock suficiente

### Introducir dinero a la máquina

<img width="1675" height="960" alt="introducir_dinero" src="https://github.com/user-attachments/assets/15d3b078-d930-4849-bfc5-aa2b8561fa87" />


### Confirmación para poder gestionar la máquina

**Acceso**: Click en "Abrir máquina" → Contraseña: `1`

<img width="1675" height="960" alt="acceso_admin" src="https://github.com/user-attachments/assets/7ec53b7f-3343-40b7-a258-01c8584b0b0d" />


### Panel de Administración

<img width="1675" height="960" alt="maquina_abierta" src="https://github.com/user-attachments/assets/2bfd8f96-b2f0-4c42-9085-9f1b7e370033" />


- **Ajustar Precios**: Modificar el precio de cada bebida
- **Rellenar Stock**: Restablecer stock a 10 unidades
- **Ver Recaudación**: Consultar dinero recaudado actual y total histórico
- **Retirar Dinero**: Vaciar la recaudación actual


## Tecnologías

- **Electron** v28.0.0 - Framework de aplicaciones de escritorio
- **Bun** - Entorno de ejecución
- **localStorage** - Persistencia de datos
- **GitHub Actions** - CI/CD para versionado automático


## Almacenamiento Local

El sistema guarda automáticamente:
- `saldo_maquina`: Saldo actual del usuario
- `stock_bebidas`: Inventario de cada producto
- `precios_bebidas`: Precios configurados
- `dinero_recaudado`: Recaudación actual
- `total_recaudaciones`: Histórico total de recaudaciones


## Resetear datos
Para limpiar todos los datos almacenados:
```javascript
// En la consola del navegador (DevTools)
localStorage.clear();
```

---

**Autor**: Santiago Martínez
