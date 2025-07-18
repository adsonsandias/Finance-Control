const express = require('express');
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all transactions for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50, type, category } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE user_id = $1';
    let params = [req.user.id];
    let paramCount = 1;

    if (type && ['income', 'expense'].includes(type)) {
      paramCount++;
      whereClause += ` AND type = $${paramCount}`;
      params.push(type);
    }

    if (category) {
      paramCount++;
      whereClause += ` AND category = $${paramCount}`;
      params.push(category);
    }

    const transactionsResult = await query(
      `SELECT id, title, type, category, amount, created_at, updated_at
       FROM public.transactions
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
      [...params, limit, offset]
    );

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM public.transactions ${whereClause}`,
      params
    );

    res.json({
      data: transactionsResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch transactions'
    });
  }
});

// Get transaction by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT id, title, type, category, amount, created_at, updated_at
       FROM public.transactions
       WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Transaction not found',
        message: 'Transaction not found or access denied'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch transaction'
    });
  }
});

// Create new transaction
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, type, category, amount } = req.body;

    // Validation
    if (!title || !type || !category || amount === undefined) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Title, type, category, and amount are required'
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        error: 'Invalid type',
        message: 'Type must be either "income" or "expense"'
      });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be a positive number'
      });
    }

    const result = await query(
      `INSERT INTO public.transactions (user_id, title, type, category, amount, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, title, type, category, amount, created_at, updated_at`,
      [req.user.id, title, type, category, amount]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create transaction'
    });
  }
});

// Update transaction
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, category, amount } = req.body;

    // Check if transaction exists and belongs to user
    const existingResult = await query(
      'SELECT id FROM public.transactions WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Transaction not found',
        message: 'Transaction not found or access denied'
      });
    }

    // Validation
    if (type && !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        error: 'Invalid type',
        message: 'Type must be either "income" or "expense"'
      });
    }

    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be a positive number'
      });
    }

    // Build update query dynamically
    const updates = [];
    const params = [];
    let paramCount = 0;

    if (title !== undefined) {
      paramCount++;
      updates.push(`title = $${paramCount}`);
      params.push(title);
    }

    if (type !== undefined) {
      paramCount++;
      updates.push(`type = $${paramCount}`);
      params.push(type);
    }

    if (category !== undefined) {
      paramCount++;
      updates.push(`category = $${paramCount}`);
      params.push(category);
    }

    if (amount !== undefined) {
      paramCount++;
      updates.push(`amount = $${paramCount}`);
      params.push(amount);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        error: 'No updates provided',
        message: 'At least one field must be provided for update'
      });
    }

    updates.push('updated_at = NOW()');
    params.push(id, req.user.id);

    const result = await query(
      `UPDATE public.transactions 
       SET ${updates.join(', ')}
       WHERE id = $${paramCount + 1} AND user_id = $${paramCount + 2}
       RETURNING id, title, type, category, amount, created_at, updated_at`,
      params
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update transaction'
    });
  }
});

// Delete transaction
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM public.transactions WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Transaction not found',
        message: 'Transaction not found or access denied'
      });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete transaction'
    });
  }
});

// Get transaction summary/statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    if (period === 'week') {
      dateFilter = "AND created_at >= NOW() - INTERVAL '7 days'";
    } else if (period === 'month') {
      dateFilter = "AND created_at >= NOW() - INTERVAL '30 days'";
    } else if (period === 'year') {
      dateFilter = "AND created_at >= NOW() - INTERVAL '365 days'";
    }

    const result = await query(
      `SELECT 
         type,
         COUNT(*) as count,
         SUM(amount) as total,
         AVG(amount) as average
       FROM public.transactions
       WHERE user_id = $1 ${dateFilter}
       GROUP BY type`,
      [req.user.id]
    );

    const summary = {
      income: { count: 0, total: 0, average: 0 },
      expense: { count: 0, total: 0, average: 0 }
    };

    result.rows.forEach(row => {
      summary[row.type] = {
        count: parseInt(row.count),
        total: parseFloat(row.total),
        average: parseFloat(row.average)
      };
    });

    summary.balance = summary.income.total - summary.expense.total;

    res.json(summary);
  } catch (error) {
    console.error('Get transaction summary error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch transaction summary'
    });
  }
});

module.exports = router;