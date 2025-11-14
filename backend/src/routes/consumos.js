import { Router } from 'express';
import ConsumosController from '../controllers/consumos.js';

const router = new Router();

router.get('/', ConsumosController.list);
router.get('/:id', ConsumosController.get);
router.post('/', ConsumosController.create);
router.put('/:id', ConsumosController.update);
router.delete('/:id', ConsumosController.delete);

export default router;
