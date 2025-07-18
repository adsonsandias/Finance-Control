const express = require('express');
const {
  createUser,
  authenticateUser,
  getUserById,
  generateToken,
  generateRefreshToken,
  verifyToken
} = require('../config/auth-local');

const router = express.Router();

// Sign up with email
router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email, password and displayName are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Weak password',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Create user
    const user = await createUser(email, password, displayName);
    
    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        display_name: displayName,
        created_at: user.created_at
      },
      session: {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: 'bearer',
        expires_in: 86400 // 24 hours in seconds
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.message === 'Email already exists') {
      return res.status(400).json({
        error: 'Email already exists',
        message: 'An account with this email already exists'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create account'
    });
  }
});

// Sign in with email
router.post('/token', async (req, res) => {
  try {
    const { email, password, grant_type } = req.body;

    if (grant_type && grant_type !== 'password') {
      return res.status(400).json({
        error: 'Unsupported grant type',
        message: 'Only password grant type is supported'
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      });
    }

    // Authenticate user
    const user = await authenticateUser(email, password);
    
    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'bearer',
      expires_in: 86400, // 24 hours in seconds
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    
    if (error.message === 'Invalid email or password') {
      return res.status(400).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign in'
    });
  }
});

// Get current user
router.get('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header'
      });
    }

    const token = authHeader.substring(7);
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = await getUserById(decoded.sub);

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User not found'
      });
    }

    res.json({
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      avatarUrl: user.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    
    if (error.message === 'Invalid or expired token') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get user information'
    });
  }
});

// Sign out
router.post('/logout', async (req, res) => {
  try {
    // For JWT tokens, we don't need to do anything server-side
    // The client should just remove the token
    res.json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign out'
    });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
      return res.status(400).json({
        error: 'Missing refresh token',
        message: 'Refresh token is required'
      });
    }
    
    // Verify refresh token
    const decoded = verifyToken(refresh_token);
    
    if (decoded.type !== 'refresh') {
      return res.status(400).json({
        error: 'Invalid token type',
        message: 'Invalid refresh token'
      });
    }
    
    // Get user to make sure they still exist
    const user = await getUserById(decoded.sub);
    
    if (!user) {
      return res.status(401).json({
        error: 'User not found',
        message: 'Invalid refresh token'
      });
    }
    
    // Generate new tokens
    const accessToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);
    
    res.json({
      access_token: accessToken,
      refresh_token: newRefreshToken,
      token_type: 'bearer',
      expires_in: 86400
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    
    if (error.message === 'Invalid or expired token') {
      return res.status(401).json({
        error: 'Invalid refresh token',
        message: 'Refresh token is invalid or expired'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to refresh token'
    });
  }
});

module.exports = router;