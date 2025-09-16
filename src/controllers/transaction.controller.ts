import type { ITransactionInput } from "../interfaces/transaction.interface.js";
import { TransactionServices } from "../services/transaction.service.js";

export class TransactionController {
  private transact : TransactionServices;

  constructor(){
    this.transact = new TransactionServices
  }
  async transaction(data: ITransactionInput){
     const transact = await this.transact.newTransaction(data)
     return transact;
  }

  async getAccount(accountId: string){
     return this.transact.getAccountById(accountId)
  }
}