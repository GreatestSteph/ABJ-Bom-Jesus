import { Router } from 'express';

import GuestsController from '../controllers/guests.js';

const rotas = new Router();

rotas
  .get('/:id', GuestsController.create)
  .get('/', GuestsController.create)
  .post('/', GuestsController.create)
  .put('/:id', GuestsController.create)
  .delete('/:id', GuestsController.create);

export default rotas;
