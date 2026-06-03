import { Router } from "express";
import livroController from "../controllers/livroController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router()

//rotas publicas
router.get('/', livroController.listar)
router.get('/:id', livroController.buscarPorId)

//rotas admin
router.post('/', authMiddleware.verificarToken, authMiddleware.verificarAdmin, livroController.criar)
router.put('/:id', authMiddleware.verificarToken, authMiddleware.verificarAdmin, livroController.atualizar)
router.delete('/:id', authMiddleware.verificarToken, authMiddleware.verificarAdmin, livroController.deletar)

export default router