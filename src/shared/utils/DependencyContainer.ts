import { ApiClient } from "../../infrastructure/api/ApiClient";
import { AuthApiRepository } from "../../infrastructure/api/AuthApiRepository";
import { SupabaseApiRepository } from "../../infrastructure/api/SupabaseApiRepository";
import { TransactionApiRepository } from "../../infrastructure/api/TransactionApiRepository";
import { AuthService } from "../../application/services/AuthService";
import { TransactionService } from "../../application/services/TransactionService";

export class DependencyContainer {
  private static instance: DependencyContainer;
  private apiClientInstance: ApiClient;
  private authRepositoryInstance: AuthApiRepository;
  private supabaseRepositoryInstance: SupabaseApiRepository;
  private transactionRepositoryInstance: TransactionApiRepository;
  private authServiceInstance: AuthService;
  private transactionServiceInstance: TransactionService;

  private constructor() {
    // Infrastructure layer
    this.apiClientInstance = new ApiClient(
      process.env.REACT_APP_API_URL || "http://localhost:3001/api"
    );
    this.authRepositoryInstance = new AuthApiRepository(this.apiClientInstance);
    this.supabaseRepositoryInstance = new SupabaseApiRepository();
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

  get authRepository(): AuthApiRepository {
    return this.authRepositoryInstance;
  }

  get supabaseRepository(): SupabaseApiRepository {
    return this.supabaseRepositoryInstance;
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
