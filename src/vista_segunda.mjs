const $ = selector => document.querySelector(selector);

const $btn_retirar_dinero = $('#btn_retirar_dinero');
const $btn_volver = $('#btn_volver');

// Elementos de precios
const $precio_coca_cola = $('#precio_coca_cola');
const $precio_coca_cola_zero = $('#precio_coca_cola_zero');
const $precio_coca_cola_light = $('#precio_coca_cola_light');
const $precio_sprite = $('#precio_sprite');
const $precio_fanta = $('#precio_fanta');
const $precio_nestea = $('#precio_nestea');

// Elementos de stock
const $stock_coca_cola = $('#stock_coca_cola');
const $stock_coca_cola_zero = $('#stock_coca_cola_zero');
const $stock_coca_cola_light = $('#stock_coca_cola_light');
const $stock_sprite = $('#stock_sprite');
const $stock_fanta = $('#stock_fanta');
const $stock_nestea = $('#stock_nestea');

// Dinero recaudado
const $dinero_recaudado = $('#dinero_recaudado');
const $total_recaudaciones_valor = $('#total_recaudaciones_valor');

// Botones de rellenar
const $btn_rellenar_coca_cola = $('#btn_rellenar_coca_cola');
const $btn_rellenar_coca_cola_zero = $('#btn_rellenar_coca_cola_zero');
const $btn_rellenar_coca_cola_light = $('#btn_rellenar_coca_cola_light');
const $btn_rellenar_sprite = $('#btn_rellenar_sprite');
const $btn_rellenar_fanta = $('#btn_rellenar_fanta');
const $btn_rellenar_nestea = $('#btn_rellenar_nestea');



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
let saldo_maquina = 0;
let saldo_cliente = 0;

// Funciones para interactuar con la API REST global
async function cargarEstado() {
    try {
        const response = await fetch(`${API_BASE_URL}/estado`);
        if (response.ok) {
            const estado = await response.json();
            stock = estado.stock_bebidas || stock;
            precios = estado.precios_bebidas || precios;
            saldo_maquina = estado.saldo_maquina || 0;
            saldo_cliente = estado.saldo_cliente || 0;
        } else {
            console.error('Error al cargar estado desde la API');
        }
    } catch (error) {
        console.error('Error de red al cargar estado', error);
    }
}

async function actualizarEstadoAPI(nuevosDatos) {
    try {
        const response = await fetch(`${API_BASE_URL}/estado`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevosDatos)
        });
        if (response.ok) {
            const estado = await response.json();
            stock = estado.stock_bebidas || stock;
            precios = estado.precios_bebidas || precios;
            saldo_maquina = estado.saldo_maquina || saldo_maquina;
            saldo_cliente = estado.saldo_cliente || saldo_cliente;
        }
    } catch (error) {
        console.error('Error actualizando estado', error);
    }
}


function cargarPrecios() {
    $precio_coca_cola.value = precios.coca_cola.toFixed(2);
    $precio_coca_cola_zero.value = precios.coca_cola_zero.toFixed(2);
    $precio_coca_cola_light.value = precios.coca_cola_light.toFixed(2);
    $precio_sprite.value = precios.sprite.toFixed(2);
    $precio_fanta.value = precios.fanta.toFixed(2);
    $precio_nestea.value = precios.nestea.toFixed(2);
}

// Event listeners para actualizar precios
$precio_coca_cola.addEventListener('change', async () => {
    precios.coca_cola = parseFloat($precio_coca_cola.value) || 0;
    await actualizarEstadoAPI({ precios_bebidas: precios });
    cargarPrecios();
});
$precio_coca_cola_zero.addEventListener('change', async () => {
    precios.coca_cola_zero = parseFloat($precio_coca_cola_zero.value) || 0;
    await actualizarEstadoAPI({ precios_bebidas: precios });
    cargarPrecios();
});
$precio_coca_cola_light.addEventListener('change', async () => {
    precios.coca_cola_light = parseFloat($precio_coca_cola_light.value) || 0;
    await actualizarEstadoAPI({ precios_bebidas: precios });
    cargarPrecios();
});
$precio_sprite.addEventListener('change', async () => {
    precios.sprite = parseFloat($precio_sprite.value) || 0;
    await actualizarEstadoAPI({ precios_bebidas: precios });
    cargarPrecios();
});
$precio_fanta.addEventListener('change', async () => {
    precios.fanta = parseFloat($precio_fanta.value) || 0;
    await actualizarEstadoAPI({ precios_bebidas: precios });
    cargarPrecios();
});
$precio_nestea.addEventListener('change', async () => {
    precios.nestea = parseFloat($precio_nestea.value) || 0;
    await actualizarEstadoAPI({ precios_bebidas: precios });
    cargarPrecios();
});



$btn_rellenar_coca_cola.addEventListener('click', () => rellenarBebida('coca_cola'));
$btn_rellenar_coca_cola_zero.addEventListener('click', () => rellenarBebida('coca_cola_zero'));
$btn_rellenar_coca_cola_light.addEventListener('click', () => rellenarBebida('coca_cola_light'));
$btn_rellenar_sprite.addEventListener('click', () => rellenarBebida('sprite'));
$btn_rellenar_fanta.addEventListener('click', () => rellenarBebida('fanta'));
$btn_rellenar_nestea.addEventListener('click', () => rellenarBebida('nestea'));

// Retirar dinero
$btn_retirar_dinero.addEventListener('click', async () => {
    await cargarEstado();
    if (saldo_maquina > 0) {
        alert(`Has retirado ${saldo_maquina.toFixed(2)}€ de la máquina.`);
        // Sumar al total de recaudaciones y reiniciar saldo_maquina
        let total_recaudaciones = (window.total_recaudaciones || 0) + saldo_maquina;
        await actualizarEstadoAPI({ saldo_maquina: 0, total_recaudaciones });
        saldo_maquina = 0;
        $dinero_recaudado.textContent = saldo_maquina.toFixed(2);
        $total_recaudaciones_valor.textContent = total_recaudaciones.toFixed(2);
    } else {
        alert('No hay dinero para retirar.');
    }
});


function actualizarStock() {
    $stock_coca_cola.textContent = stock.coca_cola;
    $stock_coca_cola_zero.textContent = stock.coca_cola_zero;
    $stock_coca_cola_light.textContent = stock.coca_cola_light;
    $stock_sprite.textContent = stock.sprite;
    $stock_fanta.textContent = stock.fanta;
    $stock_nestea.textContent = stock.nestea;

    // Deshabilitar botones si el stock es 10
    $btn_rellenar_coca_cola.disabled = stock.coca_cola >= 10;
    $btn_rellenar_coca_cola_zero.disabled = stock.coca_cola_zero >= 10;
    $btn_rellenar_coca_cola_light.disabled = stock.coca_cola_light >= 10;
    $btn_rellenar_sprite.disabled = stock.sprite >= 10;
    $btn_rellenar_fanta.disabled = stock.fanta >= 10;
    $btn_rellenar_nestea.disabled = stock.nestea >= 10;
}



async function rellenarBebida(bebida_id) {
    if (stock[bebida_id] < 10) {
        stock[bebida_id] = 10;
        await actualizarEstadoAPI({ stock_bebidas: stock });
        actualizarStock();
    }
}


// Volver a la ventana principal
if ($btn_volver) {
    $btn_volver.addEventListener('click', () => {
        window.location.href = 'ventana_principal.html';
    });
}



async function cargarDineroRecaudado() {
    await cargarEstado();
    $dinero_recaudado.textContent = saldo_maquina.toFixed(2);
    $total_recaudaciones_valor.textContent = (window.total_recaudaciones || 0).toFixed(2);
}

// Cargar precios, stock y dinero recaudado al iniciar
async function inicializar() {
    await cargarEstado();
    cargarPrecios();
    actualizarStock();
    await cargarDineroRecaudado();
}

inicializar();
