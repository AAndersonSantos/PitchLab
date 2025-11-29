"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { socket } from "../../../lib/socket/socket";

type Message = {
  id?: string;
  text: string;
  sender: string;
  createdAt?: string;
  temp?: boolean;
};

type ApiMessage = {
  id: string;
  content: string;
  createdAtUTC: string;
  user: {
    name: string;
  } | null;
};

export default function ChatRoomPage() {
  const router = useRouter();
  const { id: roomId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadOldMessages() {
  const res = await fetch(`http://localhost:3333/messages/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  console.log("Mensagens antigas carregadas:", data);

  const formatted = data.map((msg: ApiMessage ) => ({
    id: msg.id,
    text: msg.content,
    sender: msg.user?.name ?? "Usuário",
    createdAt: msg.createdAtUTC,
  }));

  setMessages(formatted);
}

useEffect(() => {
  if (!roomId || !token) return;

  async function init() {
    await loadOldMessages();
    
    if (!socket.connected) socket.connect();

    socket.emit("room:join", roomId);

    socket.on("message:new", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          text: msg.content,
          sender: msg.user?.name ?? "Usuário",
          createdAt: msg.createdAtUTC,
        },
      ]);
    });
  }

  init();

  return () => {
    socket.off("message:new");
    socket.disconnect();
  };
}, [roomId, token]);

  function handleSend() {
    if (!input.trim() || !token || !userId) return;

    const text = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { text, sender: "Você", temp: true },
    ]);

    socket.emit("message:send", {
      roomId,
      userId,
      content: text,
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="p-4 shadow bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">💬 Sala {roomId}</h1>

        <button
          onClick={() => router.push("/rooms")}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition"
        >
          Sair
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Nenhuma mensagem ainda...
          </p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col max-w-[70%] ${
                m.sender === "Você" ? "ml-auto text-right" : "mr-auto"
              }`}
            >
              <span className="text-xs text-gray-600 mb-1">
                {m.sender}
              </span>

              <div
                className={`p-3 rounded-2xl shadow text-sm ${
                  m.sender === "Você"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {m.text}
              </div>

              {m.createdAt && (
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(m.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          ))
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 bg-white border-t flex gap-3">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 text-2xl text-black font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
