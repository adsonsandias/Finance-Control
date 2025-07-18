const Transaction = require('../../../domain/entities/Transaction');
const ValidationService = require('../../validators/ValidationService');

/**
 * Create Transaction Use Case - Application Layer
 * Handles transaction creation business logic
 */
class CreateTransactionUseCase {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute({ userId, title, type, category, amount }) {
    // Validate required fields
    const missingFields = ValidationService.validateRequiredFields(
      { userId, title, type, category, amount },
      ['userId', 'title', 'type', 'category', 'amount']
    );
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate transaction data
    if (!ValidationService.isValidTransactionTitle(title)) {
      throw new Error('Title must be between 1 and 100 characters');
    }

    if (!ValidationService.isValidTransactionType(type)) {
      throw new Error('Type must be either "income" or "expense"');
    }

    if (!ValidationService.isValidTransactionCategory(category)) {
      throw new Error('Category must be between 1 and 50 characters');
    }

    if (!ValidationService.isValidAmount(amount)) {
      throw new Error('Amount must be a positive number up to 999,999,999.99');
    }

    // Create transaction entity (validates data)
    const transaction = Transaction.create({
      userId,
      title,
      type,
      category,
      amount
    });

    // Save transaction
    const savedTransaction = await this.transactionRepository.create(transaction.toJSON());

    return savedTransaction;
  }
}

module.exports = CreateTransactionUseCase;