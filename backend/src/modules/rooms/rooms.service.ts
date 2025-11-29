// src/modules/rooms/rooms.service.ts
import { roomsRepository } from "./rooms.repository.js";

export class RoomsService {
  
  async createRoom(payload: { name?: unknown; ownerId?: unknown; userId?: unknown }) {
    const name = String(payload.name ?? "").trim();

    if (!name){ 
        const err = new Error("Nome da sala é obrigatório.");
        (err as any).status = 400;
      throw err;
    }

    const roomPayload: { name: string; ownerId?: string; userId?: string } = { name };
    if (payload.ownerId !== undefined) roomPayload.ownerId = String(payload.ownerId);
    if (payload.userId !== undefined) roomPayload.userId = String(payload.userId);

    return await roomsRepository.create(roomPayload);
  }

  async listRooms() {
    return roomsRepository.findAll();
  }

  async getRoomById(id: string) {
    return roomsRepository.findById(id);
  }
}

export const roomsService = new RoomsService();
