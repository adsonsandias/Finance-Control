const bcrypt = require('bcryptjs');
const User = require('../../../domain/entities/User');
const ValidationService = require('../../validators/ValidationService');
const environment = require('../../../config/environment');

/**
 * Sign Up Use Case - Application Layer
 * Handles user registration business logic
 */
class SignUpUseCase {
  constructor(userRepository, tokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async execute({ email, password, displayName }) {
    // Validate required fields
    const missingFields = ValidationService.validateRequiredFields(
      { email, password, displayName },
      ['email', 'password', 'displayName']
    );
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate email format
    if (!ValidationService.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    const passwordValidation = ValidationService.validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('. '));
    }

    // Validate display name
    if (!ValidationService.isValidDisplayName(displayName)) {
      throw new Error('Display name must be between 2 and 50 characters');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user entity
    const user = User.create({ email, displayName });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, environment.BCRYPT_ROUNDS);

    // Save user
    const savedUser = await this.userRepository.create({
      ...user.toJSON(),
      encryptedPassword: hashedPassword
    });

    // Generate token
    const token = this.tokenService.generateToken(savedUser.id, savedUser.email);

    return {
      user: {
        id: savedUser.id,
        email: savedUser.email,
        displayName: savedUser.displayName,
        createdAt: savedUser.createdAt
      },
      token
    };
  }
}

module.exports = SignUpUseCase;