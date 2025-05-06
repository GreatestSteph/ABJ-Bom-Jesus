import { Router } from 'express';

import GuestsController from '../controllers/guests.js';

const rotas = new Router();

rotas
  .get('/:id', GuestsController.get)
  .get('/', GuestsController.list)
  .post('/', GuestsController.create)
  .put('/:id', GuestsController.update)
  .delete('/:id', GuestsController.delete);

export default rotas;
