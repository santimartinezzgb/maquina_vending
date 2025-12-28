import express from 'express';
import Bebida from '../models/m_bebida.js';

const router = express.Router();

// Obtener todas las bebidas
router.get('/', async (req, res) => {
    try {
        const bebidas = await Bebida.find();
        res.json(bebidas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bebidas' });
    }
});

// Obtener una bebida por nombre
router.get('/:nombre', async (req, res) => {
    try {
        const bebida = await Bebida.findOne({ nombre: req.params.nombre });
        if (!bebida) return res.status(404).json({ error: 'No encontrada' });
        res.json(bebida);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la bebida' });
    }
});

// Actualizar una bebida por nombre
router.patch('/:nombre', async (req, res) => {
    try {
        const bebida = await Bebida.findOneAndUpdate(
            { nombre: req.params.nombre },
            req.body,
            { new: true, runValidators: true }
        );
        if (!bebida) return res.status(404).json({ error: 'No encontrada' });
        res.json(bebida);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la bebida' });
    }
});

export default router;