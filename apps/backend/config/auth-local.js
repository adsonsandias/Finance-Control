const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const { supabase } = require('./supabase')

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required. Please set it in your .env file.')
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

// Generate JWT token
const generateToken = (userId, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign({ sub: userId, role: 'authenticated' }, JWT_SECRET, { expiresIn })
}

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ sub: userId, type: 'refresh' }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  })
}

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

// Create user in auth.users table
const createUser = async (email, password, displayName) => {
  console.log('Creating user with:', {
    email,
    displayName,
  })

  try {
    // Criar usuário usando Supabase
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        display_name: displayName,
      },
    })

    if (error) {
      console.error('Error creating user:', error)
      if (error.message.includes('already exists')) {
        throw new Error('Email already exists')
      }
      throw error
    }

    console.log('User created successfully:', data.user)
    return {
      id: data.user.id,
      email: data.user.email,
      created_at: data.user.created_at,
    }
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.message === 'Email already exists') {
      throw error
    }
    throw error
  }
}

// Authenticate user with email and password
const authenticateUser = async (email, password) => {
  try {
    // Autenticar usuário usando Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error authenticating user:', error)
      throw new Error('Invalid email or password')
    }

    if (!data.user) {
      throw new Error('Invalid email or password')
    }

    return {
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.user_metadata?.display_name || '',
    }
  } catch (error) {
    console.error('Error authenticating user:', error)
    throw error
  }
}

// Get user by ID
const getUserById = async (userId) => {
  try {
    // Buscar usuário usando Supabase
    const { data, error } = await supabase.auth.admin.getUserById(userId)

    if (error) {
      console.error('Error getting user by ID:', error)
      return null
    }

    if (!data.user) {
      return null
    }

    return {
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.user_metadata?.display_name,
      avatar_url: data.user.user_metadata?.avatar_url,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at,
    }
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  createUser,
  authenticateUser,
  getUserById,
  hashPassword,
  comparePassword,
}
