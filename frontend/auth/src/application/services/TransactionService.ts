import { GetTransactionsUseCase } from "../../domain/use-cases/transactions/GetTransactionsUseCase";
import { CreateTransactionUseCase } from "../../domain/use-cases/transactions/CreateTransactionUseCase";
import { DeleteTransactionUseCase } from "../../domain/use-cases/transactions/DeleteTransactionUseCase";
import {
  ITransactionRepository,
  IPaginatedResponse,
} from "../../domain/repositories/TransactionRepository";
import {
  ITransaction,
  ICreateTransactionData,
  IUpdateTransactionData,
  ITransactionFilters,
  ITransactionSummary,
} from "../../domain/entities/Transaction";

export class TransactionService {
  private getTransactionsUseCase: GetTransactionsUseCase;
  private createTransactionUseCase: CreateTransactionUseCase;
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  constructor(private transactionRepository: ITransactionRepository) {
    this.getTransactionsUseCase = new GetTransactionsUseCase(
      transactionRepository
    );
    this.createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository
    );
    this.deleteTransactionUseCase = new DeleteTransactionUseCase(
      transactionRepository
    );
  }

  async getTransactions(
    filters?: ITransactionFilters
  ): Promise<IPaginatedResponse<ITransaction>> {
    return this.getTransactionsUseCase.execute(filters);
  }

  async getTransactionById(id: string): Promise<ITransaction> {
    return this.transactionRepository.getTransactionById(id);
  }

  async createTransaction(data: ICreateTransactionData): Promise<ITransaction> {
    return this.createTransactionUseCase.execute(data);
  }

  async updateTransaction(
    id: string,
    data: IUpdateTransactionData
  ): Promise<ITransaction> {
    return this.transactionRepository.updateTransaction(id, data);
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.deleteTransactionUseCase.execute(id);
  }

  async getTransactionSummary(period?: string): Promise<ITransactionSummary> {
    return this.transactionRepository.getTransactionSummary(period);
  }
}
