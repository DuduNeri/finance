import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AppError } from "../errors/app.errors.js";
import { Request, Response } from "express";

const loginRoute = Router();
const authController = new AuthController();

loginRoute.post("/", 
  async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" })
    }
    const data = await authController.signIn(name, email, password);
    return res.json(data);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
})

export default loginRoute;