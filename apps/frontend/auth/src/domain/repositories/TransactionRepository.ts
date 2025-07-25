import {
  ITransaction,
  ICreateTransactionData,
  IUpdateTransactionData,
  ITransactionFilters,
  ITransactionSummary,
} from '../entities/Transaction'

export interface IPaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ITransactionRepository {
  getTransactions(filters?: ITransactionFilters): Promise<IPaginatedResponse<ITransaction>>
  getTransactionById(id: string): Promise<ITransaction>
  createTransaction(data: ICreateTransactionData): Promise<ITransaction>
  updateTransaction(id: string, data: IUpdateTransactionData): Promise<ITransaction>
  deleteTransaction(id: string): Promise<void>
  getTransactionSummary(period?: string): Promise<ITransactionSummary>
}
