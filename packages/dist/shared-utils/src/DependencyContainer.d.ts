/**
 * Simplified DependencyContainer for shared module
 * This is a placeholder implementation that will be extended by each frontend module
 */
export declare class DependencyContainer {
    private static instance;
    private _authService;
    private _transactionService;
    private constructor();
    static getInstance(): DependencyContainer;
    setAuthService(service: any): void;
    setTransactionService(service: any): void;
    get authService(): any;
    get transactionService(): any;
}
export declare const dependencyContainer: DependencyContainer;
