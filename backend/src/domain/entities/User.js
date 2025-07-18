/**
 * User Entity - Domain Layer
 * Represents the core business logic for User
 */
class User {
  constructor({ id, email, displayName, avatarUrl, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({ email, displayName, avatarUrl }) {
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Valid email is required');
    }

    return new User({
      email,
      displayName: displayName || email.split('@')[0],
      avatarUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  updateProfile({ displayName, avatarUrl }) {
    if (displayName !== undefined) {
      this.displayName = displayName;
    }
    if (avatarUrl !== undefined) {
      this.avatarUrl = avatarUrl;
    }
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User;