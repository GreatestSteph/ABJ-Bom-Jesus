import { Router } from 'express';            // Importa a classe Router do pacote 'express'
import QuartosController from '../controllers/quartos.js';  // Importa o controlador de quartos

const router = new Router();                  // Cria uma nova instância de roteador

// Define rota POST na raiz ('/') que chama o método create do controlador
router.post('/',   QuartosController.create);

// Define rota GET na raiz ('/') que chama o método list do controlador
router.get('/',    QuartosController.list);

// Define rota GET com parâmetro ':id' que chama o método get do controlador
router.get('/:id', QuartosController.get);

// Define rota PUT com parâmetro ':id' que chama o método update do controlador
router.put('/:id', QuartosController.update);

// Define rota DELETE com parâmetro ':id' que chama o método delete do controlador
router.delete('/:id', QuartosController.delete);

export default router;                        // Exporta o roteador para uso em outros módulos
