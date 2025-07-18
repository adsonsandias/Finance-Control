const express = require('express');
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await query(
      `SELECT up.id, up.user_id, up.full_name, up.avatar_url, up.created_at, up.updated_at,
              au.email
       FROM public.user_profiles up
       JOIN auth.users au ON up.user_id = au.id
       WHERE up.user_id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'User profile not found'
      });
    }

    const profile = result.rows[0];
    res.json({
      id: profile.user_id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { full_name, avatar_url } = req.body;

    // Build update query dynamically
    const updates = [];
    const params = [];
    let paramCount = 0;

    if (full_name !== undefined) {
      paramCount++;
      updates.push(`full_name = $${paramCount}`);
      params.push(full_name);
    }

    if (avatar_url !== undefined) {
      paramCount++;
      updates.push(`avatar_url = $${paramCount}`);
      params.push(avatar_url);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        error: 'No updates provided',
        message: 'At least one field must be provided for update'
      });
    }

    updates.push('updated_at = NOW()');
    params.push(req.user.id);

    const result = await query(
      `UPDATE public.user_profiles 
       SET ${updates.join(', ')}
       WHERE user_id = $${paramCount + 1}
       RETURNING id, user_id, full_name, avatar_url, created_at, updated_at`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'User profile not found'
      });
    }

    // Get updated profile with email
    const profileResult = await query(
      `SELECT up.id, up.user_id, up.full_name, up.avatar_url, up.created_at, up.updated_at,
              au.email
       FROM public.user_profiles up
       JOIN auth.users au ON up.user_id = au.id
       WHERE up.user_id = $1`,
      [req.user.id]
    );

    const profile = profileResult.rows[0];
    res.json({
      id: profile.user_id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update user profile'
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const client = await require('../config/database').getClient();
    
    try {
      await client.query('BEGIN');

      // Delete user transactions
      await client.query(
        'DELETE FROM public.transactions WHERE user_id = $1',
        [req.user.id]
      );

      // Delete user profile
      await client.query(
        'DELETE FROM public.user_profiles WHERE user_id = $1',
        [req.user.id]
      );

      // Delete user from auth.users
      await client.query(
        'DELETE FROM auth.users WHERE id = $1',
        [req.user.id]
      );

      await client.query('COMMIT');

      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Delete user account error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete user account'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get transaction counts and totals
    const transactionStats = await query(
      `SELECT 
         COUNT(*) as total_transactions,
         COUNT(CASE WHEN type = 'income' THEN 1 END) as income_count,
         COUNT(CASE WHEN type = 'expense' THEN 1 END) as expense_count,
         COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) as total_income,
         COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) as total_expenses
       FROM public.transactions
       WHERE user_id = $1`,
      [req.user.id]
    );

    // Get recent activity (last 30 days)
    const recentActivity = await query(
      `SELECT 
         COUNT(*) as recent_transactions,
         COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) as recent_income,
         COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) as recent_expenses
       FROM public.transactions
       WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
      [req.user.id]
    );

    // Get top categories
    const topCategories = await query(
      `SELECT 
         category,
         type,
         COUNT(*) as count,
         SUM(amount) as total
       FROM public.transactions
       WHERE user_id = $1
       GROUP BY category, type
       ORDER BY total DESC
       LIMIT 10`,
      [req.user.id]
    );

    // Get account creation date
    const accountInfo = await query(
      'SELECT created_at FROM auth.users WHERE id = $1',
      [req.user.id]
    );

    const stats = transactionStats.rows[0];
    const recent = recentActivity.rows[0];

    res.json({
      account: {
        created_at: accountInfo.rows[0]?.created_at,
        member_since_days: accountInfo.rows[0] ? 
          Math.floor((new Date() - new Date(accountInfo.rows[0].created_at)) / (1000 * 60 * 60 * 24)) : 0
      },
      transactions: {
        total: parseInt(stats.total_transactions),
        income_count: parseInt(stats.income_count),
        expense_count: parseInt(stats.expense_count),
        total_income: parseFloat(stats.total_income),
        total_expenses: parseFloat(stats.total_expenses),
        balance: parseFloat(stats.total_income) - parseFloat(stats.total_expenses)
      },
      recent_activity: {
        transactions: parseInt(recent.recent_transactions),
        income: parseFloat(recent.recent_income),
        expenses: parseFloat(recent.recent_expenses),
        balance: parseFloat(recent.recent_income) - parseFloat(recent.recent_expenses)
      },
      top_categories: topCategories.rows.map(row => ({
        category: row.category,
        type: row.type,
        count: parseInt(row.count),
        total: parseFloat(row.total)
      }))
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user statistics'
    });
  }
});

module.exports = router;