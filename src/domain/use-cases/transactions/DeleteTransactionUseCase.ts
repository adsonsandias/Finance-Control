import { ITransactionRepository } from "../../repositories/TransactionRepository";

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new Error("ID da transação é obrigatório");
    }

    await this.transactionRepository.deleteTransaction(id);
  }
}
