import express from "express";
import cors from "cors";
import roomsRoutes from "./routes/rooms/rooms.routes.js";
import messagesRoutes from "./routes/messages/messages.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/rooms", roomsRoutes);
app.use("/messages", messagesRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
