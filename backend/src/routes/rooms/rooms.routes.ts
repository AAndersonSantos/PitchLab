import { Router } from "express";
import { roomsController } from "../../modules/rooms/rooms.controller.js";
import { authGuard } from "../../middleware/auth/auth.guard.js";

const router = Router();

router.post("/", authGuard, roomsController.create);
router.get("/", authGuard, roomsController.list);
router.get("/:id", authGuard, roomsController.getById);

export default router;
