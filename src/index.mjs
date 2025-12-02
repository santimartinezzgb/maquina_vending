const $ = selector => document.querySelector(selector);


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

// Elemento de pantalla oculta
const $pantalla_oculta = $('#pantalla_oculta');

const CONTRASENA_CORRECTA = "1234";


$coca_cola.addEventListener('click', () => { })
$coca_cola_zero.addEventListener('click', () => { })
$coca_cola_light.addEventListener('click', () => { })
$sprite.addEventListener('click', () => { })
$fanta.addEventListener('click', () => { })
$nestea.addEventListener('click', () => { })

$introducir_dinero.addEventListener('click', () => {
    $pantalla_oculta.style.display = 'flex';

    // Opcional: cerrar la pantalla después de un tiempo
    setTimeout(() => {
        $pantalla_oculta.style.display = 'none';
    }, 3000);
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
        window.location.href = 'maquina_ventana.html';
    } else {
        $mensaje_error.style.display = 'block';
    }
});

$salir.addEventListener('click', () => {
    window.close();
});