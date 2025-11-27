import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.APP_ORIGIN || "*",
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Cliente conectado:", socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`🚀 API rodando na porta http://localhost:${PORT}`);
});
