import { Router } from 'express';

import OccurrencesController from '../controllers/occurrences.js';

const rotas = new Router();

rotas
  .get('/guest/:guest_id', OccurrencesController.getByGuest)
  .get('/:id', OccurrencesController.get)
  .get('/', OccurrencesController.list)
  .post('/', OccurrencesController.create)
  .put('/:id', OccurrencesController.update)
  .delete('/:id', OccurrencesController.delete);

export default rotas;