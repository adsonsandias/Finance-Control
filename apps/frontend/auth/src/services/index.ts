import { AuthService } from '../application/services/AuthService'
import { TransactionService } from '../application/services/TransactionService'
import {
  ITransaction,
  ICreateTransactionData,
  IUpdateTransactionData,
  ITransactionFilters,
  ITransactionSummary,
  TransactionType,
} from '../domain/entities/Transaction'
import { User } from '../domain/entities/User'
import {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from '../domain/repositories/AuthRepository'
import {
  ITransactionRepository,
  IPaginatedResponse,
} from '../domain/repositories/TransactionRepository'
import { dependencyContainer } from '../utils/DependencyContainer'
import { ApiClient } from '../infrastructure/api/ApiClient'
import { AuthApiRepository } from '../infrastructure/api/AuthApiRepository'
import { TransactionApiRepository } from '../infrastructure/api/TransactionApiRepository'

// Initialize services with real API implementations
export function initializeServices() {
  // Create API client with base URL from environment variable
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001'
  const apiClient = new ApiClient(baseURL)

  // Create real repository implementations
  const authRepository = new AuthApiRepository(apiClient)
  const transactionRepository = new TransactionApiRepository(apiClient)

  // Create services with real repositories
  const authService = new AuthService(authRepository)
  const transactionService = new TransactionService(transactionRepository)

  // Register services in dependency container
  dependencyContainer.setAuthService(authService)
  dependencyContainer.setTransactionService(transactionService)
}

// Export for use in other parts of the application
export { dependencyContainer }
