import { Server as IOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { MessagesService } from "../modules/messages/messages.service.js";

let io: IOServer;

const messageService = new MessagesService();

export function initSocket(server: HTTPServer) {
  io = new IOServer(server, {
    cors: { origin: "*" },
  });

  console.log("Socket.io inicializado!");

  io.on("connection", (socket: Socket) => {
    console.log(`Novo cliente conectado: ${socket.id}`);

    socket.on("room:join", (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
    });

    socket.on("message:send", async ({ roomId, userId, content }) => {
      if (!roomId || !userId || !content?.trim()) {
        return socket.emit("message:error", "Dados inválidos");
      }

      console.log(`${userId} enviando mensagem na sala ${roomId}: ${content}`);

      try {
        const newMessage = await messageService.create({
          roomId,
          userId,
          content: content.trim(),
        });

        io.to(roomId).emit("message:new", newMessage);
        console.log(`Mensagem enviada na sala ${roomId}:`, content);
      } catch (err: any) {
        console.error("Erro ao salvar mensagem:", err);
        socket.emit("message:error", err.message || "Erro ao enviar");
      }
    });

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): IOServer {
  if (!io) {
    throw new Error("❌ Socket.io não foi inicializado! Chame initSocket() antes.");
  }
  return io;
}
