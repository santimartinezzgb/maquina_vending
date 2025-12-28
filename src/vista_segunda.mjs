// = = = = = CONFIGURACIÓN API = = = = = //
const API_URL = 'http://localhost:3000/api';

// = = = = = MÉTODOS API = = = = = //
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

const cargarSaldo = async (nombre) => {
    try {
        const response = await fetch(`${API_URL}/saldos/${nombre}`);
        if (!response.ok) throw new Error('Error al obtener el saldo');
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

// = = = = = MAPEO DE BEBIDAS = = = = = //
const Bebidas = {
    'Cola-cola': {
        stock_id: 'stock_coca_cola',
        precio_id: 'precio_coca_cola',
        btn_id: 'btn_rellenar_coca_cola'
    },
    'Coca-cola Zero': {
        stock_id: 'stock_coca_cola_zero',
        precio_id: 'precio_coca_cola_zero',
        btn_id: 'btn_rellenar_coca_cola_zero'
    },
    'Coca-cola Light': {
        stock_id: 'stock_coca_cola_light',
        precio_id: 'precio_coca_cola_light',
        btn_id: 'btn_rellenar_coca_cola_light'
    },
    'Sprite': {
        stock_id: 'stock_sprite',
        precio_id: 'precio_sprite',
        btn_id: 'btn_rellenar_sprite'
    },
    'Fanta': {
        stock_id: 'stock_fanta',
        precio_id: 'precio_fanta',
        btn_id: 'btn_rellenar_fanta'
    },
    'Nestea': {
        stock_id: 'stock_nestea',
        precio_id: 'precio_nestea',
        btn_id: 'btn_rellenar_nestea'
    }
};

// = = = = = VARIABLES GLOBALES = = = = = //
let lista_bebidas = [];
let saldo_maquina = 0;
let total_recaudado = 0;

// = = = = = ELEMENTOS DEL DOM = = = = = //
const elementos = {
    span_dinero_recaudado: document.getElementById('dinero_recaudado'),
    span_total_recaudado: document.getElementById('total_recaudaciones_valor')
};

// = = = = = INICIALIZACIÓN = = = = = //
const inicializar = async () => {
    try {
        // Cargar todas las bebidas
        lista_bebidas = await cargarBebidas();

        // Cargar saldos
        const datos_saldo = await cargarSaldo('saldo_maquina');
        const datos_total_recaudado = await cargarSaldo('dinero_recaudado');

        if (datos_saldo) saldo_maquina = datos_saldo.cantidad;
        if (datos_total_recaudado) total_recaudado = datos_total_recaudado.cantidad;

        // Actualizar UI con los datos cargados
        actualizarUI();
        configurarEventos();

    } catch (error) {
        console.error('Error al inicializar:', error);
        alert('Error al cargar los datos de la máquina');
    }
}

// = = = = = ACTUALIZAR UI = = = = = //
const actualizarUI = () => {
    // Actualizar información de cada bebida
    lista_bebidas.forEach(bebida => {

        // Obtener mapeo
        const mapa = Bebidas[bebida.nombre];

        if (mapa) {
            // Actualizar stock
            const stock = document.getElementById(mapa.stock_id);
            if (stock) stock.textContent = bebida.stock;

            // Actualizar precio
            const precio_input = document.getElementById(mapa.precio_id);
            if (precio_input) precio_input.value = bebida.precio.toFixed(2);
        }
    });

    // Actualizar saldos
    elementos.span_dinero_recaudado.textContent = saldo_maquina.toFixed(2);
    elementos.span_total_recaudado.textContent = total_recaudado.toFixed(2);
}

// = = = = = RELLENAR STOCK = = = = = //
const rellenarStock = async (_nombre_bebida) => {
    const bebida = lista_bebidas.find(b => b.nombre === _nombre_bebida);
    if (!bebida) return;

    const nuevo_stock = 10
    const resultado = await actualizarBebida(_nombre_bebida, { stock: nuevo_stock });
    if (resultado) {
        bebida.stock = nuevo_stock;
        const mapa = Bebidas[_nombre_bebida];
        document.getElementById(mapa.stock_id).textContent = nuevo_stock;
        alert(`Stock actualizado: ${nuevo_stock} unidades`);
    } else {
        alert('Error al actualizar el stock');
    }
}

// = = = = = ACTUALIZAR PRECIO = = = = = //
const actualizarPrecio = async (_nombre_bebida, _precio_id) => {
    const bebida = lista_bebidas.find(b => b.nombre === _nombre_bebida);
    if (!bebida) return;

    const precio_input = document.getElementById(_precio_id);
    const nuevo_precio = parseFloat(precio_input.value);

    // if (isNaN(nuevo_precio)) {
    //     alert('Precio inválido');
    //     precio_input.value = bebida.precio.toFixed(2);
    //     return;
    // }

    const resultado = await actualizarBebida(_nombre_bebida, { precio: nuevo_precio });
    if (resultado) {
        bebida.precio = nuevo_precio;
    } else {
        precio_input.value = bebida.precio.toFixed(2);
    }
}

// = = = = = RETIRAR DINERO = = = = = //
const retirarDinero = async () => {
    if (saldo_maquina <= 0) {
        alert('No hay dinero para retirar');
        return;
    }

    const cantidad_a_retirar = saldo_maquina;
    const confirmacion = confirm(`¿Desea retirar ${cantidad_a_retirar.toFixed(2)}€ de la máquina?`);
    if (!confirmacion) return;

    const resultado = await actualizarSaldo('saldo_maquina', 0);

    if (resultado) {
        // Sumar al total recaudado (montante final)
        total_recaudado += cantidad_a_retirar;
        saldo_maquina = 0;
        await actualizarSaldo('dinero_recaudado', total_recaudado);

        alert(`Se han retirado ${cantidad_a_retirar.toFixed(2)}€`);
        actualizarUI();
    } else {
        alert('Error al retirar el dinero');
    }
}

// = = = = = VOLVER = = = = = //
const volver = () => {
    window.location.href = 'ventana_principal.html'; // Ajusta el nombre si tu archivo principal se llama diferente
}

// = = = = = CONFIGURAR EVENTOS = = = = = //
const configurarEventos = () => {

    // Selecciona todas las bebidas correctamente usando Object.entries
    Object.entries(Bebidas).forEach(([_nombre_bebida, _mapeo]) => {
        // Rellenar stock
        const btn_rellenar = document.getElementById(_mapeo.btn_id);
        if (btn_rellenar) {
            btn_rellenar.addEventListener('click', () => rellenarStock(_nombre_bebida));
        }

        // Actualizar precio
        const input_precio = document.getElementById(_mapeo.precio_id);
        if (input_precio) {

            // blur. Actualiza al salir del input
            input_precio.addEventListener('blur', () => actualizarPrecio(_nombre_bebida, _mapeo.precio_id));

            // keypress. Acepta al pulsar Enter
            input_precio.addEventListener('keypress', () => {

                actualizarPrecio(_nombre_bebida, _mapeo.precio_id);
                input_precio.blur();
            });
        }
    });

    // Botón retirar dinero
    document.getElementById('btn_retirar_dinero').addEventListener('click', retirarDinero);

    // Botón volver
    document.getElementById('btn_volver').addEventListener('click', volver);
}

// = = = = = INICIAR APLICACIÓN = = = = = //
inicializar();