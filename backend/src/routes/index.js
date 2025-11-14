import { Router } from 'express';

import guests from './guests.js';
import users from './users.js';
import produtos from './produtos.js';
import tipoOcorrencia from './tipoOcorrencia.js';
import occurrences from './occurrences.js';
import bloqueios from './bloqueios.js';
import consumos from './consumos.js';
import entradas from "./entradas.js";


const routes = new Router();
routes.use("/entradas", entradas);
routes.use('/consumos', consumos);
routes.use('/guests', guests);
routes.use('/users', users);
routes.use('/produtos', produtos);
routes.use('/occurrences', occurrences);
routes.use('/bloqueios', bloqueios);
routes.use(tipoOcorrencia);

export default routes;
