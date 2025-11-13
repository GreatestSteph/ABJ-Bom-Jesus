import { Router } from 'express';
import BloqueiosController from '../controllers/bloqueios.js';

const rotas = new Router();

rotas
  .get('/ativos', BloqueiosController.listActive)
  .get('/historico/:guest_id', BloqueiosController.getHistory)
  .get('/guest/:guest_id', BloqueiosController.getByGuest)
  .get('/:id', BloqueiosController.get)
  .get('/', BloqueiosController.list)
  .post('/:id/cancelar', BloqueiosController.cancel)
  .post('/', BloqueiosController.create)
  .put('/:id', BloqueiosController.update)
  .delete('/:id', BloqueiosController.delete);

export default rotas;
