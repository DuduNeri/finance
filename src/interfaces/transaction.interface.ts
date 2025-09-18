
export interface ITransactionInput {
  accountId: string;
  type: "DEPOSIT" | "WITHDRAW";
  balance: number;
  amount: number;
  description?: string;
}

