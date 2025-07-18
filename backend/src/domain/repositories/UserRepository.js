/**
 * User Repository Interface - Domain Layer
 * Defines the contract for user data access
 */
class UserRepository {
  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async findByEmail(email) {
    throw new Error('Method findByEmail must be implemented');
  }

  async create(user) {
    throw new Error('Method create must be implemented');
  }

  async update(id, userData) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  async updateLastSignIn(id) {
    throw new Error('Method updateLastSignIn must be implemented');
  }
}

module.exports = UserRepository;