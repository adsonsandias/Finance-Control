const jwt = require('jsonwebtoken');
const environment = require('../../config/environment');

/**
 * Token Service - Application Layer
 * Handles JWT token generation and validation
 */
class TokenService {
  constructor() {
    const jwtConfig = environment.getJWTConfig();
    this.secret = jwtConfig.secret;
    this.expiresIn = jwtConfig.expiresIn;
  }

  generateToken(userId, email, role = 'authenticated') {
    return jwt.sign(
      {
        sub: userId,
        email,
        role,
        aud: 'authenticated',
        iss: 'finance-control'
      },
      this.secret,
      { expiresIn: this.expiresIn }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = TokenService;