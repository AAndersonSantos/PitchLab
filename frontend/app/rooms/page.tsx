"use client";

import { useState, useEffect } from "react";
import { apiListRooms, apiCreateRoom, Room } from "../../lib/rooms/api";
import { useRouter } from "next/navigation";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [name, setName] = useState("");
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
     if (!token) {
      router.replace("/auth/login");
      return;
    }

    async function fetchRooms() {
      try {
        const data = await apiListRooms(token!);
        setRooms(data);

      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        router.replace("/auth/login");
      }
    }

    fetchRooms();
  }, [token, router]);

  async function handleCreateRoom() {
    if (!name.trim() || !token) return;

    try {
      await apiCreateRoom(name.trim(), token);
      setName("");
      const data = await apiListRooms(token);
      setRooms(data);
    } catch (err) {
      alert("Erro ao criar sala");
    }
  }

  if (token === null) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  if (!token) {
    return null;
  }

  return (
  <div className="min-h-screen relative p-8 pb-24"> 
    <h1 className="text-4xl font-bold text-center mb-10 text-white">Suas Salas</h1>

    <div className="flex gap-4 mb-12 max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Nome da nova sala"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
        className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        onClick={handleCreateRoom}
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Criar Sala
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {rooms.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-xl py-20">
          Nenhuma sala ainda. Crie a primeira!
        </p>
      ) : (
        rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{room.name}</h3>
            <p className="text-gray-600 mb-6">
              Dono: <span className="font-medium">{room.owner?.name || "Anônimo"}</span>
            </p>
            <button
              onClick={() => router.push(`/rooms/${room.id}`)}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Entrar na Sala
            </button>
          </div>
        ))
      )}
    </div>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-red-600 text-white font-semibold rounded-full shadow-2xl hover:bg-red-700 hover:scale-105 transition-all duration-300"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Sair
    </button>
  </div>
);

}