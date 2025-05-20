import { Router } from 'express';

import guests from './guests.js';
import users from './users.js';
import produtos from './produtos.js';

const routes = new Router();

routes.use('/guests', guests);
routes.use('/users', users);
routes.use('/produtos', produtos);

export default routes;
