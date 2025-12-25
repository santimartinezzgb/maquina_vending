import express from 'express';
import Saldo from '../models/saldo.js';

const router = express.Router();

// Obtener todos los saldos
router.get('/', async (req, res) => {
    const saldos = await Saldo.find();
    res.json(saldos);
});

// Obtener un saldo por nombre
router.get('/:nombre', async (req, res) => {
    const saldo = await Saldo.findOne({ nombre: req.params.nombre });
    if (!saldo) return res.status(404).json({ error: 'No encontrado' });
    res.json(saldo);
});

// Actualizar un saldo por nombre
router.patch('/:nombre', async (req, res) => {
    const saldo = await Saldo.findOneAndUpdate(
        { nombre: req.params.nombre },
        req.body,
        { new: true }
    );
    if (!saldo) return res.status(404).json({ error: 'No encontrado' });
    res.json(saldo);
});

export default router;
