import type { ITransactionInput } from "../interfaces/transaction.interface.js";
import { TransactionServices } from "../services/transaction.service.js";

const transactionService = new TransactionServices()

export class TransactionController {
  async transaction(data: ITransactionInput){
     const transact = await transactionService.newTransaction(data)
     return transact;
  }
}