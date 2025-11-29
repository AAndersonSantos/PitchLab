const API_URL = "http://localhost:3333";

export type Room = {
  id: string;
  name: string;
  ownerId: string;
  owner?: {
    id: string;
    email: string;
    name?: string;
  };
};

export async function apiCreateRoom( name: string, token: string ): Promise<Room> {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const ownerId = payload.id;

  const res = await fetch(`${API_URL}/rooms`, {method: "POST", headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, ownerId }),
  });

  if (!res.ok) throw new Error("Erro ao criar sala");
  return res.json();
}

export async function apiListRooms(token: string): Promise<Room[]> {
  const res = await fetch(`${API_URL}/rooms`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao listar salas");
  return res.json();
}
