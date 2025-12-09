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

// Cargar stock desde localStorage
let stock = JSON.parse(localStorage.getItem('stock_bebidas')) || {
    coca_cola: 10,
    coca_cola_zero: 10,
    coca_cola_light: 10,
    sprite: 10,
    fanta: 10,
    nestea: 10
};

// Cargar precios desde localStorage
let precios = JSON.parse(localStorage.getItem('precios_bebidas')) || {
    coca_cola: 1.50,
    coca_cola_zero: 1.50,
    coca_cola_light: 1.50,
    sprite: 1.30,
    fanta: 1.30,
    nestea: 1.40
};

// Función para guardar precios
function guardarPrecios() {
    localStorage.setItem('precios_bebidas', JSON.stringify(precios));
}

// Función para cargar precios en los inputs
function cargarPrecios() {
    $precio_coca_cola.value = precios.coca_cola.toFixed(2);
    $precio_coca_cola_zero.value = precios.coca_cola_zero.toFixed(2);
    $precio_coca_cola_light.value = precios.coca_cola_light.toFixed(2);
    $precio_sprite.value = precios.sprite.toFixed(2);
    $precio_fanta.value = precios.fanta.toFixed(2);
    $precio_nestea.value = precios.nestea.toFixed(2);
}

// Event listeners para actualizar precios
$precio_coca_cola.addEventListener('change', () => {
    precios.coca_cola = parseFloat($precio_coca_cola.value) || 0;
    guardarPrecios();
});

$precio_coca_cola_zero.addEventListener('change', () => {
    precios.coca_cola_zero = parseFloat($precio_coca_cola_zero.value) || 0;
    guardarPrecios();
});

$precio_coca_cola_light.addEventListener('change', () => {
    precios.coca_cola_light = parseFloat($precio_coca_cola_light.value) || 0;
    guardarPrecios();
});

$precio_sprite.addEventListener('change', () => {
    precios.sprite = parseFloat($precio_sprite.value) || 0;
    guardarPrecios();
});

$precio_fanta.addEventListener('change', () => {
    precios.fanta = parseFloat($precio_fanta.value) || 0;
    guardarPrecios();
});

$precio_nestea.addEventListener('change', () => {
    precios.nestea = parseFloat($precio_nestea.value) || 0;
    guardarPrecios();
});


$btn_rellenar_coca_cola.addEventListener('click', () => rellenarBebida('coca_cola'));
$btn_rellenar_coca_cola_zero.addEventListener('click', () => rellenarBebida('coca_cola_zero'));
$btn_rellenar_coca_cola_light.addEventListener('click', () => rellenarBebida('coca_cola_light'));
$btn_rellenar_sprite.addEventListener('click', () => rellenarBebida('sprite'));
$btn_rellenar_fanta.addEventListener('click', () => rellenarBebida('fanta'));
$btn_rellenar_nestea.addEventListener('click', () => rellenarBebida('nestea'));

// Retirar dinero
$btn_retirar_dinero.addEventListener('click', () => {
    let dinero_recaudado = parseFloat(localStorage.getItem('dinero_recaudado')) || 0;
    let total_recaudaciones_valor = parseFloat(localStorage.getItem('total_recaudaciones')) || 0;
    if (dinero_recaudado > 0) {

        alert(`Has retirado ${dinero_recaudado.toFixed(2)}€ de la máquina.`);
        total_recaudaciones_valor += dinero_recaudado;
        localStorage.setItem('total_recaudaciones', total_recaudaciones_valor.toString());
        $total_recaudaciones_valor.textContent = total_recaudaciones_valor.toFixed(2);

        dinero_recaudado = 0;
        localStorage.setItem('dinero_recaudado', dinero_recaudado.toString());
        $dinero_recaudado.textContent = dinero_recaudado.toFixed(2);

    } else {
        alert('No hay dinero para retirar.');
    }
});

// Función para actualizar el stock en la interfaz
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

// Función para rellenar una bebida
function rellenarBebida(bebida_id) {
    if (stock[bebida_id] < 10) {
        stock[bebida_id] = 10;
        localStorage.setItem('stock_bebidas', JSON.stringify(stock));
        actualizarStock();
    }
}


// Volver a la ventana principal
if ($btn_volver) {
    $btn_volver.addEventListener('click', () => {
        window.location.href = 'ventana_principal.html';
    });
}

// Función para cargar y mostrar dinero recaudado
function cargarDineroRecaudado() {
    let dinero_recaudado = parseFloat(localStorage.getItem('dinero_recaudado')) || 0;
    $dinero_recaudado.textContent = dinero_recaudado.toFixed(2);
}

// Función para cargar y mostrar total de recaudaciones
function cargarTotalRecaudaciones() {
    let total_recaudaciones = parseFloat(localStorage.getItem('total_recaudaciones')) || 0;
    $total_recaudaciones_valor.textContent = total_recaudaciones.toFixed(2);
}

// Cargar precios, stock y dinero recaudado al iniciar
cargarPrecios();
actualizarStock();
cargarDineroRecaudado();
cargarTotalRecaudaciones();
