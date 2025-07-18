const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('./database');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required. Please set it in your .env file.');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Generate JWT token
const generateToken = (userId, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign({ sub: userId, role: 'authenticated' }, JWT_SECRET, { expiresIn });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ sub: userId, type: 'refresh' }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Create user in auth.users table
const createUser = async (email, password, displayName) => {
  const userId = uuidv4();
  const hashedPassword = await hashPassword(password);
  
  console.log('Creating user with:', {
    userId,
    email,
    displayName,
    hashedPasswordLength: hashedPassword.length
  });
  
  const userQuery = `
    INSERT INTO auth.users (
      id, email, encrypted_password, email_confirmed_at, 
      raw_user_meta_data, created_at, updated_at
    ) VALUES ($1, $2, $3, NOW(), $4, NOW(), NOW())
    RETURNING id, email, created_at
  `;
  
  const metaData = { display_name: displayName };
  
  try {
    console.log('Executing query with params:', [
      userId, 
      email, 
      '***password***', 
      JSON.stringify(metaData)
    ]);
    
    const result = await query(userQuery, [
      userId, 
      email, 
      hashedPassword, 
      JSON.stringify(metaData)
    ]);
    
    console.log('User created successfully:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') { // Unique violation
      throw new Error('Email already exists');
    }
    throw error;
  }
};

// Authenticate user
const authenticateUser = async (email, password) => {
  const userQuery = `
    SELECT id, email, encrypted_password, raw_user_meta_data
    FROM auth.users 
    WHERE email = $1 AND deleted_at IS NULL
  `;
  
  const result = await query(userQuery, [email]);
  
  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }
  
  const user = result.rows[0];
  const isValidPassword = await comparePassword(password, user.encrypted_password);
  
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }
  
  // Update last sign in
  await query(
    'UPDATE auth.users SET last_sign_in_at = NOW() WHERE id = $1',
    [user.id]
  );
  
  return {
    id: user.id,
    email: user.email,
    display_name: user.raw_user_meta_data?.display_name
  };
};

// Get user by ID
const getUserById = async (userId) => {
  const userQuery = `
    SELECT id, email, raw_user_meta_data, created_at, updated_at
    FROM auth.users 
    WHERE id = $1 AND deleted_at IS NULL
  `;
  
  const result = await query(userQuery, [userId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const user = result.rows[0];
  return {
    id: user.id,
    email: user.email,
    display_name: user.raw_user_meta_data?.display_name,
    avatar_url: user.raw_user_meta_data?.avatar_url,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  createUser,
  authenticateUser,
  getUserById,
  hashPassword,
  comparePassword
};