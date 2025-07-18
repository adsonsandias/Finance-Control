const environment = require('../../config/environment');

/**
 * Logger Service - Application Layer
 * Centralized logging service for the application
 */
class LoggerService {
  constructor() {
    this.logLevel = environment.LOG_LEVEL;
    this.isDevelopment = environment.isDevelopment();
  }

  /**
   * Log levels hierarchy
   */
  static LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };

  /**
   * Check if log level should be logged
   * @param {string} level 
   * @returns {boolean}
   */
  _shouldLog(level) {
    const currentLevel = LoggerService.LOG_LEVELS[this.logLevel] || LoggerService.LOG_LEVELS.info;
    const messageLevel = LoggerService.LOG_LEVELS[level] || LoggerService.LOG_LEVELS.info;
    return messageLevel <= currentLevel;
  }

  /**
   * Format log message
   * @param {string} level 
   * @param {string} message 
   * @param {object} meta 
   * @returns {string}
   */
  _formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase().padEnd(5);
    
    let logMessage = `${timestamp} [${levelUpper}] ${message}`;
    
    if (Object.keys(meta).length > 0) {
      logMessage += ` | Meta: ${JSON.stringify(meta)}`;
    }
    
    return logMessage;
  }

  /**
   * Log error message
   * @param {string} message 
   * @param {Error|object} error 
   * @param {object} meta 
   */
  error(message, error = null, meta = {}) {
    if (!this._shouldLog('error')) return;
    
    const errorMeta = { ...meta };
    
    if (error instanceof Error) {
      errorMeta.error = {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined
      };
    } else if (error) {
      errorMeta.error = error;
    }
    
    console.error(this._formatMessage('error', message, errorMeta));
  }

  /**
   * Log warning message
   * @param {string} message 
   * @param {object} meta 
   */
  warn(message, meta = {}) {
    if (!this._shouldLog('warn')) return;
    console.warn(this._formatMessage('warn', message, meta));
  }

  /**
   * Log info message
   * @param {string} message 
   * @param {object} meta 
   */
  info(message, meta = {}) {
    if (!this._shouldLog('info')) return;
    console.log(this._formatMessage('info', message, meta));
  }

  /**
   * Log debug message
   * @param {string} message 
   * @param {object} meta 
   */
  debug(message, meta = {}) {
    if (!this._shouldLog('debug')) return;
    console.log(this._formatMessage('debug', message, meta));
  }

  /**
   * Log HTTP request
   * @param {object} req 
   * @param {object} res 
   * @param {number} duration 
   */
  logRequest(req, res, duration = null) {
    const meta = {
      method: req.method,
      url: req.originalUrl || req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      statusCode: res.statusCode,
      duration: duration ? `${duration}ms` : undefined
    };
    
    if (req.user) {
      meta.userId = req.user.id;
    }
    
    const level = res.statusCode >= 400 ? 'warn' : 'info';
    this[level](`${req.method} ${req.originalUrl || req.url}`, meta);
  }

  /**
   * Log database operation
   * @param {string} operation 
   * @param {string} table 
   * @param {object} meta 
   */
  logDatabase(operation, table, meta = {}) {
    this.debug(`Database ${operation}`, { table, ...meta });
  }

  /**
   * Log authentication event
   * @param {string} event 
   * @param {string} userId 
   * @param {object} meta 
   */
  logAuth(event, userId = null, meta = {}) {
    this.info(`Auth: ${event}`, { userId, ...meta });
  }

  /**
   * Log business logic event
   * @param {string} useCase 
   * @param {string} event 
   * @param {object} meta 
   */
  logUseCase(useCase, event, meta = {}) {
    this.debug(`UseCase: ${useCase} - ${event}`, meta);
  }

  /**
   * Log application startup
   * @param {number} port 
   * @param {object} config 
   */
  logStartup(port, config = {}) {
    this.info('🚀 Application started successfully', {
      port,
      environment: config.nodeEnv,
      version: '2.0.0'
    });
  }

  /**
   * Log application shutdown
   * @param {string} reason 
   */
  logShutdown(reason = 'Unknown') {
    this.info('🛑 Application shutting down', { reason });
  }
}

// Export singleton instance
module.exports = new LoggerService();