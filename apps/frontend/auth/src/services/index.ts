import { AuthService } from '../application/services/AuthService'
import { TransactionService } from '../application/services/TransactionService'
import { dependencyContainer } from '../utils/DependencyContainer'
import { HttpClient } from '../infrastructure/api/HttpClient'
import { AuthRepositoryImpl } from '../infrastructure/api/AuthRepository'
import { TransactionApiRepository } from '../infrastructure/api/TransactionApiRepository'

// Inicializar serviços com implementações reais de API
export function initializeServices() {
  // Criar cliente HTTP com URL base do ambiente
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001'
  const httpClient = new HttpClient(baseURL)

  // Criar implementações reais de repositório
  const authRepository = new AuthRepositoryImpl(httpClient)
  const transactionRepository = new TransactionApiRepository(httpClient)

  // Criar serviços com repositórios reais
  const authService = new AuthService(authRepository)
  const transactionService = new TransactionService(transactionRepository)

  // Registrar serviços no contêiner de dependências
  dependencyContainer.setAuthService(authService)
  dependencyContainer.setTransactionService(transactionService)
}

// Exportar para uso em outras partes da aplicação
export { dependencyContainer }
