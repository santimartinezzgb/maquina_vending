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


$coca_cola.addEventListener('click', () => { })
$coca_cola_zero.addEventListener('click', () => { })
$coca_cola_light.addEventListener('click', () => { })
$sprite.addEventListener('click', () => { })
$fanta.addEventListener('click', () => { })
$nestea.addEventListener('click', () => { })

$introducir_dinero.addEventListener('click', () => {

});

$abrir_maquina.addEventListener('click', () => {

});

$salir.addEventListener('click', () => {
    window.close();
});