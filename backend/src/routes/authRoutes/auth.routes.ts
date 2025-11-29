import { Router } from "express";
import { AuthController } from "../../modules/auth/auth.controller.js";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
