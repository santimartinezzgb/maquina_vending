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


//localStorage. Para almacenar datos persistentes entre sesiones

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

const nombres = {
    coca_cola: 'Coca-Cola',
    coca_cola_zero: 'Coca-Cola Zero',
    coca_cola_light: 'Coca-Cola Light',
    sprite: 'Sprite',
    fanta: 'Fanta',
    nestea: 'Nestea'
};


// MÉTODOS Y LÓGICA ==================================================

// Saldo inicial de la máquina - cargar desde localStorage
// || 0: evita que el saldo sea NaN si el localStorage no tiene el valor
let saldo_maquina = parseFloat(localStorage.getItem('saldo_maquina')) || 0;
let dinero_recaudado = parseFloat(localStorage.getItem('dinero_recaudado')) || 0;

// Función para guardar saldo
let guardarSaldo = () => {
    localStorage.setItem('saldo_maquina', saldo_maquina.toString());
}

// Actualizar el saldo en la interfaz
let actualizarSaldo = () => {
    $saldo.textContent = `Saldo: ${saldo_maquina.toFixed(2)}€`;
    guardarSaldo();
}
actualizarSaldo();

// Función para guardar stock
let guardarStock = () => {
    localStorage.setItem('stock_bebidas', JSON.stringify(stock));
}

// Función para cargar stock
let cargarStock = () => {
    const stockGuardado = localStorage.getItem('stock_bebidas');
    if (stockGuardado) {
        stock = JSON.parse(stockGuardado);
    }
}

// Cargar stock al iniciar
cargarStock();

// Función para manejar la compra de bebidas
let comprarBebida = (bebida_id, nombre, precio) => {
    if (stock[bebida_id] === 0) {
        $mensaje.innerHTML = `${nombre}<br>Stock insuficiente`;
        return;
    }

    if (saldo_maquina === 0) {
        $mensaje.innerHTML = `${nombre}<br>Precio: ${precio.toFixed(2)}€`;
    } else if (saldo_maquina < precio) {
        $mensaje.innerHTML = `Saldo insuficiente<br>Faltan: ${(precio - saldo_maquina).toFixed(2)}€`;
    } else {

        // Descontar el precio del saldo
        saldo_maquina -= precio;
        dinero_recaudado += precio;
        localStorage.setItem('dinero_recaudado', dinero_recaudado.toString());
        actualizarSaldo();

        // Disminuir el stock de la bebida
        stock[bebida_id]--;
        guardarStock();

        $saldo_actual.textContent = saldo_maquina.toFixed(2);
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
    $saldo_actual.textContent = saldo_maquina.toFixed(2);
});

// Seleccionar todas las monedas
document.querySelectorAll('.btn_moneda').forEach(btn => {

    btn.addEventListener('click', () => {

        // Obtener el valor de la moneda desde el atributo data-valor
        const valor = parseFloat(btn.dataset.valor);

        // Actualizar el saldo de la máquina
        saldo_maquina += valor;
        actualizarSaldo();
    });
});

$btn_cerrar_dinero.addEventListener('click', () => {
    $pantalla_dinero.style.display = 'none';
    $mensaje.innerHTML = `Saldo: ${saldo_maquina.toFixed(2)}€`;
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