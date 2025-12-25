import express from 'express';
import Bebida from '../models/bebida.js';

const router = express.Router();

// Obtener todas las bebidas
router.get('/', async (req, res) => {
    const bebidas = await Bebida.find();
    res.json(bebidas);
});

// Obtener una bebida por nombre
router.get('/:nombre', async (req, res) => {
    const bebida = await Bebida.findOne({ nombre: req.params.nombre });
    if (!bebida) return res.status(404).json({ error: 'No encontrada' });
    res.json(bebida);
});

// Actualizar una bebida por nombre
router.patch('/:nombre', async (req, res) => {
    const bebida = await Bebida.findOneAndUpdate(
        { nombre: req.params.nombre },
        req.body,
        { new: true }
    );
    if (!bebida) return res.status(404).json({ error: 'No encontrada' });
    res.json(bebida);
});

export default router;
