// src/modules/rooms/rooms.routes.ts
import { Router } from "express";
import { roomsController } from "../../modules/rooms/rooms.controller.js";

const router = Router();

router.post("/", (req, res) => roomsController.create(req, res));
router.get("/", (req, res) => roomsController.list(req, res));
router.get("/:id", (req, res) => roomsController.getById(req, res));

export default router;
