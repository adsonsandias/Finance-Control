import { ITransactionRepository } from "../../repositories/TransactionRepository";
import {
  ITransaction,
  ICreateTransactionData,
  TransactionType,
} from "../../entities/Transaction";

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: ICreateTransactionData): Promise<ITransaction> {
    // Validações
    if (!data.title || data.title.trim().length === 0) {
      throw new Error("Título é obrigatório");
    }

    if (!data.type || !Object.values(TransactionType).includes(data.type)) {
      throw new Error("Tipo de transação inválido");
    }

    if (!data.category || data.category.trim().length === 0) {
      throw new Error("Categoria é obrigatória");
    }

    if (!data.amount || data.amount <= 0) {
      throw new Error("Valor deve ser maior que zero");
    }

    // Sanitizar dados
    const sanitizedData: ICreateTransactionData = {
      title: data.title.trim(),
      type: data.type,
      category: data.category.trim(),
      amount: Math.round(data.amount * 100) / 100, // Arredondar para 2 casas decimais
    };

    return this.transactionRepository.createTransaction(sanitizedData);
  }
}
