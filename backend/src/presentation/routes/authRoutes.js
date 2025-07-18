const express = require('express');
const router = express.Router();

/**
 * Auth Routes - Presentation Layer
 * Defines HTTP routes for authentication
 */
function createAuthRoutes(authController, authMiddleware) {
  // Sign up
  router.post('/signup', (req, res) => authController.signUp(req, res));

  // Sign in (token endpoint for compatibility)
  router.post('/token', (req, res) => authController.signIn(req, res));

  // Get current user (protected)
  router.get('/user', 
    authMiddleware.requireAuth, 
    (req, res) => authController.getCurrentUser(req, res)
  );

  // Sign out (protected)
  router.post('/logout', 
    authMiddleware.requireAuth, 
    (req, res) => authController.signOut(req, res)
  );

  // Refresh token (protected)
  router.post('/refresh', 
    authMiddleware.requireAuth, 
    (req, res) => authController.refreshToken(req, res)
  );

  return router;
}

module.exports = createAuthRoutes;