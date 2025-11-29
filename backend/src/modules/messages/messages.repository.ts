// src/messages/messages.repository.ts
import { prisma } from "../../prisma/prisma.service.js";

export class MessagesRepository {
  async createMessage(data: {
    roomId: string;
    userId?: string | null;
    content: string;
    role: "USER" | "ASSISTANT";
  }) {
    return prisma.message.create({
      data,
    });
  }

  async getMessagesByRoom(roomId: string, limit = 20, cursor?: string) {
    const options: any = {
      where: { roomId },
      take: limit,
      orderBy: { createdAtUTC: "asc" },
    };

    if (cursor) {
      options.skip = 1;
      options.cursor = { id: cursor };
    }

    return prisma.message.findMany(options);
  }

}
