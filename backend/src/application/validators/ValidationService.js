/**
 * Validation Service - Application Layer
 * Centralized validation logic for the application
 */
class ValidationService {
  /**
   * Validate email format
   * @param {string} email 
   * @returns {boolean}
   */
  static isValidEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate password strength
   * @param {string} password 
   * @returns {object} { isValid: boolean, errors: string[] }
   */
  static validatePassword(password) {
    const errors = [];
    
    if (!password || typeof password !== 'string') {
      errors.push('Password is required');
      return { isValid: false, errors };
    }

    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (password.length > 128) {
      errors.push('Password must be less than 128 characters');
    }

    // At least one letter
    if (!/[a-zA-Z]/.test(password)) {
      errors.push('Password must contain at least one letter');
    }

    // At least one number
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate display name
   * @param {string} displayName 
   * @returns {boolean}
   */
  static isValidDisplayName(displayName) {
    if (!displayName || typeof displayName !== 'string') {
      return false;
    }
    
    const trimmed = displayName.trim();
    return trimmed.length >= 2 && trimmed.length <= 50;
  }

  /**
   * Validate transaction type
   * @param {string} type 
   * @returns {boolean}
   */
  static isValidTransactionType(type) {
    const validTypes = ['income', 'expense'];
    return validTypes.includes(type);
  }

  /**
   * Validate transaction category
   * @param {string} category 
   * @returns {boolean}
   */
  static isValidTransactionCategory(category) {
    if (!category || typeof category !== 'string') {
      return false;
    }
    
    const trimmed = category.trim();
    return trimmed.length >= 1 && trimmed.length <= 50;
  }

  /**
   * Validate transaction amount
   * @param {number} amount 
   * @returns {boolean}
   */
  static isValidAmount(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return false;
    }
    
    return amount > 0 && amount <= 999999999.99;
  }

  /**
   * Validate transaction title
   * @param {string} title 
   * @returns {boolean}
   */
  static isValidTransactionTitle(title) {
    if (!title || typeof title !== 'string') {
      return false;
    }
    
    const trimmed = title.trim();
    return trimmed.length >= 1 && trimmed.length <= 100;
  }

  /**
   * Validate pagination parameters
   * @param {number} page 
   * @param {number} limit 
   * @returns {object} { page: number, limit: number }
   */
  static validatePagination(page, limit) {
    const validatedPage = Math.max(1, parseInt(page) || 1);
    const validatedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
    
    return {
      page: validatedPage,
      limit: validatedLimit
    };
  }

  /**
   * Sanitize string input
   * @param {string} input 
   * @returns {string}
   */
  static sanitizeString(input) {
    if (!input || typeof input !== 'string') {
      return '';
    }
    
    return input.trim().replace(/[<>"'&]/g, '');
  }

  /**
   * Validate UUID format
   * @param {string} uuid 
   * @returns {boolean}
   */
  static isValidUUID(uuid) {
    if (!uuid || typeof uuid !== 'string') {
      return false;
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Validate required fields
   * @param {object} data 
   * @param {string[]} requiredFields 
   * @returns {string[]} Array of missing fields
   */
  static validateRequiredFields(data, requiredFields) {
    const missing = [];
    
    for (const field of requiredFields) {
      if (!data || data[field] === undefined || data[field] === null || data[field] === '') {
        missing.push(field);
      }
    }
    
    return missing;
  }
}

module.exports = ValidationService;