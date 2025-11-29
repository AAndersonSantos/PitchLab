// src/prisma/prisma.service.ts
import { PrismaClient } from "../generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prismaClient = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV !== "production"
    ? ["query", "info", "warn", "error"]
    : ["error"],
})

const globalForPrisma = global as unknown as {
  prisma: typeof prismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}