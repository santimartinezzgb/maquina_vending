const $ = selector => document.querySelector(selector);

const $mensaje = $('#mensaje');
const $coca_cola = $('#coca_cola');
const $coca_cola_zero = $('#coca_cola_zero');
const $coca_cola_light = $('#coca_cola_light');
const $sprite = $('#sprite');
const $fanta = $('#fanta');
const $nestea = $('#nestea');

const $introducir_dinero = $('#btn_introductir_dinero')
const $abrir_maquina = $('#btn_abrir_maquina')
const $salir = $('#btn_salir');

// Elementos de la pantalla de confirmación
const $pantalla_confirmacion = $('#pantalla_confirmacion');
const $btn_confirmar = $('#btn_confirmar');
const $btn_cancelar = $('#btn_cancelar');
const $input_contrasena = $('#input_contrasena');
const $mensaje_error = $('#mensaje_error');

const CONTRASENA_CORRECTA = "admin123";

$coca_cola.onclick = () => {
    $mensaje.innerHTML = 'Coca-Cola<br>Precio: 1.00€';
};

$coca_cola_zero.onclick = () => {
    $mensaje.innerHTML = 'Coca-Cola Zero<br>Precio: 1.00€';
};

$coca_cola_light.onclick = () => {
    $mensaje.innerHTML = 'Coca-Cola Light<br>Precio: 1.00€';
};

$sprite.onclick = () => {
    $mensaje.innerHTML = 'Sprite<br>Precio: 1.00€';
};

$fanta.onclick = () => {
    $mensaje.innerHTML = 'Fanta<br>Precio: 1.00€';
};

$nestea.onclick = () => {
    $mensaje.innerHTML = 'Nestea<br>Precio: 1.00€';
};

$introducir_dinero.addEventListener('click', () => {
    alert('Funcionalidad de insertar dinero no implementada.');
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
    window.close();
});