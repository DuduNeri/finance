import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { authMiddleawre } from "../middlewares/authentication.js";
import userModel from '../models/user.model.js';
import { AppError } from '../errors/app.errors.js';

export class AuthService {
  async login(id: string, email: string, password: string){
     const user = await userModel.findOne({email})
     if(!user){
       throw new AppError(404, "Usuário não encontrado")
     }
     const validPassword = await bcrypt.compare(password, user.password);
     if(!validPassword){
      throw new AppError(404, "Email ou senha incorretas")
     }
     const token = jwt.sign (
      {id: user.id, email: user.email},
      process.env.JWT_SECRET || "secret",
      { expiresIn: "5h"}
     )
     return {
      token, 
      user: { id: user.id , name: user.name, email: user.email}
     }
  }
}