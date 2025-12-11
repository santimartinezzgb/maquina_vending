# MÁQUINA VENDING COCA-COLA

Simulador de máquina expendedora de bebidas Coca-Cola desarrollado con Electron, Bun y MongoDB Atlas. Incluye sistema de gestión completo con control de stock, precios y recaudación almacenados en la nube.

## 🚀Tecnologías

- **Electron** - Framework para aplicaciones de escritorio
- **Bun** - Runtime y gestor de paquetes JavaScript
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM para MongoDB

## Características

- **Interfaz de Usuario**: Simulación realista de máquina vending
- **Sistema de Pago**: Introducir monedas y billetes virtuales
- **Gestión de Stock**: Control de inventario por producto
- **Panel de Administración**: Configuración de precios y reabastecimiento
- **Persistencia en la Nube**: Datos almacenados en MongoDB Atlas
- **Sincronización en Tiempo Real**: Los cambios se guardan automáticamente

## 📋 Requisitos Previos

1. **Bun** instalado globalmente
2. **Cuenta de MongoDB Atlas** con un cluster creado

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/santimartinezzgb/maquina_vending.git
cd maquina_vending
```

### 2. Instalar dependencias

```bash
bun install
```

### 3. Configurar MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster gratuito
3. Configura el acceso:
   - **Network Access**: Añade tu IP o `0.0.0.0/0` para desarrollo
   - **Database Access**: Crea un usuario con permisos de lectura/escritura
4. Obtén tu cadena de conexión

### 4. Configurar variables de entorno

MOdifica el un archivo `.env.example` de la raíz del proyecto:

```env.example
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/maquinavending?retryWrites=true&w=majority
```

**Importante:** Reemplaza `usuario`, `contraseña` y `cluster` con tus credenciales reales de MongoDB Atlas.

### 5. Ejecutar la aplicación

```bash
bun run start
```

O con script de inicialización:

```bash
./start.sh
```

## Uso

### Interfaz Principal (Cliente)

<img width="1678" height="965" alt="inicio" src="https://github.com/user-attachments/assets/c8902810-bcd1-4abc-8e64-8669a9c5bdab" />

1. **Introducir Dinero**: Click en el botón para agregar saldo (monedas de 0.05€ a 20€)
2. **Seleccionar Bebida**: Click en la bebida deseada
3. **Recoger Producto**: La bebida se expulsa si hay saldo y stock suficiente

### Confirmación para poder gestionar la máquina

**Acceso**: Click en "Abrir máquina" → Contraseña: `1`

<img width="1678" height="965" alt="autenticacion" src="https://github.com/user-attachments/assets/bd964cc6-fbcd-4f85-9af1-e02fbaa4bebc" />

### Panel de Administración

<img width="1678" height="965" alt="panel-de-control" src="https://github.com/user-attachments/assets/2c96c551-19d4-4d6d-845d-c901244ae069" />

- **Ajustar Precios**: Modificar el precio de cada bebida
- **Rellenar Stock**: Restablecer stock a 10 unidades
- **Ver Recaudación**: Consultar dinero recaudado actual y total histórico
- **Retirar Dinero**: Vaciar la recaudación actual


## Tecnologías

- **Electron** v28.0.0 - Framework de aplicaciones de escritorio
- **Bun** - Entorno de ejecución
- **Mongo Atlas** - Base de datos en la nube
- **GitHub Actions** - CI/CD para versionado automático


---

**Autor**: Santiago Martínez
