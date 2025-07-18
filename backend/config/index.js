// Backend configuration index
// This file exports all configuration modules

module.exports = {
  database: require('./database'),
  supabase: require('./supabase'),
  authLocal: require('./auth-local')
};

// Environment variables validation
const requiredEnvVars = [
  'DB_HOST',
  'DB_PORT', 
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'JWT_SECRET'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} environment variable is not set`);
  }
});