/**
 * Transaction Repository Interface - Domain Layer
 * Defines the contract for transaction data access
 */
class TransactionRepository {
  async findById(id, userId) {
    throw new Error('Method findById must be implemented');
  }

  async findByUserId(userId, filters = {}) {
    throw new Error('Method findByUserId must be implemented');
  }

  async create(transaction) {
    throw new Error('Method create must be implemented');
  }

  async update(id, userId, transactionData) {
    throw new Error('Method update must be implemented');
  }

  async delete(id, userId) {
    throw new Error('Method delete must be implemented');
  }

  async getStatsByUserId(userId, period) {
    throw new Error('Method getStatsByUserId must be implemented');
  }

  async countByUserId(userId, filters = {}) {
    throw new Error('Method countByUserId must be implemented');
  }
}

module.exports = TransactionRepository;