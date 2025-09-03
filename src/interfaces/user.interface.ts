import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;           
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  account?: ObjectId;
  role: "user" | "super_user";
}

export interface IUserResponse {
   name: string;
   email: string;
   password?: string;
   createdAt: Date;
   updatedAt: Date;
}