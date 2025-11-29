// src/modules/rooms/rooms.controller.ts
import type { Request, Response } from "express";
import { roomsService } from "./rooms.service.js";

export class RoomsController {

  async create(req: Request, res: Response) {
    try {
      const { name, ownerId, userId } = req.body;
      const room = await roomsService.createRoom({ name, ownerId, userId });
      return res.status(201).json(room);

    } catch (error: any) {
      const status = error?.status ?? 400;
      return res
        .status(status)
        .json({ error: error?.message ?? "Erro ao criar sala" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomsService.listRooms();
      return res.json(rooms);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao listar salas" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID da sala é obrigatório" });
      }

      const room = await roomsService.getRoomById(id);
      if (!room) return res.status(404).json({ error: "Sala não encontrada" });
      return res.json(room);

    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao buscar sala" });
    }
  }
}

export const roomsController = new RoomsController();
