/**
 * Auth Middleware - Presentation Layer
 * Handles JWT authentication for protected routes
 */
class AuthMiddleware {
  constructor(tokenService, userRepository) {
    this.tokenService = tokenService;
    this.userRepository = userRepository;
  }

  /**
   * Middleware to authenticate required requests
   */
  authenticate() {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'No authorization header provided'
          });
        }

        const token = authHeader.split(' ')[1]; // Bearer <token>
        
        if (!token) {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'No token provided'
          });
        }

        // Verify token
        const decoded = this.tokenService.verifyToken(token);
        
        if (!decoded) {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token'
          });
        }

        // Check if user still exists
        const user = await this.userRepository.findById(decoded.userId);
        
        if (!user) {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'User not found'
          });
        }

        // Add user to request
        req.user = {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.role
        };

        next();
      } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token'
          });
        }
        
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token expired'
          });
        }

        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Authentication failed'
        });
      }
    };
  }

  /**
   * Middleware for optional authentication
   * Adds user to request if token is valid, but doesn't fail if no token
   */
  optionalAuth() {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
          return next();
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
          return next();
        }

        // Verify token
        const decoded = this.tokenService.verifyToken(token);
        
        if (!decoded) {
          return next();
        }

        // Check if user exists
        const user = await this.userRepository.findById(decoded.userId);
        
        if (user) {
          req.user = {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role
          };
        }

        next();
      } catch (error) {
        console.error('Optional auth middleware error:', error);
        // For optional auth, we don't fail on errors
        next();
      }
    };
  }

  /**
   * Middleware to check user roles
   */
  requireRole(roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Authentication required'
        });
      }

      const userRole = req.user.role || 'user';
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Insufficient permissions'
        });
      }

      next();
    };
  }
}

module.exports = AuthMiddleware;