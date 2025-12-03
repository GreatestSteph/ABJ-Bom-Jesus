import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import routes from './routes/index.js';
import database from './database/index.js';  // Importa a instância do DB

dotenv.config();

const port = process.env.API_PORT || 3001;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(routes);

async function startServer() {
  try {
    await database.init();  // Aguarda o Sequelize conectar e sincronizar
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();
