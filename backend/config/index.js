// Backend configuration index
// This file exports all configuration modules

module.exports = {
  supabase: require('./supabase'),
  authLocal: require('./auth-local'),
}

// Environment variables validation
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'JWT_SECRET']

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} environment variable is not set`)
  }
})
