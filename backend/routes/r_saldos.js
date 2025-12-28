import express from 'express';
import Saldo from '../models/m_saldo.js';

const router = express.Router();

// Obtener todos los saldos
router.get('/', async (req, res) => {
    try {
        const saldos = await Saldo.find();
        res.json(saldos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener saldos' });
    }
});

// Obtener un saldo por nombre
router.get('/:nombre', async (req, res) => {
    try {
        const saldo = await Saldo.findOne({ nombre: req.params.nombre });
        if (!saldo) return res.status(404).json({ error: 'Saldo no encontrado' });
        res.json(saldo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el saldo' });
    }
});

// Actualizar un saldo por nombre
router.patch('/:nombre', async (req, res) => {
    try {
        const saldo = await Saldo.findOneAndUpdate(
            { nombre: req.params.nombre },
            req.body,
            { new: true, runValidators: true }
        );

        if (!saldo) return res.status(404).json({ error: 'Saldo no encontrado' });
        res.json(saldo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el saldo' });
    }
});

export default router;