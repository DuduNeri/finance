import { ObjectId } from "mongoose";

export interface IAccount {
  _id?: ObjectId;
  user: ObjectId;           // dono da conta
  balance: number;          // saldo atual
  transactions?: ObjectId[]; // referência a transações futuras
  createdAt?: Date;
  updatedAt?: Date;
}
