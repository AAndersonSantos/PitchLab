// src/messages/messages.controller.ts
import type { Request, Response } from "express";
import { MessagesService } from "./messages.service.js";

const service = new MessagesService();

export class MessagesController {
  async list(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const { limit, cursor } = req.query;

      if (typeof roomId !== "string") {
        return res.status(400).json({ error: "roomId is required and must be a string" });
      }

      const msgs = await service.findByRoom(
        roomId,
        limit ? Number(limit) : undefined,
        cursor ? String(cursor) : undefined
      );

      return res.json(msgs);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
