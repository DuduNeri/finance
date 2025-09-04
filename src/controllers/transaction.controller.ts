import type { ITransactionInput } from "../interfaces/transaction.interface.js";
import { TransactionServices } from "../services/transaction.service.js";

const transactionService = new TransactionServices()

export class TransactionController {
  async transaction(data: ITransactionInput){
     const newTransaction = await transactionService.newTransaction(data)
     return newTransaction;
  }
}