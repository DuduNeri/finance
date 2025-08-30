import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;           // ID do Mongo
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  account?: ObjectId;       // referência à conta
}

export interface IUserResponse {
   name: string;
   email: string;
   password?: string;
   createdAt: Date;
   updatedAt: Date;
  
}