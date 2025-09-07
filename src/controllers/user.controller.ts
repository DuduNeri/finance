import { UserService } from "../services/user.service.js";
import { IUser, type IUserResponse } from "../interfaces/user.interface.js";

const userService = new UserService();

export class UserController {
  async create(data: IUser) {
    const user = await userService.create(data);
    return user;
  }

  async getUser(id: string) {
    const user = await userService.getUserById(id);
    return user;
  }

  async delete(id: string) {
    return userService.deleteUser(id)
  }

  async getAll(requestingUser: IUser): Promise<IUserResponse[]>{
    const users = await userService.getAllUsers(requestingUser);
    return users;
  }
  async update(id: string, userData: IUser) {
    return userService.update(id, userData);
  }
}