import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "super_user";
  createdAt?: Date;
  updatedAt?: Date;
  account?: ObjectId;

}

export interface IUserResponse {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}