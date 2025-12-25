// Para seleccionar elementos del DOM
const $ = selector => document.querySelector(selector);


// VARIABLES Y LISTAS ==========================================
const $pantalla_carga = $('#pantalla_carga');
const $pantalla_carga_salida = $('#pantalla_carga_salida');

// Ocultar pantalla de carga después de 2 segundos
// Se utilza para acompañar la carga de datos
setTimeout(() => {
    $pantalla_carga.style.display = 'none';
}, 2000);

// Elementos de la interfaz principal
const $mensaje = $('#mensaje');
const $coca_cola = $('#coca_cola');
const $coca_cola_zero = $('#coca_cola_zero');
const $coca_cola_light = $('#coca_cola_light');
const $sprite = $('#sprite');
const $fanta = $('#fanta');
const $nestea = $('#nestea');

const $introducir_dinero = $('#btn_introductir_dinero')
const $saldo = $('#saldo');
const $abrir_maquina = $('#btn_abrir_maquina')
const $salir = $('#btn_salir');

// Elementos de la pantalla de confirmación
const $pantalla_confirmacion = $('#pantalla_confirmacion');
const $btn_confirmar = $('#btn_confirmar');
const $btn_cancelar = $('#btn_cancelar');
const $input_contrasena = $('#input_contrasena');
const $mensaje_error = $('#mensaje_error');

// Elementos de la ventana de dinero
const $pantalla_dinero = $('#pantalla_dinero');
const $btn_cerrar_dinero = $('#btn_cerrar_dinero');
const $saldo_actual = $('#saldo_actual');

// Elemento expulsor de bebidas
const $recoger_bebida = $('#recoger_bebida');

// Contraseña para abrir la máquina
const CONTRASENA_CORRECTA = "1";




// Configuración de la URL base de la API
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3001/api';

let stock = {
    coca_cola: 0,
    coca_cola_zero: 0,
    coca_cola_light: 0,
    sprite: 0,
    fanta: 0,
    nestea: 0
};
let precios = {
    coca_cola: 0,
    coca_cola_zero: 0,
    coca_cola_light: 0,
    sprite: 0,
    fanta: 0,
    nestea: 0
};

const nombres = {
    coca_cola: 'Coca-Cola',
    coca_cola_zero: 'Coca-Cola Zero',
    coca_cola_light: 'Coca-Cola Light',
    sprite: 'Sprite',
    fanta: 'Fanta',
    nestea: 'Nestea'
};

let saldo_cliente = 0;
let saldo_maquina = 0;


// Funciones para interactuar con la API modular
async function cargarBebidasYPrecios() {
    try {
        const response = await fetch(`${API_BASE_URL}/bebidas`);
        if (response.ok) {
            const bebidas = await response.json();
            bebidas.forEach(b => {
                stock[b.nombre] = b.stock;
                precios[b.nombre] = b.precio;
            });
        } else {
            console.error('Error al cargar bebidas desde la API');
        }
    } catch (error) {
        console.error('Error de red al cargar bebidas', error);
    }
}

async function cargarSaldos() {
    try {
        const response = await fetch(`${API_BASE_URL}/saldos`);
        if (response.ok) {
            const saldos = await response.json();
            saldos.forEach(s => {
                if (s.nombre === 'saldo_cliente') saldo_cliente = s.cantidad;
                if (s.nombre === 'saldo_maquina') saldo_maquina = s.cantidad;
            });
        } else {
            console.error('Error al cargar saldos desde la API');
        }
    } catch (error) {
        console.error('Error de red al cargar saldos', error);
    }
}

async function actualizarStockAPI(bebida_id, nuevoStock) {
    try {
        await fetch(`${API_BASE_URL}/bebidas/${bebida_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: nuevoStock })
        });
    } catch (error) {
        console.error('Error actualizando stock', error);
    }
}

async function actualizarPrecioAPI(bebida_id, nuevoPrecio) {
    try {
        await fetch(`${API_BASE_URL}/bebidas/${bebida_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ precio: nuevoPrecio })
        });
    } catch (error) {
        console.error('Error actualizando precio', error);
    }
}

async function actualizarSaldoAPI(nombre, nuevoSaldo) {
    try {
        await fetch(`${API_BASE_URL}/saldos/${nombre}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: nuevoSaldo })
        });
    } catch (error) {
        console.error('Error actualizando saldo', error);
    }
}




// MÉTODOS Y LÓGICA ==================================================



async function inicializar() {
    await cargarBebidasYPrecios();
    await cargarSaldos();
    actualizarSaldo();
}

function actualizarSaldo() {
    $saldo.textContent = `Saldo: ${saldo_cliente.toFixed(2)}€`;
}

inicializar();

// Función para manejar la compra de bebidas



async function comprarBebida(bebida_id, nombre, precio) {
    if (stock[bebida_id] === 0) {
        $mensaje.innerHTML = `${nombre}<br>Stock insuficiente`;
        return;
    }
    if (saldo_cliente === 0) {
        $mensaje.innerHTML = `${nombre}<br>Precio: ${precio.toFixed(2)}€`;
    } else if (saldo_cliente < precio) {
        $mensaje.innerHTML = `Saldo insuficiente<br>Faltan: ${(precio - saldo_cliente).toFixed(2)}€`;
    } else {
        // Descontar el precio del saldo del cliente y actualizar stock y saldos
        saldo_cliente -= precio;
        saldo_maquina += precio;
        stock[bebida_id]--;
        await actualizarStockAPI(bebida_id, stock[bebida_id]);
        await actualizarSaldoAPI('saldo_cliente', saldo_cliente);
        await actualizarSaldoAPI('saldo_maquina', saldo_maquina);

        actualizarSaldo();
        $saldo_actual.textContent = saldo_cliente.toFixed(2);
        $mensaje.innerHTML = `✓ ${nombre}<br>${precio.toFixed(2)} €`;

        // Animar el expulsor de bebidas
        $recoger_bebida.style.backgroundColor = '#00ff00';
        $recoger_bebida.style.boxShadow = '0 0 20px #00ff00';
        $recoger_bebida.textContent = '¡Recoge tu bebida!';

        setTimeout(() => {
            $recoger_bebida.style.backgroundColor = '';
            $recoger_bebida.style.boxShadow = '';
            $recoger_bebida.textContent = '';
        }, 3000);
    }
}

$coca_cola.addEventListener('click', () => {
    comprarBebida('coca_cola', nombres.coca_cola, precios.coca_cola);

});

$coca_cola_zero.addEventListener('click', () => {
    comprarBebida('coca_cola_zero', nombres.coca_cola_zero, precios.coca_cola_zero);
});

$coca_cola_light.addEventListener('click', () => {
    comprarBebida('coca_cola_light', nombres.coca_cola_light, precios.coca_cola_light);
});

$sprite.addEventListener('click', () => {
    comprarBebida('sprite', nombres.sprite, precios.sprite);
});

$fanta.addEventListener('click', () => {
    comprarBebida('fanta', nombres.fanta, precios.fanta);
});

$nestea.addEventListener('click', () => {
    comprarBebida('nestea', nombres.nestea, precios.nestea);
});



$introducir_dinero.addEventListener('click', () => {
    $pantalla_dinero.style.display = 'flex';
    $saldo_actual.textContent = saldo_cliente.toFixed(2);
});

// Seleccionar todas las monedas
document.querySelectorAll('.btn_moneda').forEach(btn => {
    btn.addEventListener('click', async () => {
        // Obtener el valor de la moneda desde el atributo data-valor
        const valor = parseFloat(btn.dataset.valor);
        // Actualizar el saldo del cliente y sincronizar con backend
        saldo_cliente += valor;
        await actualizarSaldoAPI('saldo_cliente', saldo_cliente);
        actualizarSaldo();
    });
});


$btn_cerrar_dinero.addEventListener('click', () => {
    $pantalla_dinero.style.display = 'none';
    $mensaje.innerHTML = `Saldo: ${saldo_cliente.toFixed(2)}€`;
});

$abrir_maquina.addEventListener('click', () => {
    $pantalla_confirmacion.style.display = 'flex';
    $input_contrasena.value = '';
    $mensaje_error.style.display = 'none';
});

$btn_cancelar.addEventListener('click', () => {
    $pantalla_confirmacion.style.display = 'none';
});

$btn_confirmar.addEventListener('click', () => {
    if ($input_contrasena.value === CONTRASENA_CORRECTA) {
        $pantalla_confirmacion.style.display = 'none';
        window.location.href = 'ventana_segunda.html';
    } else {
        $mensaje_error.style.display = 'block';
    }
});

$salir.addEventListener('click', () => {
    $pantalla_carga_salida.style.display = 'flex';
    setTimeout(() => {
        window.close();
    }, 2000);
});