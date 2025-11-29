import { Router } from "express";
import { MessagesController } from "../../modules/messages/messages.controller.js";
import { authGuard } from "../../middleware/auth/auth.guard.js";

const router = Router();
const controller = new MessagesController();

router.get("/:roomId", authGuard, controller.list);

export default router;
