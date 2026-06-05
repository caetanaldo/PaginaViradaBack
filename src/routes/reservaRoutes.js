import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import reservaController from "../controllers/reservaController.js";

const router = Router();

router.post("/", authMiddleware.verificarToken, reservaController.criar);
router.get("/minhas", authMiddleware.verificarToken, reservaController.listarMinhasReservas);
router.get("/", authMiddleware.verificarToken, authMiddleware.verificarAdmin ,reservaController.listarTodasReservas);
router.delete("/:id/cancelar", authMiddleware.verificarToken, reservaController.cancelar);

export default router;