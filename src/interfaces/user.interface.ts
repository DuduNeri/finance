import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "super_user";
  account: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserResponse {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}