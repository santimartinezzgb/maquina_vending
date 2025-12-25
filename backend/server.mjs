import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import bebidasRouter from './routes/bebidas.js';
import saldosRouter from './routes/saldos.js';

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI || '';
mongoose.connect(mongoUri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/bebidas', bebidasRouter);
app.use('/api/saldos', saldosRouter);
