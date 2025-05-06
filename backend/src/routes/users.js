import { Router } from 'express';

import UsersController from '../controllers/users.js';

const rotas = new Router();

rotas
  .get('/:id', UsersController.get)
  .get('/', UsersController.list)
  .post('/', UsersController.create)
  .put('/:id', UsersController.update)
  .delete('/:id', UsersController.delete);

export default rotas;
