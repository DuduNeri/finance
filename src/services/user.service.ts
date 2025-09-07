import { AppError } from "../errors/app.errors.js";
import type { ITransactionInput } from "../interfaces/transaction.interface.js";
import { IUser, IUserResponse, } from "../interfaces/user.interface.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export class UserService {
  //Função de criar usuário
  async create(data: IUser): Promise<IUserResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new AppError(400, "Nome, email, e senha são obrigatórios");
    }
    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError(409, "Este email já está em uso");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new userModel({
      ...data,
      password: hashedPassword
    });
    await newUser.save();
    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword satisfies IUserResponse;
  }
  //Função de pegar usuário pelo id
  async getUserById(id: string): Promise<IUserResponse> {
    const user = await userModel.findById(id).select('-password');
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
  //Função para pegar todos os usuários
  async getAllUsers(data: IUser): Promise<IUserResponse[]> {
    console.log(data)
    if ((data.role ?? "").toLowerCase() !== "super_user") {
      throw new AppError(403, "Unauthorized");
    }

    const users = await userModel.find().select('-password');
    if (!users || users.length === 0) {
      throw new Error("Nenhum usuário encontrado");
    }
    return users;
  }
  //Função para deletar um usuário
  async deleteUser(id: string): Promise<void> {
    const user = await userModel.findByIdAndDelete(id)
    if (!user) {
      throw new AppError(404, "Usuário não encontrado")
    }
  }
  //Função para atualizar o 'name', 'amail' e 'password'
  async update(id: string, data: IUser): Promise<IUserResponse> {
    const updateUser = await userModel.findByIdAndUpdate(id, data, {
      new: true
    })
    if (!updateUser) {
      throw new Error("Usuário não encontrado");
    }
    return updateUser;
  }
}