import { Types } from "mongoose";

export interface IAccount {
  _id?: Types.ObjectId;
  user: Types.ObjectId;          
  balance: number;         
  transactions?: Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetAccount {
  _id: Types.ObjectId;
  balance: number;    
}
