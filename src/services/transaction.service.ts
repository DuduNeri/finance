import { AppError } from "../errors/app.errors.js";
import type { IGetAccount } from "../interfaces/account.interface.js";
import { ITransactionInput } from "../interfaces/transaction.interface.js";
import accountModel from "../models/account.model.js";
import transactionModel from "../models/transaction.model.js";

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

  async getAccountById(accountId: string): Promise<IGetAccount> {
    const account = await accountModel.findById(accountId);

    if (!account) {
      throw new AppError(404, "Conta não encontrada");
    }

    return {
      _id: account._id,
      balance: account.balance,
    };
  }
}
