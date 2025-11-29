const API_URL = "http://localhost:3333";

export type User = {
  id: string;
  name: string;
  email: string | null;
  createdAtUTC: string;
  updatedAtUTC: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password_hash: string;
};

export type LoginPayload = {
  email: string;
  password_hash: string;
};

export async function apiRegister(payload: RegisterPayload): Promise<User> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Falha ao registrar");
  return res.json();
}

export async function apiLogin(payload:  LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Falha ao fazer login");
  return res.json();
}
