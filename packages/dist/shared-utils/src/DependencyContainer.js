/**
 * Simplified DependencyContainer for shared module
 * This is a placeholder implementation that will be extended by each frontend module
 */
var DependencyContainer = /** @class */ (function () {
    function DependencyContainer() {
        this._authService = null;
        this._transactionService = null;
    }
    DependencyContainer.getInstance = function () {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
    };
    // Setters for dependency injection
    DependencyContainer.prototype.setAuthService = function (service) {
        this._authService = service;
    };
    DependencyContainer.prototype.setTransactionService = function (service) {
        this._transactionService = service;
    };
    Object.defineProperty(DependencyContainer.prototype, "authService", {
        // Getters
        get: function () {
            if (!this._authService) {
                throw new Error('AuthService not initialized. Please call setAuthService() first.');
            }
            return this._authService;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DependencyContainer.prototype, "transactionService", {
        get: function () {
            if (!this._transactionService) {
                throw new Error('TransactionService not initialized. Please call setTransactionService() first.');
            }
            return this._transactionService;
        },
        enumerable: false,
        configurable: true
    });
    return DependencyContainer;
}());
export { DependencyContainer };
export var dependencyContainer = DependencyContainer.getInstance();
