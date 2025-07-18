const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { auth } = require('express-openid-connect');

// Import configuration
const environment = require('./config/environment');
const logger = require('./application/services/LoggerService');

// Import dependency container
const container = require('./config/dependencies');

// Import route factories
const createAuthRoutes = require('./presentation/routes/authRoutes');
const createTransactionRoutes = require('./presentation/routes/transactionRoutes');

// Import Auth0 middleware and routes
const auth0Middleware = require('./middleware/auth0Middleware');
const auth0Routes = require('./routes/auth0Routes');

/**
 * Express Application Setup with Clean Architecture
 */
class App {
  constructor() {
    // Validate environment configuration
    environment.validate();
    
    this.app = express();
    this.port = environment.PORT;
    this.config = environment.getConfig();
    
    this._setupMiddleware();
    this._setupRoutes();
    this._setupErrorHandling();
  }

  _setupMiddleware() {
    // Security middleware
    this.app.use(helmet());
    
    // CORS configuration
    this.app.use(cors(environment.getCORSConfig()));

    // Auth0 authentication middleware
    this.app.use(auth(environment.getAuth0Config()));

    // Rate limiting
    const limiter = rateLimit(environment.getRateLimitConfig());
    this.app.use('/api/', limiter);

    // Body parsing
    this.app.use(express.json({ limit: environment.MAX_REQUEST_SIZE }));
    this.app.use(express.urlencoded({ extended: true, limit: environment.MAX_REQUEST_SIZE }));

    // Request logging
    this.app.use((req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        logger.logRequest(req, res, duration);
      });
      
      next();
    });
  }

  _setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Finance Control API',
        version: '2.0.0'
      });
    });

    // Auth0 routes
    this.app.get('/', (req, res) => {
      res.json({
        message: req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out',
        user: req.oidc.user || null,
        timestamp: new Date().toISOString()
      });
    });

    // Protected route example
    this.app.get('/profile', (req, res) => {
      if (!req.oidc.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      res.json({
        user: req.oidc.user,
        timestamp: new Date().toISOString()
      });
    });

    // API routes with Auth0 integration
    const transactionController = container.get('transactionController');

    // Auth0 authentication routes
    this.app.use('/auth', auth0Routes);
    this.app.use('/api/auth', auth0Routes);

    // Auth0 user endpoint (legacy compatibility)
    this.app.get('/api/auth/user', 
      auth0Middleware.requireAuth.bind(auth0Middleware),
      (req, res) => auth0Middleware.getCurrentUser(req, res)
    );

    // Protected transactions routes
    this.app.use('/api/transactions', 
      auth0Middleware.requireAuth.bind(auth0Middleware),
      createTransactionRoutes(transactionController, auth0Middleware)
    );

    // Users endpoint for compatibility
    this.app.get('/api/users', 
      auth0Middleware.requireAuth.bind(auth0Middleware),
      (req, res) => auth0Middleware.getCurrentUser(req, res)
    );
  }

  _setupErrorHandling() {
    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
      });
    });

    // Global error handler
    this.app.use((error, req, res, next) => {
      logger.error('Global error handler', error, {
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        ip: req.ip
      });
      
      // Don't leak error details in production
      const isDevelopment = environment.isDevelopment();
      
      res.status(error.status || 500).json({
        error: error.name || 'Internal Server Error',
        message: error.message || 'Something went wrong',
        ...(isDevelopment && { stack: error.stack }),
        timestamp: new Date().toISOString()
      });
    });
  }

  async start() {
    try {
      // Test database connection
      const db = require('../config/database');
      await db.testConnection();
      logger.info('Database connected successfully');

      // Start server
      this.app.listen(this.port, () => {
        logger.logStartup(this.port, this.config);
        logger.info(`Health check: http://localhost:${this.port}/health`);
        logger.info(`API Base URL: http://localhost:${this.port}/api`);
        logger.debug('Available dependencies', { 
          dependencies: container.getAvailableDependencies() 
        });
      });
    } catch (error) {
      logger.error('Failed to start server', error);
      process.exit(1);
    }
  }

  getApp() {
    return this.app;
  }
}

// Start the application
if (require.main === module) {
  const app = new App();
  app.start();
}

module.exports = App;