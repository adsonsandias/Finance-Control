export interface ITransaction {
  id: string;
  userId: string;
  title: string;
  type: TransactionType;
  category: string;
  amount: number;
  createdAt: string;
  updatedAt?: string;
}

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface ICreateTransactionData {
  title: string;
  type: TransactionType;
  category: string;
  amount: number;
}

export interface IUpdateTransactionData {
  title?: string;
  type?: TransactionType;
  category?: string;
  amount?: number;
}

export interface ITransactionFilters {
  page?: number;
  limit?: number;
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface ITransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  period?: string;
}
