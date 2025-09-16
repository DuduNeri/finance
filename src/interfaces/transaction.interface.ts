
export interface ITransactionInput {
  account: string;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  description?: string;
}