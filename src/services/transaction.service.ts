import { AppError } from "../errors/app.errors.js";
import { ITransactionInput } from "../interfaces/transaction.interface.js";
import accountModel from "../models/account.model.js";
import transactionModel from "../models/transaction.model.js";
import { Types } from "mongoose";

export class TransactionServices {
  async newTransaction(data: ITransactionInput) {
    if (data.amount <= 0) {
      throw new AppError(400, "O valor da transação deve ser maior que zero");
    }

    const account = await accountModel.findById(data.accountId);
    if (!account) {
      throw new AppError(404, "Conta não encontroda");
    }

    if (data.type === "WITHDRAW" && account.balance < data.amount) {
      throw new AppError(400, "Saldo insuficiente");
    }
    account.balance += data.type === "DEPOSIT" ? data.amount : -data.amount;

    const transaction = await transactionModel.create({
      account: account._id,
      type: data.type,
      amount: data.amount,
      description: data.description,
    });

    account.transactions.push(transaction._id);
    await account.save();

    return {
      message: "Transação concluída",
      transaction,
      newBalance: account.balance,
    };
  }



async  getAccountById(accountId: string) {
  const account = await accountModel
    .findById(accountId)
    .populate<{ name: string }>("user", "name") // aqui diz pro TS que user terá name
    .lean();

  if (!account) {
    throw new AppError(400, "Conta não encontrada");
  }

  return {
    name: account.user.toJSON,
    balance: account.balance,
  };
}

}
