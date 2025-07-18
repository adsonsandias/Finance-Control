const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId, email, role = 'authenticated') => {
  return jwt.sign(
    { 
      sub: userId, 
      email, 
      role,
      aud: 'authenticated',
      iss: 'finance-control-demo'
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Sign up with email
router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({
        error: 'Missing required fields: displayName',
        message: 'Email, password and displayName are required'
      });
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM auth.users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'An account with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userResult = await query(
      `INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
       VALUES ($1, $2, NOW(), NOW(), NOW(), $3)
       RETURNING id, email, created_at`,
      [email, hashedPassword, JSON.stringify({ display_name: displayName || email })]
    );

    const user = userResult.rows[0];
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 86400
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
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

    if (grant_type !== 'password') {
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

    // Find user
    const userResult = await query(
      'SELECT id, email, encrypted_password FROM auth.users WHERE email = $1 AND deleted_at IS NULL',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    const user = userResult.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.encrypted_password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    // Update last sign in
    await query(
      'UPDATE auth.users SET last_sign_in_at = NOW(), updated_at = NOW() WHERE id = $1',
      [user.id]
    );

    const token = generateToken(user.id, user.email);

    res.json({
      access_token: token,
      token_type: 'bearer',
      expires_in: 86400,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign in'
    });
  }
});

// Get current user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userResult = await query(
      `SELECT u.id, u.email, u.created_at, u.updated_at, u.raw_user_meta_data,
              p.display_name, p.avatar_url
       FROM auth.users u
       LEFT JOIN public.user_profiles p ON u.id = p.id
       WHERE u.id = $1 AND u.deleted_at IS NULL`,
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User account not found'
      });
    }

    const user = userResult.rows[0];
    res.json({
      id: user.id,
      email: user.email,
      display_name: user.display_name || user.raw_user_meta_data?.display_name,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get user information'
    });
  }
});

// Sign out (client-side token invalidation)
router.post('/logout', authenticateToken, (req, res) => {
  // In a real implementation, you might want to blacklist the token
  // For now, we'll just return success and let the client handle token removal
  res.json({ message: 'Successfully signed out' });
});

// Refresh token (simplified - returns new token)
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const token = generateToken(req.user.id, req.user.email, req.user.role);
    
    res.json({
      access_token: token,
      token_type: 'bearer',
      expires_in: 86400
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to refresh token'
    });
  }
});

module.exports = router;