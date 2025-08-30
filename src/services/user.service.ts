import { AppError } from "../errors/app.errors.js";
import { IUser, IUserResponse, } from "../interfaces/user.interface.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export class UserService {
  async create(data: IUser){
    if (!data.name || !data.email || !data.password) {
      throw new Error("Nome, email, e senha são obrigatórios");
    }

    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new userModel({
      ...data,
      password: hashedPassword
    });

    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  }
}