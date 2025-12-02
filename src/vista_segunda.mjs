const $ = selector => document.querySelector(selector);


const $btn_rellenar = $('#btn_rellenar');
const $btn_retirar_dinero = $('#btn_retirar_dinero');
const $btn_volver = $('#btn_volver');

if ($btn_rellenar) {
    $btn_rellenar.addEventListener('click', () => {
        alert('Funcionalidad de rellenar productos no implementada.');
    });
}

if ($btn_retirar_dinero) {
    $btn_retirar_dinero.addEventListener('click', () => {
        alert('Funcionalidad de retirar dinero no implementada.');
    });
}

if ($btn_volver) {
    $btn_volver.addEventListener('click', () => {
        window.location.href = 'ventana_principal.html';
    });
} else {
    console.error('No se encontró el botón volver');
}
