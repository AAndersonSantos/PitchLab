// src/messages/messages.service.ts
import { MessagesRepository } from "./messages.repository.js";

export class MessagesService {
  private repository = new MessagesRepository();

  async create(data: {
    roomId: string;
    userId?: string | null;
    content: string;
    role?: "USER" | "ASSISTANT";
  }) {
    if (!data.roomId) throw new Error("roomId é obrigatório");
    if (!data.content || data.content.trim() === "") {
      throw new Error("content não pode ser vazio");
    }

    return this.repository.createMessage({
      ...data,
      role: data.role ?? "USER",
    });
  }

  async findByRoom(roomId: string, limit?: number, cursor?: string) {
    return this.repository.getMessagesByRoom(roomId, limit, cursor);
  }
}
