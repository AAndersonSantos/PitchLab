import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

export function authGuard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
