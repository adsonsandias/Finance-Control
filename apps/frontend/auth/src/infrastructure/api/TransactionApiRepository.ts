import {
  ITransactionRepository,
  IPaginatedResponse,
} from '../../domain/repositories/TransactionRepository'
import {
  ITransaction,
  ICreateTransactionData,
  IUpdateTransactionData,
  ITransactionFilters,
  ITransactionSummary,
} from '../../domain/entities/Transaction'
import { ApiClient } from './ApiClient'

export class TransactionApiRepository implements ITransactionRepository {
  constructor(private apiClient: ApiClient) {}

  async getTransactions(filters?: ITransactionFilters): Promise<IPaginatedResponse<ITransaction>> {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const response = await this.apiClient.get<any>(endpoint)

    return {
      data: response.data.map(this.mapTransactionFromApi),
      pagination: response.pagination,
    }
  }

  async getTransactionById(id: string): Promise<ITransaction> {
    const response = await this.apiClient.get<any>(`/transactions/${id}`)
    return this.mapTransactionFromApi(response)
  }

  async createTransaction(data: ICreateTransactionData): Promise<ITransaction> {
    const response = await this.apiClient.post<any>('/transactions', {
      title: data.title,
      type: data.type,
      category: data.category,
      amount: data.amount,
    })
    return this.mapTransactionFromApi(response)
  }

  async updateTransaction(id: string, data: IUpdateTransactionData): Promise<ITransaction> {
    const response = await this.apiClient.put<any>(`/transactions/${id}`, data)
    return this.mapTransactionFromApi(response)
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.apiClient.delete(`/transactions/${id}`)
  }

  async getTransactionSummary(period?: string): Promise<ITransactionSummary> {
    const endpoint = `/transactions/stats${period ? `?period=${period}` : ''}`
    const response = await this.apiClient.get<any>(endpoint)

    return {
      totalIncome: response.total_income || 0,
      totalExpense: response.total_expense || 0,
      balance: response.balance || 0,
      transactionCount: response.transaction_count || 0,
      period: response.period,
    }
  }

  private mapTransactionFromApi(apiTransaction: any): ITransaction {
    return {
      id: apiTransaction.id,
      userId: apiTransaction.user_id,
      title: apiTransaction.title,
      type: apiTransaction.type,
      category: apiTransaction.category,
      amount: apiTransaction.amount,
      createdAt: apiTransaction.created_at,
      updatedAt: apiTransaction.updated_at,
    }
  }
}
