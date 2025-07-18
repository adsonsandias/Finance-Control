const express = require('express');
const router = express.Router();

/**
 * Transaction Routes - Presentation Layer
 * Defines HTTP routes for transactions
 */
function createTransactionRoutes(transactionController, authMiddleware) {
  // All transaction routes require authentication
  router.use(authMiddleware.requireAuth);

  // Get all transactions for user (with pagination and filters)
  router.get('/', (req, res) => transactionController.getTransactions(req, res));

  // Get transaction statistics
  router.get('/stats', (req, res) => transactionController.getTransactionStats(req, res));

  // Get specific transaction by ID
  router.get('/:id', (req, res) => transactionController.getTransactionById(req, res));

  // Create new transaction
  router.post('/', (req, res) => transactionController.createTransaction(req, res));

  // Update transaction
  router.put('/:id', (req, res) => transactionController.updateTransaction(req, res));

  // Delete transaction
  router.delete('/:id', (req, res) => transactionController.deleteTransaction(req, res));

  return router;
}

module.exports = createTransactionRoutes;