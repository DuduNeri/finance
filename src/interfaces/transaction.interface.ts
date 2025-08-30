import { Types } from "mongoose";

export interface ITransaction {
  _id?: Types.ObjectId;
  account: Types.ObjectId;      // conta relacionada
  type: "credit" | "debit";
  amount: number;
  description?: string;
  createdAt?: Date;
}
