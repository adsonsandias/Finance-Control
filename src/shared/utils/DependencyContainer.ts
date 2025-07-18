import { ApiClient } from "../../infrastructure/api/ApiClient";
import { Auth0ApiRepository } from "../../infrastructure/api/Auth0ApiRepository";
import { TransactionApiRepository } from "../../infrastructure/api/TransactionApiRepository";
import { AuthService } from "../../application/services/AuthService";
import { TransactionService } from "../../application/services/TransactionService";

export class DependencyContainer {
  private static instance: DependencyContainer;
  private apiClientInstance: ApiClient;
  private authRepositoryInstance: Auth0ApiRepository;
  private transactionRepositoryInstance: TransactionApiRepository;
  private authServiceInstance: AuthService;
  private transactionServiceInstance: TransactionService;

  private constructor() {
    const apiBaseUrl =
      process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    // Infrastructure layer
    this.apiClientInstance = new ApiClient(apiBaseUrl);
    this.authRepositoryInstance = new Auth0ApiRepository(
      this.apiClientInstance
    );
    this.transactionRepositoryInstance = new TransactionApiRepository(
      this.apiClientInstance
    );

    // Application layer
    this.authServiceInstance = new AuthService(this.authRepositoryInstance);
    this.transactionServiceInstance = new TransactionService(
      this.transactionRepositoryInstance
    );
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  get apiClient(): ApiClient {
    return this.apiClientInstance;
  }

  get authRepository(): Auth0ApiRepository {
    return this.authRepositoryInstance;
  }

  get transactionRepository(): TransactionApiRepository {
    return this.transactionRepositoryInstance;
  }

  get authService(): AuthService {
    return this.authServiceInstance;
  }

  get transactionService(): TransactionService {
    return this.transactionServiceInstance;
  }
}

export const dependencyContainer = DependencyContainer.getInstance();
