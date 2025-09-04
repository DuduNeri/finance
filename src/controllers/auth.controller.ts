import { ObjectId } from 'mongoose';
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
  async signIn(email: string, password: string){
     const loginResult  = await authService.login(email, password)
     return loginResult ;
  }
}