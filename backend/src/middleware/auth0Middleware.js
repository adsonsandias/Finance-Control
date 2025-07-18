/**
 * Auth0 Middleware
 * Provides authentication middleware using Auth0 OIDC
 */
class Auth0Middleware {
  /**
   * Middleware to require authentication for protected routes
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  requireAuth(req, res, next) {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
        timestamp: new Date().toISOString()
      });
    }
    
    // Add user info to request for downstream use
    req.user = {
      id: req.oidc.user.sub,
      email: req.oidc.user.email,
      displayName: req.oidc.user.name || req.oidc.user.nickname,
      picture: req.oidc.user.picture
    };
    
    next();
  }

  /**
   * Optional authentication middleware
   * Adds user info if authenticated but doesn't require it
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  optionalAuth(req, res, next) {
    if (req.oidc.isAuthenticated()) {
      req.user = {
        id: req.oidc.user.sub,
        email: req.oidc.user.email,
        displayName: req.oidc.user.name || req.oidc.user.nickname,
        picture: req.oidc.user.picture
      };
    }
    
    next();
  }

  /**
   * Get current user info
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  getCurrentUser(req, res) {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    res.json({
      user: {
        id: req.oidc.user.sub,
        email: req.oidc.user.email,
        displayName: req.oidc.user.name || req.oidc.user.nickname,
        picture: req.oidc.user.picture,
        emailVerified: req.oidc.user.email_verified
      },
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = new Auth0Middleware();