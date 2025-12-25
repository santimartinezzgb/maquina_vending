import mongoose from 'mongoose';

const saldoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true }
});

export default mongoose.model('Saldo', saldoSchema);
