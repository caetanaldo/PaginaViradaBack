import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import livroRoutes from './routes/livroRoutes.js'
import reservaRoutes from './routes/reservaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/livro', livroRoutes);
app.use('/reserva', reservaRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Página Virada funcionando!' });
});

export default app;