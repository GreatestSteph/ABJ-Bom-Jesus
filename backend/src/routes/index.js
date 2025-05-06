import { Router } from 'express';

import guests from './guests.js';
import users from './users.js';

const routes = new Router();

routes.use('/guests', guests);
routes.use('/users', users);

export default routes;
