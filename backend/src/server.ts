import { app } from "./app.js";
import { createServer } from "http";
import dotenv from "dotenv";
import { initSocket } from "./sockets/index.js";

dotenv.config();

const PORT = process.env.PORT;

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 API rodando na porta http://localhost:${PORT}`);
});
