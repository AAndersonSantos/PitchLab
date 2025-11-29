import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password_hash } = req.body;

      const result = await service.register({
        name,
        email,
        password_hash,
      });

      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password_hash } = req.body;

      const result = await service.login({
        email,
        password_hash,
      });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
