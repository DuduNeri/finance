import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthRequest, JwtPayload } from "../interfaces/auth.interface.js";

export async function authMiddleawre(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    if (!decoded || !decoded.id || !decoded.email) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user"
    };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
