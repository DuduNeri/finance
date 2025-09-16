import { UserService } from "../services/user.service.js";
import { IUser, type IUserResponse } from "../interfaces/user.interface.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(data: IUser) {
    return this.userService.create(data)
  }

  async getUser(id: string) {
    return this.userService.deleteUser(id)
  }

  async delete(id: string) {
    return this.userService.deleteUser(id);
  }

  async getAll(requestingUser: IUser): Promise<IUserResponse[]> {
    return this.userService.getAllUsers(requestingUser)
  }

  async update(id: string, userData: IUser) {
    return this.userService.update(id, userData);
  }
}
