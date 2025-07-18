// Simplified DependencyContainer for shared module
// This is a placeholder implementation that will be extended by each frontend module

export class DependencyContainer {
  private static instance: DependencyContainer;
  private _authService: any = null;
  private _transactionService: any = null;

  private constructor() {}

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  // Setters for dependency injection
  setAuthService(service: any): void {
    this._authService = service;
  }

  setTransactionService(service: any): void {
    this._transactionService = service;
  }

  // Getters
  get authService(): any {
    if (!this._authService) {
      throw new Error('AuthService not initialized. Please call setAuthService() first.');
    }
    return this._authService;
  }

  get transactionService(): any {
    if (!this._transactionService) {
      throw new Error('TransactionService not initialized. Please call setTransactionService() first.');
    }
    return this._transactionService;
  }
}

export const dependencyContainer = DependencyContainer.getInstance();
