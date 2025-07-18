/**
 * Transaction Entity - Domain Layer
 * Represents the core business logic for Transaction
 */
class Transaction {
  constructor({ id, userId, title, type, category, amount, createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.type = type;
    this.category = category;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({ userId, title, type, category, amount }) {
    this.validateTransactionData({ title, type, category, amount });

    return new Transaction({
      userId,
      title: title.trim(),
      type,
      category: category.trim(),
      amount: parseFloat(amount),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static validateTransactionData({ title, type, category, amount }) {
    if (!title || title.trim().length === 0) {
      throw new Error('Title is required');
    }

    if (!['income', 'expense'].includes(type)) {
      throw new Error('Type must be either "income" or "expense"');
    }

    if (!category || category.trim().length === 0) {
      throw new Error('Category is required');
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      throw new Error('Amount must be a positive number');
    }
  }

  update({ title, type, category, amount }) {
    const updates = {};
    
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        throw new Error('Title cannot be empty');
      }
      updates.title = title.trim();
    }

    if (type !== undefined) {
      if (!['income', 'expense'].includes(type)) {
        throw new Error('Type must be either "income" or "expense"');
      }
      updates.type = type;
    }

    if (category !== undefined) {
      if (!category || category.trim().length === 0) {
        throw new Error('Category cannot be empty');
      }
      updates.category = category.trim();
    }

    if (amount !== undefined) {
      if (isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error('Amount must be a positive number');
      }
      updates.amount = parseFloat(amount);
    }

    Object.assign(this, updates);
    this.updatedAt = new Date();
  }

  isIncome() {
    return this.type === 'income';
  }

  isExpense() {
    return this.type === 'expense';
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      type: this.type,
      category: this.category,
      amount: this.amount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Transaction;