import { ObjectId } from "mongoose";

export interface IAccount {
  _id?: ObjectId;
  user: ObjectId;          
  balance: number;         
  transactions?: ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}
