const db = require('../../config/database');

// Domain
const User = require('../domain/entities/User');
const Transaction = require('../domain/entities/Transaction');

// Infrastructure
const PostgresUserRepository = require('../infrastructure/repositories/PostgresUserRepository');
const PostgresTransactionRepository = require('../infrastructure/repositories/PostgresTransactionRepository');

// Application
const TokenService = require('../application/services/TokenService');
const SignUpUseCase = require('../application/use-cases/auth/SignUpUseCase');
const SignInUseCase = require('../application/use-cases/auth/SignInUseCase');
const CreateTransactionUseCase = require('../application/use-cases/transactions/CreateTransactionUseCase');
const GetTransactionsUseCase = require('../application/use-cases/transactions/GetTransactionsUseCase');

// Presentation
const AuthController = require('../presentation/controllers/AuthController');
const TransactionController = require('../presentation/controllers/TransactionController');
const AuthMiddleware = require('../presentation/middleware/AuthMiddleware');

/**
 * Dependency Injection Container
 * Manages all application dependencies and their lifecycle
 */
class DependencyContainer {
  constructor() {
    this._instances = new Map();
    this._setupDependencies();
  }

  _setupDependencies() {
    // Infrastructure Layer
    this._instances.set('userRepository', new PostgresUserRepository(db));
    this._instances.set('transactionRepository', new PostgresTransactionRepository(db));

    // Application Layer - Services
    this._instances.set('tokenService', new TokenService());

    // Application Layer - Use Cases
    this._instances.set('signUpUseCase', new SignUpUseCase(
      this.get('userRepository'),
      this.get('tokenService')
    ));

    this._instances.set('signInUseCase', new SignInUseCase(
      this.get('userRepository'),
      this.get('tokenService')
    ));

    this._instances.set('createTransactionUseCase', new CreateTransactionUseCase(
      this.get('transactionRepository')
    ));

    this._instances.set('getTransactionsUseCase', new GetTransactionsUseCase(
      this.get('transactionRepository')
    ));

    // Presentation Layer - Controllers
    this._instances.set('authController', new AuthController(
      this.get('signUpUseCase'),
      this.get('signInUseCase'),
      this.get('userRepository'),
      this.get('tokenService')
    ));

    this._instances.set('transactionController', new TransactionController(
      this.get('createTransactionUseCase'),
      this.get('getTransactionsUseCase'),
      this.get('transactionRepository')
    ));

    // Presentation Layer - Middleware
    this._instances.set('authMiddleware', new AuthMiddleware(
      this.get('tokenService'),
      this.get('userRepository')
    ));
  }

  /**
   * Get a dependency instance
   * @param {string} name - The dependency name
   * @returns {*} The dependency instance
   */
  get(name) {
    const instance = this._instances.get(name);
    if (!instance) {
      throw new Error(`Dependency '${name}' not found`);
    }
    return instance;
  }

  /**
   * Check if a dependency exists
   * @param {string} name - The dependency name
   * @returns {boolean}
   */
  has(name) {
    return this._instances.has(name);
  }

  /**
   * Get all available dependency names
   * @returns {string[]}
   */
  getAvailableDependencies() {
    return Array.from(this._instances.keys());
  }
}

// Export singleton instance
module.exports = new DependencyContainer();