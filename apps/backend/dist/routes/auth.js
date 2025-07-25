const express = require('express')

const { supabase } = require('../config/supabase')
const { authenticateToken } = require('../middleware/auth')

const router = express.Router()

// Sign up with email
router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName } = req.body

    if (!email || !password || !displayName) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email, password and displayName are required',
      })
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })

    if (error) {
      return res.status(400).json({
        error: error.message,
        message: 'Failed to create account',
      })
    }

    if (!data.user) {
      return res.status(400).json({
        error: 'User creation failed',
        message: 'Failed to create account',
      })
    }

    res.status(201).json({
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
        display_name: displayName,
      },
      session: data.session
        ? {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            token_type: 'bearer',
            expires_in: data.session.expires_in,
          }
        : null,
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create account',
    })
  }
})

// Sign in with email
router.post('/token', async (req, res) => {
  try {
    const { email, password, grant_type } = req.body

    if (grant_type && grant_type !== 'password') {
      return res.status(400).json({
        error: 'Unsupported grant type',
        message: 'Only password grant type is supported',
      })
    }

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required',
      })
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return res.status(400).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password',
      })
    }

    if (!data.user || !data.session) {
      return res.status(400).json({
        error: 'Authentication failed',
        message: 'Failed to sign in',
      })
    }

    res.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      token_type: 'bearer',
      expires_in: data.session.expires_in,
      user: {
        id: data.user.id,
        email: data.user.email,
        display_name: data.user.user_metadata?.display_name,
      },
    })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign in',
    })
  }
})

// Get current user
router.get('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      })
    }

    const token = authHeader.substring(7)

    // Get user from Supabase using the token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      })
    }

    res.json({
      id: user.id,
      email: user.email,
      display_name: user.user_metadata?.display_name,
      avatarUrl: user.user_metadata?.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get user information',
    })
  }
})

// Sign out
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      })
    }

    const token = authHeader.substring(7)

    // Sign out with Supabase
    const { error } = await supabase.auth.signOut(token)

    if (error) {
      console.error('Logout error:', error)
    }

    res.json({ message: 'Successfully signed out' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign out',
    })
  }
})

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body

    if (!refresh_token) {
      return res.status(400).json({
        error: 'Missing refresh token',
        message: 'Refresh token is required',
      })
    }

    // Refresh session with Supabase
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token,
    })

    if (error || !data.session) {
      return res.status(401).json({
        error: 'Invalid refresh token',
        message: 'Failed to refresh token',
      })
    }

    res.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      token_type: 'bearer',
      expires_in: data.session.expires_in,
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to refresh token',
    })
  }
})

module.exports = router
