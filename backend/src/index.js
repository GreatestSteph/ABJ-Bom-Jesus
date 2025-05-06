import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import routes from './routes/index.js';
import './database/index.js';

dotenv.config();

const port = process.env.API_PORT || 3000;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
