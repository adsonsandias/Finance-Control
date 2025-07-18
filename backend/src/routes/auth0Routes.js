const express = require('express');
const router = express.Router();
const auth0Middleware = require('../middleware/auth0Middleware');

/**
 * Auth0 Routes
 * Handles authentication flows using Auth0
 */

// Get authentication status
router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.isAuthenticated() ? {
      id: req.oidc.user.sub,
      email: req.oidc.user.email,
      displayName: req.oidc.user.name || req.oidc.user.nickname,
      picture: req.oidc.user.picture
    } : null,
    timestamp: new Date().toISOString()
  });
});

// Get current user (protected)
router.get('/user', 
  auth0Middleware.requireAuth.bind(auth0Middleware),
  (req, res) => auth0Middleware.getCurrentUser(req, res)
);

// Login endpoint (redirects to Auth0)
router.get('/login', (req, res) => {
  res.oidc.login({
    returnTo: req.query.returnTo || '/'
  });
});

// Logout endpoint
router.get('/logout', (req, res) => {
  res.oidc.logout({
    returnTo: req.query.returnTo || '/'
  });
});

// Callback endpoint (handled automatically by express-openid-connect)
// This is just for documentation purposes
router.get('/callback', (req, res) => {
  // This route is handled automatically by express-openid-connect
  // but we can add custom logic here if needed
  res.redirect('/');
});

module.exports = router;