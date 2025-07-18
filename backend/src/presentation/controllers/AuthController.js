/**
 * Auth Controller - Presentation Layer
 * Handles HTTP requests for authentication
 */
class AuthController {
  constructor(signUpUseCase, signInUseCase, userRepository, tokenService) {
    this.signUpUseCase = signUpUseCase;
    this.signInUseCase = signInUseCase;
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async signUp(req, res) {
    try {
      const { email, password, displayName } = req.body;

      const result = await this.signUpUseCase.execute({
        email,
        password,
        displayName
      });

      res.status(201).json({
        user: result.user,
        session: {
          access_token: result.token,
          token_type: 'bearer',
          expires_in: 86400
        }
      });
    } catch (error) {
      console.error('SignUp error:', error);
      
      if (error.message.includes('already exists') || error.message.includes('required')) {
        return res.status(400).json({
          error: 'Bad Request',
          message: error.message
        });
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create account'
      });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password, grant_type } = req.body;

      if (grant_type && grant_type !== 'password') {
        return res.status(400).json({
          error: 'Unsupported grant type',
          message: 'Only password grant type is supported'
        });
      }

      const result = await this.signInUseCase.execute({ email, password });

      res.json({
        access_token: result.token,
        token_type: 'bearer',
        expires_in: 86400,
        user: result.user
      });
    } catch (error) {
      console.error('SignIn error:', error);
      
      if (error.message.includes('Invalid') || error.message.includes('required')) {
        return res.status(400).json({
          error: 'Invalid credentials',
          message: error.message
        });
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to sign in'
      });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await this.userRepository.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          message: 'User account not found'
        });
      }

      res.json(user.toJSON());
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get user information'
      });
    }
  }

  async signOut(req, res) {
    try {
      // In a real implementation, you might want to blacklist the token
      // For now, we'll just return success and let the client handle token removal
      res.json({ message: 'Successfully signed out' });
    } catch (error) {
      console.error('SignOut error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to sign out'
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const token = this.tokenService.generateToken(
        req.user.id, 
        req.user.email, 
        req.user.role
      );
      
      res.json({
        access_token: token,
        token_type: 'bearer',
        expires_in: 86400
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to refresh token'
      });
    }
  }
}

module.exports = AuthController;