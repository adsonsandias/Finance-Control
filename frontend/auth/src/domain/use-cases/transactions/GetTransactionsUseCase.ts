import {
  ITransactionRepository,
  IPaginatedResponse,
} from "../../repositories/TransactionRepository";
import { ITransaction, ITransactionFilters } from "../../entities/Transaction";

export class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    filters?: ITransactionFilters
  ): Promise<IPaginatedResponse<ITransaction>> {
    // Validações e valores padrão
    const validatedFilters: ITransactionFilters = {
      page: filters?.page && filters.page > 0 ? filters.page : 1,
      limit:
        filters?.limit && filters.limit > 0 && filters.limit <= 100
          ? filters.limit
          : 10,
      type: filters?.type,
      category: filters?.category,
      startDate: filters?.startDate,
      endDate: filters?.endDate,
    };

    return this.transactionRepository.getTransactions(validatedFilters);
  }
}
