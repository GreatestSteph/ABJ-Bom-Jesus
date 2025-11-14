import { Router } from "express";
import EntradasController from "../controllers/entradas.js";

const router = Router();

router.get("/", EntradasController.list);     
router.get("/:id", EntradasController.get);  
router.post("/", EntradasController.create);
router.put("/:id", EntradasController.update);
router.delete("/:id", EntradasController.delete);

export default router;
