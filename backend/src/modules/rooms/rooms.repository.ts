import { prisma } from "../../prisma/prisma.service.js";

export class RoomsRepository {
  async create(data: { name: string; ownerId?: string; userId?: string }) {
    return prisma.room.create({
      data: {
        name: data.name,
        ownerId: data.ownerId ?? null,
        userId: data.userId ?? null,
      },
    });
  }

  async findAll() {
    return prisma.room.findMany({
      orderBy: { createdAtUTC: "desc" },
    });
  }

  async findById(roomId: string) {
    return prisma.room.findUnique({
      where: { id: roomId },
    });
  }
}

export const roomsRepository = new RoomsRepository();
