import { Router } from 'express';

import guests from './guests.js';
import users from './users.js';
import produtos from './produtos.js';
import tipoOcorrencia from './tipoOcorrencia.js';
import occurrences from './occurrences.js';
import bloqueios from './bloqueios.js';

const routes = new Router();

routes.use('/guests', guests);
routes.use('/users', users);
routes.use('/produtos', produtos);
routes.use('/occurrences', occurrences);
routes.use('/bloqueios', bloqueios);
routes.use(tipoOcorrencia);

export default routes;
