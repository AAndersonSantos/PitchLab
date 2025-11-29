// src/messages/messages.routes.ts
import { Router } from "express";
import { MessagesController } from "../../modules/messages/messages.controller.js";

const router = Router();
const controller = new MessagesController();

router.get("/:roomId", controller.list);

export default router;
