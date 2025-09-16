import { AppError } from "../errors/app.errors.js";
import { IUser, IUserResponse } from "../interfaces/user.interface.js";
import accountModel from "../models/account.model.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export class UserService {
  async create(data: IUser): Promise<IUserResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new AppError(400, "Nome, email e senha são obrigatórios");
    }

    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError(409, "Este email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 1 cria usuário sem account ainda
    const newUser = new userModel({
      ...data,
      password: hashedPassword,
    });
    await newUser.save();

    // 2️ cria a conta vinculada ao usuário
    const account = await accountModel.create({ user: newUser._id });

    // 3️ atualiza o usuário com o id da conta
    newUser.account = account._id;
    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword satisfies IUserResponse;
  }

  async getUserById(id: string): Promise<IUserResponse> {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async getAllUsers(data: IUser): Promise<IUserResponse[]> {
    console.log(data);
    if ((data.role ?? "").toLowerCase() !== "super_user") {
      throw new AppError(403, "Unauthorized");
    }

    const users = await userModel.find().select("-password");
    if (!users || users.length === 0) {
      throw new Error("Nenhum usuário encontrado");
    }
    return users;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }
  }

  async update(id: string, data: IUser): Promise<IUserResponse> {
    const updateUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateUser) {
      throw new Error("Usuário não encontrado");
    }
    return updateUser;
  }
}
