import mongoose from 'mongoose';

const ConfiguracionSchema = new mongoose.Schema({
    tipo: { type: String, required: true, unique: true },
    datos: { type: mongoose.Schema.Types.Mixed, required: true }
});

export default mongoose.model('Configuracion', ConfiguracionSchema);
