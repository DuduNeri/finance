import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("Usuário não encontrado");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Senha incorreta");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    };
  }
  async ProductByUser(userId: string) {
    const products = await userModel.findById(userId).populate("products");
    if (!products) throw new Error("Produtos não encontrados para este usuário");
    return products;
  }
}