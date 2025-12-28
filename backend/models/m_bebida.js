import mongoose from 'mongoose';

const bebidaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true  // Añade createdAt y updatedAt automáticamente
    },
    {
        versionKey: false
    });

export default mongoose.model('Bebida', bebidaSchema);