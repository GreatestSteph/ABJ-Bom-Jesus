import { Router } from 'express';

import ProdutosController from '../controllers/produtos.js';

const rotas = new Router();

rotas
  .get('/:id', ProdutosController.get)
  .get('/', ProdutosController.list)
  .post('/', ProdutosController.create)
  .put('/:id', ProdutosController.update)
  .delete('/:id', ProdutosController.delete);

export default rotas;
