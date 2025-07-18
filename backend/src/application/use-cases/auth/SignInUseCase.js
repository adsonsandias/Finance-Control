const bcrypt = require('bcryptjs');
const User = require('../../../domain/entities/User');
const ValidationService = require('../../validators/ValidationService');

/**
 * Sign In Use Case - Application Layer
 * Handles user authentication business logic
 */
class SignInUseCase {
  constructor(userRepository, tokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async execute({ email, password }) {
    // Validate required fields
    const missingFields = ValidationService.validateRequiredFields(
      { email, password },
      ['email', 'password']
    );
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate email format
    if (!ValidationService.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Find user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.encryptedPassword);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Update last sign in
    await this.userRepository.updateLastSignIn(user.id);

    // Generate token
    const token = this.tokenService.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName
      },
      token
    };
  }
}

module.exports = SignInUseCase;