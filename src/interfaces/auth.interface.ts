import { Request } from "express";

export interface JwtPayload {
  id: string;
  email: string;
  password: string
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}