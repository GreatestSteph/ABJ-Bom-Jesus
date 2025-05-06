import { Router } from 'express';

import guests from './guests.js';

const routes = new Router();

routes.use('/hospedes', guests);

export default routes;
