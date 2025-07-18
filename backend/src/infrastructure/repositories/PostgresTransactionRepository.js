const TransactionRepository = require('../../domain/repositories/TransactionRepository');
const Transaction = require('../../domain/entities/Transaction');

/**
 * PostgreSQL Transaction Repository Implementation - Infrastructure Layer
 * Implements transaction data access using PostgreSQL
 */
class PostgresTransactionRepository extends TransactionRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async findById(id, userId) {
    try {
      const result = await this.db.query(
        `SELECT id, user_id, title, type, category, amount, created_at, updated_at
         FROM public.transactions
         WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return this.mapToEntity(result.rows[0]);
    } catch (error) {
      throw new Error(`Failed to find transaction: ${error.message}`);
    }
  }

  async findByUserId(userId, filters = {}) {
    try {
      let query = `
        SELECT id, user_id, title, type, category, amount, created_at, updated_at
        FROM public.transactions
        WHERE user_id = $1
      `;
      
      const params = [userId];
      let paramCount = 1;

      // Add filters
      if (filters.type) {
        paramCount++;
        query += ` AND type = $${paramCount}`;
        params.push(filters.type);
      }

      if (filters.category) {
        paramCount++;
        query += ` AND category = $${paramCount}`;
        params.push(filters.category);
      }

      // Add ordering and pagination
      query += ' ORDER BY created_at DESC';
      
      if (filters.limit) {
        paramCount++;
        query += ` LIMIT $${paramCount}`;
        params.push(filters.limit);
      }

      if (filters.offset) {
        paramCount++;
        query += ` OFFSET $${paramCount}`;
        params.push(filters.offset);
      }

      const result = await this.db.query(query, params);
      return result.rows.map(row => this.mapToEntity(row));
    } catch (error) {
      throw new Error(`Failed to find transactions: ${error.message}`);
    }
  }

  async create({ userId, title, type, category, amount }) {
    try {
      const result = await this.db.query(
        `INSERT INTO public.transactions (user_id, title, type, category, amount, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING id, user_id, title, type, category, amount, created_at, updated_at`,
        [userId, title, type, category, amount]
      );

      return this.mapToEntity(result.rows[0]);
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async update(id, userId, updates) {
    try {
      // Build dynamic update query
      const updateFields = [];
      const params = [];
      let paramCount = 0;

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          paramCount++;
          updateFields.push(`${key} = $${paramCount}`);
          params.push(value);
        }
      });

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      // Add updated_at
      paramCount++;
      updateFields.push(`updated_at = $${paramCount}`);
      params.push(new Date());

      // Add WHERE conditions
      paramCount++;
      params.push(id);
      paramCount++;
      params.push(userId);

      const query = `
        UPDATE public.transactions 
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount - 1} AND user_id = $${paramCount}
        RETURNING id, user_id, title, type, category, amount, created_at, updated_at
      `;

      const result = await this.db.query(query, params);

      if (result.rows.length === 0) {
        throw new Error('Transaction not found or access denied');
      }

      return this.mapToEntity(result.rows[0]);
    } catch (error) {
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  }

  async delete(id, userId) {
    try {
      const result = await this.db.query(
        'DELETE FROM public.transactions WHERE id = $1 AND user_id = $2 RETURNING id',
        [id, userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Transaction not found or access denied');
      }

      return true;
    } catch (error) {
      throw new Error(`Failed to delete transaction: ${error.message}`);
    }
  }

  async countByUserId(userId, filters = {}) {
    try {
      let query = 'SELECT COUNT(*) as total FROM public.transactions WHERE user_id = $1';
      const params = [userId];
      let paramCount = 1;

      if (filters.type) {
        paramCount++;
        query += ` AND type = $${paramCount}`;
        params.push(filters.type);
      }

      if (filters.category) {
        paramCount++;
        query += ` AND category = $${paramCount}`;
        params.push(filters.category);
      }

      const result = await this.db.query(query, params);
      return parseInt(result.rows[0].total);
    } catch (error) {
      throw new Error(`Failed to count transactions: ${error.message}`);
    }
  }

  async getStatsByUserId(userId, period) {
    try {
      let dateFilter = '';
      
      if (period === 'week') {
        dateFilter = "AND created_at >= NOW() - INTERVAL '7 days'";
      } else if (period === 'month') {
        dateFilter = "AND created_at >= NOW() - INTERVAL '30 days'";
      } else if (period === 'year') {
        dateFilter = "AND created_at >= NOW() - INTERVAL '365 days'";
      }

      const query = `
        SELECT 
          type,
          COUNT(*) as count,
          SUM(amount) as total,
          AVG(amount) as average
        FROM public.transactions 
        WHERE user_id = $1 ${dateFilter}
        GROUP BY type
      `;

      const result = await this.db.query(query, [userId]);
      
      const stats = {
        income: { count: 0, total: 0, average: 0 },
        expense: { count: 0, total: 0, average: 0 }
      };

      result.rows.forEach(row => {
        stats[row.type] = {
          count: parseInt(row.count),
          total: parseFloat(row.total),
          average: parseFloat(row.average)
        };
      });

      return stats;
    } catch (error) {
      throw new Error(`Failed to get transaction stats: ${error.message}`);
    }
  }

  mapToEntity(transactionData) {
    return new Transaction({
      id: transactionData.id,
      userId: transactionData.user_id,
      title: transactionData.title,
      type: transactionData.type,
      category: transactionData.category,
      amount: parseFloat(transactionData.amount),
      createdAt: transactionData.created_at,
      updatedAt: transactionData.updated_at
    });
  }
}

module.exports = PostgresTransactionRepository;