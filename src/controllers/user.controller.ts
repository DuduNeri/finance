import { UserService } from "../services/user.service.js";
import { IUser } from "../interfaces/user.interface.js";

const userService = new UserService();

export class UserController{
  async create(data: IUser){
    const user = await userService.create(data);
    return user;
  }

  async getUserById(id: string){
    const user = await userService.getUserById(id);
    return user;
  }
}