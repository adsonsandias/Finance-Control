import { User } from '../../domain/entities/User';
import {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from '../../domain/repositories/AuthRepository';
import { HttpClient } from './HttpClient';
import { TokenStorage } from '../../services/tokenStorage';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private httpClient: HttpClient) {}

  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await this.httpClient.post('/auth/signup', {
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    });

    // Armazenar tokens e usuário
    if (response.session?.access_token) {
      TokenStorage.setAccessToken(response.session.access_token);
    }
    if (response.session?.refresh_token) {
      TokenStorage.setRefreshToken(response.session.refresh_token);
    }
    
    const user = {
      id: response.user.id,
      email: response.user.email,
      displayName: data.displayName,
    };
    
    TokenStorage.setUser(user);

    return {
      user,
      token: response.session?.access_token || '',
      refreshToken: response.session?.refresh_token,
    };
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await this.httpClient.post('/auth/token', {
      email: data.email,
      password: data.password,
      grant_type: 'password',
    });
  
    // Armazenar sessão completa
    if (response.session) {
      TokenStorage.setSession(response.session);
    } else if (response.access_token) {
      // Formato alternativo da resposta
      TokenStorage.setSession({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        token_type: response.token_type || 'bearer',
        expires_in: response.expires_in || 86400
      });
    }
    
    const user = {
      id: response.user.id,
      email: response.user.email,
      displayName: response.user.display_name,
    };
    
    TokenStorage.setUser(user);
  
    return {
      user,
      token: response.access_token || response.session?.access_token,
      refreshToken: response.refresh_token || response.session?.refresh_token,
    };
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.httpClient.get('/auth/user');
      
      const user = {
        id: response.id,
        email: response.email,
        displayName: response.display_name,
        avatarUrl: response.avatar_url,
        createdAt: response.created_at,
      };
      
      TokenStorage.setUser(user);
      return user;
    } catch (error) {
      // Se o token for inválido, limpar armazenamento
      TokenStorage.clearAll();
      return null;
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = TokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.httpClient.post('/auth/refresh', {
      refresh_token: refreshToken,
    });

    // Atualizar tokens armazenados
    if (response.access_token) {
      TokenStorage.setAccessToken(response.access_token);
    }
    if (response.refresh_token) {
      TokenStorage.setRefreshToken(response.refresh_token);
    }

    return response.access_token;
  }

  async signOut(): Promise<void> {
    try {
      await this.httpClient.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      // Sempre limpar armazenamento local
      TokenStorage.clearAll();
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = TokenStorage.getAccessToken();
    if (!token) {
      return false;
    }

    // Verificar token com backend
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    return TokenStorage.getAccessToken();
  }

  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
    const user = await this.getCurrentUser();
    return {
      isAuthenticated: !!user,
      user: user || undefined,
    };
  }
}