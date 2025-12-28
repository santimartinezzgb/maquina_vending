// = = = = = CONFIGURACIÓN API = = = = = //
const API_URL = 'http://localhost:3000/api';
const CONTRASENA_ADMIN = '1234';

// = = = = = MÉTODOS API = = = = = //
const cargarSaldoCliente = async (nombre) => {
    try {
        const response = await fetch(`${API_URL}/saldos/${nombre}`);
        if (!response.ok) throw new Error('Error al obtener el saldo');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

const cargarBebidas = async () => {
    try {
        const response = await fetch(`${API_URL}/bebidas`);
        if (!response.ok) throw new Error('Error al obtener las bebidas');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

const actualizarSaldo = async (nombre, nuevaCantidad) => {
    try {
        const response = await fetch(`${API_URL}/saldos/${nombre}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: nuevaCantidad })
        });
        if (!response.ok) throw new Error('Error al actualizar el saldo');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

const actualizarBebida = async (nombre, datos) => {
    try {
        const response = await fetch(`${API_URL}/bebidas/${nombre}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        if (!response.ok) throw new Error('Error al actualizar la bebida');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// = = = = = VARIABLES GLOBALES = = = = = //
let saldo_actual = 0;
let bebidas = [];

// = = = = = ELEMENTOS DEL DOM = = = = = //
const elementos = {
    pantallaCarga: document.getElementById('pantalla_carga'),
    saldo: document.getElementById('saldo'),
    mensaje: document.getElementById('mensaje'),
    pantalla_dinero: document.getElementById('pantalla_dinero'),
    saldo_actual: document.getElementById('saldo_actual'),
    pantalla_confirmacion: document.getElementById('pantalla_confirmacion'),
    input_contrasena: document.getElementById('input_contrasena'),
    mensaje_error: document.getElementById('mensaje_error'),
    pantalla_carga_salida: document.getElementById('pantalla_carga_salida'),
    recoger_bebida: document.getElementById('recoger_bebida')
};

// = = = = = INICIALIZACIÓN = = = = = //
const inicializar = async () => {
    try {
        // Cargar datos desde la API
        const datos_saldo = await cargarSaldoCliente('saldo_cliente');
        bebidas = await cargarBebidas();

        if (datos_saldo) {
            saldo_actual = datos_saldo.cantidad;
            actualizarUISaldo();
        }

        // Ocultar pantalla de carga
        setTimeout(() => {
            elementos.pantallaCarga.style.display = 'none';
        }, 1500);

        configurarEventos();
    } catch (error) {
        console.error('Error al inicializar:', error);
        elementos.mensaje.textContent = 'Error al cargar datos';
    }
}

// = = = = = ACTUALIZAR UI = = = = = //
const actualizarUISaldo = () => {
    elementos.saldo.textContent = `Saldo: ${saldo_actual.toFixed(2)}€`;
    elementos.saldo_actual.textContent = saldo_actual.toFixed(2);
}

const mostrarMensaje = (texto, color = '#00ff00') => {
    elementos.mensaje.textContent = texto;
    elementos.mensaje.style.color = color;
    setTimeout(() => {
        elementos.mensaje.textContent = 'Seleccione producto';
        elementos.mensaje.style.color = '#00ff00';
    }, 3000);
}

// = = = = = COMPRAR BEBIDA = = = = = //
const comprarBebida = async (nombreBebida) => {
    const bebida = bebidas.find(b => b.nombre === nombreBebida);

    if (!bebida) {
        mostrarMensaje('Bebida no encontrada', '#ff0000');
        return;
    }

    if (bebida.stock <= 0) {
        mostrarMensaje('Sin stock disponible', '#ff0000');
        return;
    }

    if (saldo_actual < bebida.precio) {
        mostrarMensaje(`Saldo insuficiente. Precio: ${bebida.precio.toFixed(2)}€`, '#ff0000');
        return;
    }

    // Realizar compra
    await actualizarBebida(bebida.nombre, { stock: bebida.stock - 1 });
    saldo_actual -= bebida.precio;
    await actualizarSaldo('saldo_cliente', saldo_actual);

    // Actualizar saldos de máquina
    const saldoMaquina = await cargarSaldoCliente('saldo_maquina');
    await actualizarSaldo('saldo_maquina', saldoMaquina.cantidad + bebida.precio);

    // Actualizar UI
    actualizarUISaldo();
    bebida.stock--;
    mostrarMensaje('¡Disfruta tu bebida!', '#00ff00');

    // Animación de bebida
    elementos.recoger_bebida.style.backgroundColor = '#ff0000';
    setTimeout(() => {
        elementos.recoger_bebida.style.backgroundColor = 'black';
    }, 2000);
}

// = = = = = INTRODUCIR DINERO = = = = = //
const abrirPantallaDinero = () => {
    elementos.pantalla_dinero.style.display = 'flex';
}

const cerrarPantallaDinero = () => {
    elementos.pantalla_dinero.style.display = 'none';
}

const introducirDinero = async (valor) => {
    saldo_actual += parseFloat(valor);
    await actualizarSaldo('saldo_cliente', saldo_actual);
    actualizarUISaldo();
    mostrarMensaje(`Se han añadido ${valor}€`, '#00ff00');
}

// = = = = = ABRIR MÁQUINA (ADMIN) = = = = = //
const abrirPantallaConfirmacion = () => {
    elementos.pantalla_confirmacion.style.display = 'flex';
    elementos.input_contrasena.value = '';
    elementos.mensaje_error.style.display = 'none';
}

const cerrarPantallaConfirmacion = () => {
    elementos.pantalla_confirmacion.style.display = 'none';
    elementos.input_contrasena.value = '';
    elementos.mensaje_error.style.display = 'none';
}

const confirmarContrasena = () => {
    const contrasena = elementos.input_contrasena.value;

    if (contrasena === CONTRASENA_ADMIN) {
        cerrarPantallaConfirmacion();
        abrirMaquina();
    } else {
        elementos.mensaje_error.style.display = 'block';
    }
}

const abrirMaquina = () => {
    // Redirigir al panel de administración
    window.location.href = 'ventana_segunda.html';
}

// = = = = = SALIR = = = = = //
const salir = () => {
    elementos.pantalla_carga_salida.style.display = 'flex';
    setTimeout(() => {
        window.close();
    }, 2000);
}

// = = = = = CONFIGURAR EVENTOS = = = = = //
const configurarEventos = () => {

    // Botones de bebidas
    document.getElementById('coca_cola').addEventListener('click', () => comprarBebida('Cola-cola'));
    document.getElementById('coca_cola_zero').addEventListener('click', () => comprarBebida('Coca-cola Zero'));
    document.getElementById('coca_cola_light').addEventListener('click', () => comprarBebida('Coca-cola Light'));
    document.getElementById('sprite').addEventListener('click', () => comprarBebida('Sprite'));
    document.getElementById('fanta').addEventListener('click', () => comprarBebida('Fanta'));
    document.getElementById('nestea').addEventListener('click', () => comprarBebida('Nestea'));

    // Boton devolver dinero
    document.getElementById('btn_devolver_dinero').addEventListener('click', async () => {
        if (saldo_actual > 0) {
            mostrarMensaje(`Se han devuelto ${saldo_actual.toFixed(2)}€`, '#00ff00');
            saldo_actual = 0;
            await actualizarSaldo('saldo_cliente', saldo_actual);
            actualizarUISaldo();
        } else {
            mostrarMensaje('No hay saldo para devolver', '#ff0000');
        }
    });

    // Botón introducir dinero
    document.getElementById('btn_introductir_dinero').addEventListener('click', abrirPantallaDinero);
    document.getElementById('btn_cerrar_dinero').addEventListener('click', cerrarPantallaDinero);

    // Botones de monedas
    document.querySelectorAll('.btn_moneda').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const valor = e.target.getAttribute('data-valor');
            introducirDinero(valor);
        });
    });

    // Botón abrir máquina
    document.getElementById('btn_abrir_maquina').addEventListener('click', abrirPantallaConfirmacion);
    document.getElementById('btn_confirmar').addEventListener('click', confirmarContrasena);
    document.getElementById('btn_cancelar').addEventListener('click', cerrarPantallaConfirmacion);

    // Botón salir
    document.getElementById('btn_salir').addEventListener('click', salir);

    // Enter en el input de contraseña
    elementos.input_contrasena.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') confirmarContrasena();
    });
}

// = = = = = INICIAR APLICACIÓN = = = = = //
inicializar()