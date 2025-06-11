import { Router } from 'express';
import TipoOcorrenciaController from '../controllers/tipoOcorrencia.js';

const router = Router();

router.post('/tipos-ocorrencia', TipoOcorrenciaController.create);
router.get('/tipos-ocorrencia', TipoOcorrenciaController.list);
router.get('/tipos-ocorrencia/:id', TipoOcorrenciaController.get);
router.put('/tipos-ocorrencia/:id', TipoOcorrenciaController.update);
router.delete('/tipos-ocorrencia/:id', TipoOcorrenciaController.delete);

export default router;