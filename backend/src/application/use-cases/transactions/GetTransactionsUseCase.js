const ValidationService = require('../../validators/ValidationService');

/**
 * Get Transactions Use Case - Application Layer
 * Handles fetching user transactions with pagination and filters
 */
class GetTransactionsUseCase {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute({ userId, page = 1, limit = 10, type, category }) {
    // Validate required userId
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Validate pagination parameters
    const { page: validatedPage, limit: validatedLimit } = ValidationService.validatePagination(page, limit);
    
    const filters = {
      page: validatedPage,
      limit: validatedLimit,
      offset: (validatedPage - 1) * validatedLimit
    };

    // Add optional filters
    if (type && ['income', 'expense'].includes(type)) {
      filters.type = type;
    }

    if (category) {
      filters.category = category;
    }

    // Get transactions and total count
    const [transactions, totalCount] = await Promise.all([
      this.transactionRepository.findByUserId(userId, filters),
      this.transactionRepository.countByUserId(userId, { type, category })
    ]);

    return {
      data: transactions,
      pagination: {
        page: validatedPage,
        limit: validatedLimit,
        total: totalCount,
        pages: Math.ceil(totalCount / validatedLimit)
      }
    };
  }
}

module.exports = GetTransactionsUseCase;