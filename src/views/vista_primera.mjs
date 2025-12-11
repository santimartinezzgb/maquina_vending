// Para seleccionar elementos del DOM
const $ = selector => document.querySelector(selector);


// VARIABLES Y LISTAS ==========================================
const $pantalla_carga = $('#pantalla_carga');
const $pantalla_carga_salida = $('#pantalla_carga_salida');

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

// Variables globales para datos de MongoDB
let stock = {};
let precios = {};
let saldo_maquina = 0;
let dinero_recaudado = 0;

const nombres = {
    coca_cola: 'Coca-Cola',
    coca_cola_zero: 'Coca-Cola Zero',
    coca_cola_light: 'Coca-Cola Light',
    sprite: 'Sprite',
    fanta: 'Fanta',
    nestea: 'Nestea'
};


// MÉTODOS Y LÓGICA ==================================================

// Cargar datos desde MongoDB al iniciar
const inicializarDatos = async () => {
    try {
        stock = await window.electronAPI.cargarStock();
        precios = await window.electronAPI.cargarPrecios();
        saldo_maquina = await window.electronAPI.cargarSaldo();
        dinero_recaudado = await window.electronAPI.cargarDineroRecaudado();

        actualizarSaldo();

        setTimeout(() => {
            $pantalla_carga.style.display = 'none';
        }, 2000);
    } catch (error) {
        console.error('Error al inicializar datos:', error);
        setTimeout(() => {
            $pantalla_carga.style.display = 'none';
        }, 2000);
    }
};

// Función para guardar saldo en MongoDB
const guardarSaldo = async () => {
    await window.electronAPI.guardarSaldo(saldo_maquina);
};

// Actualizar el saldo en la interfaz
const actualizarSaldo = () => {
    $saldo.textContent = `Saldo: ${saldo_maquina.toFixed(2)}€`;
};

// Función para guardar stock en MongoDB
const guardarStock = async () => {
    await window.electronAPI.guardarStock(stock);
};

// Función para manejar la compra de bebidas
const comprarBebida = async (bebida_id, nombre, precio) => {
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

        await guardarSaldo();
        await window.electronAPI.guardarDineroRecaudado(dinero_recaudado);
        actualizarSaldo();

        // Disminuir el stock de la bebida
        stock[bebida_id]--;
        await guardarStock();

        $saldo_actual.textContent = saldo_maquina.toFixed(2);
        $mensaje.innerHTML = `✓ ${nombre}<br>${precio.toFixed(2)}€`;

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
};

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
    btn.addEventListener('click', async () => {
        // Obtener el valor de la moneda desde el atributo data-valor
        const valor = parseFloat(btn.dataset.valor);

        // Actualizar el saldo de la máquina
        saldo_maquina += valor;
        await guardarSaldo();
        actualizarSaldo();
        $saldo_actual.textContent = saldo_maquina.toFixed(2);
    });
});

$btn_cerrar_dinero.addEventListener('click', () => {
    $pantalla_dinero.style.display = 'none';
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

// Inicializar la aplicación cargando datos desde MongoDB
inicializarDatos();