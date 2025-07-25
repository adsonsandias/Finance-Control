const cors = require('cors')
const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
require('dotenv').config()

const authRoutes = require('./routes/auth-local')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://frontend:3000'],
    credentials: true,
  })
)

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // Default: 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Default: limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Finance Control Backend is running',
    timestamp: new Date().toISOString(),
  })
})

// API routes
app.use('/auth', authRoutes)
app.use('/transactions', transactionRoutes)
app.use('/users', userRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  })
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Finance Control Backend running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 Supabase: ${process.env.SUPABASE_URL ? 'Connected' : 'Not configured'}`)
})

module.exports = app
