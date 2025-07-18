const UserRepository = require('../../domain/repositories/UserRepository');
const User = require('../../domain/entities/User');

/**
 * PostgreSQL User Repository Implementation - Infrastructure Layer
 * Implements user data access using PostgreSQL
 */
class PostgresUserRepository extends UserRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async findById(id) {
    try {
      const result = await this.db.query(
        `SELECT u.id, u.email, u.created_at, u.updated_at, u.raw_user_meta_data,
                p.display_name, p.avatar_url
         FROM auth.users u
         LEFT JOIN public.user_profiles p ON u.id = p.id
         WHERE u.id = $1 AND u.deleted_at IS NULL`,
        [id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return this.mapToEntity(result.rows[0]);
    } catch (error) {
      throw new Error(`Failed to find user by id: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      const result = await this.db.query(
        `SELECT u.id, u.email, u.encrypted_password, u.created_at, u.updated_at, u.raw_user_meta_data,
                p.display_name, p.avatar_url
         FROM auth.users u
         LEFT JOIN public.user_profiles p ON u.id = p.id
         WHERE u.email = $1 AND u.deleted_at IS NULL`,
        [email]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const userData = result.rows[0];
      return {
        ...this.mapToEntity(userData),
        encryptedPassword: userData.encrypted_password
      };
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  async create({ email, displayName, encryptedPassword }) {
    const client = await this.db.getClient();
    
    try {
      await client.query('BEGIN');

      // Create user in auth.users
      const userResult = await client.query(
        `INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
         VALUES ($1, $2, NOW(), NOW(), NOW(), $3)
         RETURNING id, email, created_at, updated_at`,
        [email, encryptedPassword, JSON.stringify({ display_name: displayName })]
      );

      const user = userResult.rows[0];

      // Create user profile
      await client.query(
        `INSERT INTO public.user_profiles (id, display_name, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW())`,
        [user.id, displayName]
      );

      await client.query('COMMIT');

      return {
        id: user.id,
        email: user.email,
        displayName,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Failed to create user: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async update(id, { displayName, avatarUrl }) {
    try {
      const result = await this.db.query(
        `UPDATE public.user_profiles 
         SET display_name = COALESCE($2, display_name),
             avatar_url = COALESCE($3, avatar_url),
             updated_at = NOW()
         WHERE id = $1
         RETURNING id, display_name, avatar_url, updated_at`,
        [id, displayName, avatarUrl]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async delete(id) {
    const client = await this.db.getClient();
    
    try {
      await client.query('BEGIN');

      // Delete user profile
      await client.query('DELETE FROM public.user_profiles WHERE id = $1', [id]);
      
      // Soft delete user
      await client.query(
        'UPDATE auth.users SET deleted_at = NOW() WHERE id = $1',
        [id]
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Failed to delete user: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async updateLastSignIn(id) {
    try {
      await this.db.query(
        'UPDATE auth.users SET last_sign_in_at = NOW(), updated_at = NOW() WHERE id = $1',
        [id]
      );
    } catch (error) {
      throw new Error(`Failed to update last sign in: ${error.message}`);
    }
  }

  mapToEntity(userData) {
    return new User({
      id: userData.id,
      email: userData.email,
      displayName: userData.display_name || userData.raw_user_meta_data?.display_name,
      avatarUrl: userData.avatar_url,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at
    });
  }
}

module.exports = PostgresUserRepository;