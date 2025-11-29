import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: { name: string; email: string; password_hash: string }) {
    const { name, email, password_hash } = data;

    if (!name) throw new Error("Nome é obrigatório.");
    if (!email) throw new Error("Email é obrigatório.");
    if (!password_hash) throw new Error("Senha é obrigatória.");

    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new Error("Email já está em uso.");
    }

    const passwordHash = await bcrypt.hash(password_hash, 10);

    const user = await this.repository.createUser({
      name,
      email,
      passwordHash,
    });

    return {
      user,
    };
  }

  async login(data: { email: string; password_hash: string }) {
    const { email, password_hash } = data;

    if (!email) throw new Error("Email é obrigatório.");
    if (!password_hash) throw new Error("Senha é obrigatória.");

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    const isValidPassword = await bcrypt.compare(password_hash, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("Credenciais inválidas.");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      user,
      token,
    };
  }
}
