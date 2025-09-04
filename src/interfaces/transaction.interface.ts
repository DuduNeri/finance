
export interface ITransactionInput {
  accountId: string;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  description?: string;
}