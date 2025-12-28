import mongoose, { version } from 'mongoose';

const saldoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            enum: ['saldo_cliente', 'saldo_maquina', 'dinero_recaudado']
        },
        cantidad: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    },
    {
        versionKey: false
    });

export default mongoose.model('Saldo', saldoSchema);