require('dotenv').config();

/**
 * Environment Configuration
 * Centralizes all environment variables and configuration
 */
class Environment {
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.PORT = parseInt(process.env.PORT) || 3001;
    
    // Database configuration
    this.DATABASE_URL = process.env.DATABASE_URL;
    if (!this.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    
    // JWT configuration
    this.JWT_SECRET = process.env.JWT_SECRET;
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
    
    // CORS configuration
    this.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    // Rate limiting
    this.RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes
    this.RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
    
    // Security
    this.BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    
    // Logging
    this.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
    
    // Validation
    this.MAX_REQUEST_SIZE = process.env.MAX_REQUEST_SIZE || '10mb';
    
    // Database pool configuration
    this.DB_POOL_MIN = parseInt(process.env.DB_POOL_MIN) || 2;
    this.DB_POOL_MAX = parseInt(process.env.DB_POOL_MAX) || 10;
    this.DB_POOL_IDLE_TIMEOUT = parseInt(process.env.DB_POOL_IDLE_TIMEOUT) || 30000;
    this.DB_CONNECTION_TIMEOUT = parseInt(process.env.DB_CONNECTION_TIMEOUT) || 60000;
    
    // Auth0 configuration
    this.AUTH0_SECRET = process.env.AUTH0_SECRET;
    this.AUTH0_BASE_URL = process.env.AUTH0_BASE_URL || 'http://localhost:3001';
    this.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
    this.AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
    
    if (!this.AUTH0_SECRET) {
      throw new Error('AUTH0_SECRET environment variable is required');
    }
    if (!this.AUTH0_CLIENT_ID) {
      throw new Error('AUTH0_CLIENT_ID environment variable is required');
    }
    if (!this.AUTH0_ISSUER_BASE_URL) {
      throw new Error('AUTH0_ISSUER_BASE_URL environment variable is required');
    }
  }

  /**
   * Check if running in development mode
   * @returns {boolean}
   */
  isDevelopment() {
    return this.NODE_ENV === 'development';
  }

  /**
   * Check if running in production mode
   * @returns {boolean}
   */
  isProduction() {
    return this.NODE_ENV === 'production';
  }

  /**
   * Check if running in test mode
   * @returns {boolean}
   */
  isTest() {
    return this.NODE_ENV === 'test';
  }

  /**
   * Get database configuration object
   * @returns {object}
   */
  getDatabaseConfig() {
    return {
      connectionString: this.DATABASE_URL,
      min: this.DB_POOL_MIN,
      max: this.DB_POOL_MAX,
      idleTimeoutMillis: this.DB_POOL_IDLE_TIMEOUT,
      connectionTimeoutMillis: this.DB_CONNECTION_TIMEOUT,
      ssl: this.isProduction() ? { rejectUnauthorized: false } : false
    };
  }

  /**
   * Get JWT configuration object
   * @returns {object}
   */
  getJWTConfig() {
    return {
      secret: this.JWT_SECRET,
      expiresIn: this.JWT_EXPIRES_IN
    };
  }

  /**
   * Get CORS configuration object
   * @returns {object}
   */
  getCORSConfig() {
    return {
      origin: this.FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    };
  }

  /**
   * Get rate limiting configuration object
   * @returns {object}
   */
  getRateLimitConfig() {
    return {
      windowMs: this.RATE_LIMIT_WINDOW_MS,
      max: this.RATE_LIMIT_MAX_REQUESTS,
      message: {
        error: 'Too many requests',
        message: 'Too many requests from this IP, please try again later.'
      }
    };
  }

  /**
   * Get Auth0 configuration object
   * @returns {object}
   */
  getAuth0Config() {
    return {
      authRequired: false,
      auth0Logout: true,
      secret: this.AUTH0_SECRET,
      baseURL: this.AUTH0_BASE_URL,
      clientID: this.AUTH0_CLIENT_ID,
      issuerBaseURL: this.AUTH0_ISSUER_BASE_URL
    };
  }

  /**
   * Validate all required environment variables
   * @throws {Error} If any required variable is missing
   */
  validate() {
    const required = [
      'DATABASE_URL',
      'JWT_SECRET',
      'AUTH0_SECRET',
      'AUTH0_CLIENT_ID',
      'AUTH0_ISSUER_BASE_URL'
    ];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Validate JWT secret length
    if (this.JWT_SECRET.length < 32) {
      throw new Error('JWT_SECRET must be at least 32 characters long');
    }

    // Validate Auth0 secret length
    if (this.AUTH0_SECRET.length < 32) {
      throw new Error('AUTH0_SECRET must be at least 32 characters long');
    }

    console.log('✅ Environment configuration validated successfully');
  }

  /**
   * Get all configuration as object
   * @returns {object}
   */
  getConfig() {
    return {
      nodeEnv: this.NODE_ENV,
      port: this.PORT,
      database: this.getDatabaseConfig(),
      jwt: this.getJWTConfig(),
      cors: this.getCORSConfig(),
      rateLimit: this.getRateLimitConfig(),
      auth0: this.getAuth0Config(),
      bcryptRounds: this.BCRYPT_ROUNDS,
      logLevel: this.LOG_LEVEL,
      maxRequestSize: this.MAX_REQUEST_SIZE
    };
  }
}

// Export singleton instance
module.exports = new Environment();