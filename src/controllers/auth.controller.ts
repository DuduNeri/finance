import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
  async signIn(name: string, email: string, password: string){
     const loginResult  = await authService.login(name, email, password)
     return loginResult ;
  }
}