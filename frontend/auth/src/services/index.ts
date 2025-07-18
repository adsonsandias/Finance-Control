import { dependencyContainer } from '@shared/utils/DependencyContainer';
import { AuthService } from '../application/services/AuthService';
import { TransactionService } from '../application/services/TransactionService';
import { AuthRepository, SignUpData, SignInData, AuthResponse } from '../domain/repositories/AuthRepository';
import { ITransactionRepository, IPaginatedResponse } from '../domain/repositories/TransactionRepository';
import { User } from '../domain/entities/User';
import { ITransaction, ICreateTransactionData, IUpdateTransactionData, ITransactionFilters, ITransactionSummary, TransactionType } from '../domain/entities/Transaction';

// Mock implementation of AuthRepository
class MockAuthRepository implements AuthRepository {
  private currentUser: User | null = null;
  private token: string | null = null;

  async signUp(data: SignUpData): Promise<AuthResponse> {
    console.log('Mock signUp:', data);
    const user: User = {
      id: '1',
      email: data.email,
      displayName: data.email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    this.currentUser = user;
    this.token = 'mock-token-' + Date.now();
    return { user, token: this.token };
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    console.log('Mock signIn:', data);
    const user: User = {
      id: '1',
      email: data.email,
      displayName: data.email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    this.currentUser = user;
    this.token = 'mock-token-' + Date.now();
    return { user, token: this.token };
  }

  async signOut(): Promise<void> {
    console.log('Mock signOut');
    this.currentUser = null;
    this.token = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async refreshToken(): Promise<string> {
    this.token = 'mock-refreshed-token-' + Date.now();
    return this.token;
  }

  async isAuthenticated(): Promise<boolean> {
    return this.token !== null;
  }

  async getToken(): Promise<string | null> {
    return this.token;
  }

  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
    return {
      isAuthenticated: this.token !== null,
      user: this.currentUser || undefined
    };
  }
}

// Mock implementation of TransactionRepository
class MockTransactionRepository implements ITransactionRepository {
  private transactions: ITransaction[] = [
    {
      id: '1',
      userId: '1',
      title: 'Mock Transaction 1',
      amount: 100,
      type: TransactionType.INCOME,
      category: 'salary',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      userId: '1',
      title: 'Mock Transaction 2',
      amount: 50,
      type: TransactionType.EXPENSE,
      category: 'food',
      createdAt: new Date().toISOString()
    }
  ];

  async getTransactions(filters?: ITransactionFilters): Promise<IPaginatedResponse<ITransaction>> {
    console.log('Mock getTransactions:', filters);
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    let filteredTransactions = this.transactions;
    
    if (filters?.type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
    }
    
    if (filters?.category) {
      filteredTransactions = filteredTransactions.filter(t => t.category === filters.category);
    }
    
    const paginatedData = filteredTransactions.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / limit)
      }
    };
  }

  async getTransactionById(id: string): Promise<ITransaction> {
    console.log('Mock getTransactionById:', id);
    const transaction = this.transactions.find(t => t.id === id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async createTransaction(data: ICreateTransactionData): Promise<ITransaction> {
    console.log('Mock createTransaction:', data);
    const newTransaction: ITransaction = {
      id: Date.now().toString(),
      userId: '1',
      title: data.title,
      amount: data.amount,
      type: data.type,
      category: data.category,
      createdAt: new Date().toISOString()
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async updateTransaction(id: string, data: IUpdateTransactionData): Promise<ITransaction> {
    console.log('Mock updateTransaction:', { id, data });
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    
    this.transactions[index] = {
      ...this.transactions[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return this.transactions[index];
  }

  async deleteTransaction(id: string): Promise<void> {
    console.log('Mock deleteTransaction:', id);
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      this.transactions.splice(index, 1);
    }
  }

  async getTransactionSummary(period?: string): Promise<ITransactionSummary> {
    console.log('Mock getTransactionSummary:', period);
    const totalIncome = this.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = this.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: this.transactions.length,
      period
    };
  }
}

// Initialize services
export function initializeServices() {
  const mockAuthRepository = new MockAuthRepository();
  const mockTransactionRepository = new MockTransactionRepository();
  
  const authService = new AuthService(mockAuthRepository);
  const transactionService = new TransactionService(mockTransactionRepository);
  
  dependencyContainer.setAuthService(authService);
  dependencyContainer.setTransactionService(transactionService);
}

// Export for use in other parts of the application
export { dependencyContainer };