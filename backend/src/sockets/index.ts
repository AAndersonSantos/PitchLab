import { Server as IOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { MessagesService } from "../modules/messages/messages.service.js";

let io: IOServer;

const messageService = new MessagesService();

export function initSocket(server: HTTPServer) {
  io = new IOServer(server, {
    cors: {
      origin: "*",
    },
  });

  console.log("🔥 Socket.io inicializado!");

  io.on("connection", (socket: Socket) => {
    console.log(`🟢 Novo cliente conectado: ${socket.id}`);

    // Evento de entrar na sala
    socket.on("room:join", (roomId: string) => {
      socket.join(roomId);
      console.log(`📌 Socket ${socket.id} entrou na sala ${roomId}`);

      // Notificar os outros da sala que um novo usuário chegou
      /*socket.to(roomId).emit("room:join", {
        socketId: socket.id,
        roomId,
      });*/

      socket.on("message:send", async ({ roomId, userId, content }) => {
      try {
        const newMessage = await messageService.create({
          roomId,
          userId,
          content,
        });

        io.to(roomId).emit("message:new", newMessage);
      } catch (err) {
        console.error(err);
        const errorMessage = typeof err === "object" && err !== null && "message" in err
          ? (err as { message: string }).message
          : "Unknown error";
        socket.emit("message:error", errorMessage);
      }
    });


    });

    socket.on("disconnect", () => {
      console.log(`🔴 Cliente desconectado: ${socket.id}`);
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
