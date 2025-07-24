const express = require('express');
const { supabase } = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all transactions for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50, type, category } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('transactions')
      .select('id, title, type, category, amount, created_at, updated_at', { count: 'exact' })
      .eq('user_id', req.user.id);

    if (type && ['income', 'expense'].includes(type)) {
      query = query.eq('type', type);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      data: data || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
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

    const { data, error } = await supabase
      .from('transactions')
      .select('id, title, type, category, amount, created_at, updated_at')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        error: 'Transaction not found',
        message: 'Transaction not found or access denied'
      });
    }

    res.json(data);
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

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: req.user.id,
        title,
        type,
        category,
        amount
      })
      .select('id, title, type, category, amount, created_at, updated_at')
      .single();

    if (error) throw error;

    res.status(201).json(data);
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
    const { data: existing, error: checkError } = await supabase
      .from('transactions')
      .select('id')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (checkError || !existing) {
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

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (type !== undefined) updates.type = type;
    if (category !== undefined) updates.category = category;
    if (amount !== undefined) updates.amount = amount;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: 'No updates provided',
        message: 'At least one field must be provided for update'
      });
    }

    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select('id, title, type, category, amount, created_at, updated_at')
      .single();

    if (error) throw error;

    res.json(data);
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

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

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
    
    let range;
    if (period === 'week') {
      range = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    } else if (period === 'month') {
      range = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    } else if (period === 'year') {
      range = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    } else {
      range = null;
    }

    let query = supabase
      .from('transactions')
      .select('type, amount', { count: 'exact' })
      .eq('user_id', req.user.id);

    if (range) {
      query = query.gte('created_at', range);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    const summary = {
      income: { count: 0, total: 0, average: 0 },
      expense: { count: 0, total: 0, average: 0 }
    };

    data.forEach(transaction => {
      summary[transaction.type].count++;
      summary[transaction.type].total += transaction.amount;
    });

    if (summary.income.count > 0) {
      summary.income.average = summary.income.total / summary.income.count;
    }
    if (summary.expense.count > 0) {
      summary.expense.average = summary.expense.total / summary.expense.count;
    }

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