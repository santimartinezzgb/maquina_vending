import Configuracion from './models/Configuracion.mjs';

const operacion = async (tipo, datos, def) => {
    const config = datos !== undefined
        ? await Configuracion.findOneAndUpdate({ tipo }, { datos }, { upsert: true, new: true })
        : await Configuracion.findOne({ tipo });
    return datos !== undefined ? datos : (config?.datos ?? def);
};

const datos = {
    stock: { coca_cola: 10, coca_cola_zero: 10, coca_cola_light: 10, sprite: 10, fanta: 10, nestea: 10 },
    precios: { coca_cola: 1.50, coca_cola_zero: 1.50, coca_cola_light: 1.50, sprite: 1.30, fanta: 1.30, nestea: 1.40 },
    num: 0
};

export const guardarStock = (valores) => operacion('stock', valores);
export const cargarStock = () => operacion('stock', undefined, datos.stock);

export const guardarPrecios = (valores) => operacion('precios', valores);
export const cargarPrecios = () => operacion('precios', undefined, datos.precios);
export const guardarSaldo = (valores) => operacion('saldo', valores);
export const cargarSaldo = () => operacion('saldo', undefined, datos.num);

export const guardarDineroRecaudado = (valores) => operacion('dinero_recaudado', valores);
export const cargarDineroRecaudado = () => operacion('dinero_recaudado', undefined, datos.num);

export const guardarTotalRecaudaciones = (valores) => operacion('total_recaudaciones', valores);
export const cargarTotalRecaudaciones = () => operacion('total_recaudaciones', undefined, datos.num);