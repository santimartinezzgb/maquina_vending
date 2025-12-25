import mongoose from 'mongoose';

const bebidaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export default mongoose.model('Bebida', bebidaSchema);
