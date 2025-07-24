const express = require('express')

const { supabase } = require('../config/supabase')
const { authenticateToken } = require('../middleware/auth')

const router = express.Router()

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Buscar o perfil do usuário usando Supabase
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('id, email, display_name, avatar_url, created_at, updated_at')
      .eq('id', req.user.id)
      .single()

    if (error || !profile) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'User profile not found',
      })
    }

    res.json({
      id: profile.id,
      email: profile.email,
      full_name: profile.display_name,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user profile',
    })
  }
})

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { full_name, avatar_url } = req.body

    // Verificar se há campos para atualizar
    if (full_name === undefined && avatar_url === undefined) {
      return res.status(400).json({
        error: 'No updates provided',
        message: 'At least one field must be provided for update',
      })
    }

    // Construir objeto de atualização
    const updates = {}
    if (full_name !== undefined) updates.display_name = full_name
    if (avatar_url !== undefined) updates.avatar_url = avatar_url

    // Atualizar perfil usando Supabase
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select('id, email, display_name, avatar_url, created_at, updated_at')
      .single()

    if (error || !data) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'User profile not found or update failed',
      })
    }

    // Retornar o perfil atualizado
    res.json({
      id: data.id,
      email: data.email,
      full_name: data.display_name,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
    })
  } catch (error) {
    console.error('Update user profile error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update user profile',
    })
  }
})

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    // Usar transação do Supabase para garantir atomicidade

    // 1. Excluir transações do usuário
    const { error: transactionsError } = await supabase
      .from('transactions')
      .delete()
      .eq('user_id', req.user.id)

    if (transactionsError) throw transactionsError

    // 2. Excluir perfil do usuário
    const { error: profileError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', req.user.id)

    if (profileError) throw profileError

    // 3. Excluir usuário da autenticação
    const { error: authError } = await supabase.auth.admin.deleteUser(req.user.id)

    if (authError) throw authError

    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Delete user account error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete user account',
    })
  }
})

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Obter todas as transações do usuário
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user.id)

    if (transactionsError) throw transactionsError

    // Calcular estatísticas de transações
    const stats = {
      total_transactions: transactions.length,
      income_count: transactions.filter((t) => t.type === 'income').length,
      expense_count: transactions.filter((t) => t.type === 'expense').length,
      total_income: transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0),
      total_expenses: transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0),
    }

    // Calcular atividade recente (últimos 30 dias)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentTransactions = transactions.filter((t) => new Date(t.created_at) >= thirtyDaysAgo)

    const recent = {
      recent_transactions: recentTransactions.length,
      recent_income: recentTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0),
      recent_expenses: recentTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0),
    }

    // Calcular top categorias
    const categoriesMap = transactions.reduce((acc, t) => {
      const key = `${t.category}-${t.type}`
      if (!acc[key]) {
        acc[key] = {
          category: t.category,
          type: t.type,
          count: 0,
          total: 0,
        }
      }
      acc[key].count += 1
      acc[key].total += parseFloat(t.amount)
      return acc
    }, {})

    const topCategories = Object.values(categoriesMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)

    // Obter data de criação da conta
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(req.user.id)

    if (userError) throw userError

    const accountCreatedAt = user?.user?.created_at || new Date().toISOString()

    res.json({
      account: {
        created_at: accountCreatedAt,
        member_since_days: Math.floor(
          (new Date() - new Date(accountCreatedAt)) / (1000 * 60 * 60 * 24)
        ),
      },
      transactions: {
        total: stats.total_transactions,
        income_count: stats.income_count,
        expense_count: stats.expense_count,
        total_income: stats.total_income,
        total_expenses: stats.total_expenses,
        balance: stats.total_income - stats.total_expenses,
      },
      recent_activity: {
        transactions: recent.recent_transactions,
        income: recent.recent_income,
        expenses: recent.recent_expenses,
        balance: recent.recent_income - recent.recent_expenses,
      },
      top_categories: topCategories.map((cat) => ({
        category: cat.category,
        type: cat.type,
        count: cat.count,
        total: cat.total,
      })),
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user statistics',
    })
  }
})

module.exports = router
