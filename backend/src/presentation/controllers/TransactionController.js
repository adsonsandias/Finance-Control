/**
 * Transaction Controller - Presentation Layer
 * Handles HTTP requests for transactions
 */
class TransactionController {
  constructor(
    createTransactionUseCase,
    getTransactionsUseCase,
    transactionRepository
  ) {
    this.createTransactionUseCase = createTransactionUseCase;
    this.getTransactionsUseCase = getTransactionsUseCase;
    this.transactionRepository = transactionRepository;
  }

  async getTransactions(req, res) {
    try {
      const { page, limit, type, category } = req.query;
      
      const result = await this.getTransactionsUseCase.execute({
        userId: req.user.id,
        page,
        limit,
        type,
        category
      });

      res.json(result);
    } catch (error) {
      console.error('Get transactions error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch transactions'
      });
    }
  }

  async getTransactionById(req, res) {
    try {
      const { id } = req.params;
      
      const transaction = await this.transactionRepository.findById(id, req.user.id);
      
      if (!transaction) {
        return res.status(404).json({
          error: 'Transaction not found',
          message: 'Transaction not found or access denied'
        });
      }

      res.json(transaction.toJSON());
    } catch (error) {
      console.error('Get transaction error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch transaction'
      });
    }
  }

  async createTransaction(req, res) {
    try {
      const { title, type, category, amount } = req.body;
      
      const transaction = await this.createTransactionUseCase.execute({
        userId: req.user.id,
        title,
        type,
        category,
        amount
      });

      res.status(201).json(transaction.toJSON());
    } catch (error) {
      console.error('Create transaction error:', error);
      
      if (error.message.includes('required') || 
          error.message.includes('must be') || 
          error.message.includes('Invalid')) {
        return res.status(400).json({
          error: 'Bad Request',
          message: error.message
        });
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create transaction'
      });
    }
  }

  async updateTransaction(req, res) {
    try {
      const { id } = req.params;
      const { title, type, category, amount } = req.body;

      // Check if transaction exists
      const existingTransaction = await this.transactionRepository.findById(id, req.user.id);
      if (!existingTransaction) {
        return res.status(404).json({
          error: 'Transaction not found',
          message: 'Transaction not found or access denied'
        });
      }

      // Prepare updates
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (type !== undefined) updates.type = type;
      if (category !== undefined) updates.category = category;
      if (amount !== undefined) updates.amount = amount;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No updates provided'
        });
      }

      // Validate updates using entity
      existingTransaction.update(updates);

      // Update in database
      const updatedTransaction = await this.transactionRepository.update(
        id, 
        req.user.id, 
        updates
      );

      res.json(updatedTransaction.toJSON());
    } catch (error) {
      console.error('Update transaction error:', error);
      
      if (error.message.includes('cannot be empty') || 
          error.message.includes('must be') || 
          error.message.includes('Invalid')) {
        return res.status(400).json({
          error: 'Bad Request',
          message: error.message
        });
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update transaction'
      });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const { id } = req.params;
      
      await this.transactionRepository.delete(id, req.user.id);
      
      res.status(204).send();
    } catch (error) {
      console.error('Delete transaction error:', error);
      
      if (error.message.includes('not found') || error.message.includes('access denied')) {
        return res.status(404).json({
          error: 'Transaction not found',
          message: error.message
        });
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete transaction'
      });
    }
  }

  async getTransactionStats(req, res) {
    try {
      const { period } = req.query;
      
      const stats = await this.transactionRepository.getStatsByUserId(
        req.user.id, 
        period
      );

      res.json(stats);
    } catch (error) {
      console.error('Get transaction stats error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch transaction statistics'
      });
    }
  }
}

module.exports = TransactionController;