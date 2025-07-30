import { useState, useEffect, useCallback } from 'react'

import {
  ITransaction,
  ICreateTransactionData,
  ITransactionFilters,
  ITransactionSummary,
} from '../../domain/entities/Transaction'
import { IPaginatedResponse } from '../../domain/repositories/TransactionRepository'
import { TransactionService } from '../services/TransactionService'

export interface IUseTransactionsReturn {
  transactions: ITransaction[]
  summary: ITransactionSummary | null
  pagination: IPaginatedResponse<ITransaction>['pagination'] | null
  isLoading: boolean
  error: string | null
  loadTransactions: (filters?: ITransactionFilters) => Promise<void>
  createTransaction: (data: ICreateTransactionData) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  loadSummary: (period?: string) => Promise<void>
  clearError: () => void
}

export function useTransactions(transactionService: TransactionService): IUseTransactionsReturn {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [summary, setSummary] = useState<ITransactionSummary | null>(null)
  const [pagination, setPagination] = useState<
    IPaginatedResponse<ITransaction>['pagination'] | null
  >(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const loadTransactions = useCallback(
    async (filters?: ITransactionFilters) => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await transactionService.getTransactions(filters)
        setTransactions(response.data)
        setPagination(response.pagination)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar transações')
        console.error('Erro ao carregar transações:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [transactionService]
  )

  const createTransaction = useCallback(
    async (data: ICreateTransactionData) => {
      try {
        setIsLoading(true)
        setError(null)
        await transactionService.createTransaction(data)
        // Recarregar transações após criar
        await loadTransactions()
      } catch (err: any) {
        setError(err.message || 'Erro ao criar transação')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [transactionService, loadTransactions]
  )

  const deleteTransaction = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true)
        setError(null)
        await transactionService.deleteTransaction(id)
        // Recarregar transações após deletar
        await loadTransactions()
      } catch (err: any) {
        setError(err.message || 'Erro ao deletar transação')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [transactionService, loadTransactions]
  )

  const loadSummary = useCallback(
    async (period?: string) => {
      try {
        setError(null)
        const summaryData = await transactionService.getTransactionSummary(period)
        setSummary(summaryData)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar resumo')
        console.error('Erro ao carregar resumo:', err)
      }
    },
    [transactionService]
  )

  // Carregar transações iniciais
  useEffect(() => {
    loadTransactions()
    loadSummary()
  }, [loadTransactions, loadSummary])

  return {
    transactions,
    summary,
    pagination,
    isLoading,
    error,
    loadTransactions,
    createTransaction,
    deleteTransaction,
    loadSummary,
    clearError,
  }
}
