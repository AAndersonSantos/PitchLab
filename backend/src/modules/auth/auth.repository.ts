import { prisma } from "../../prisma/prisma.service.js";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}
