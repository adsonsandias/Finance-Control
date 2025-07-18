import {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from "../../domain/repositories/AuthRepository";
import { User } from "../../domain/entities/User";

export class SupabaseApiRepository implements AuthRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || errorData.error || 'Request failed');
    }

    return response.json();
  }

  private getAuthHeader(): { Authorization: string } | {} {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await this.makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      }),
    });

    // Store tokens in localStorage
    if (response.session?.access_token) {
      localStorage.setItem('access_token', response.session.access_token);
    }
    if (response.session?.refresh_token) {
      localStorage.setItem('refresh_token', response.session.refresh_token);
    }

    return {
      user: {
        id: response.user.id,
        email: response.user.email,
        displayName: response.user.display_name,
      },
      token: response.session?.access_token || "",
      refreshToken: response.session?.refresh_token,
    };
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await this.makeRequest('/auth/token', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        grant_type: 'password',
      }),
    });

    // Store tokens in localStorage
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    if (response.refresh_token) {
      localStorage.setItem('refresh_token', response.refresh_token);
    }

    return {
      user: {
        id: response.user.id,
        email: response.user.email,
        displayName: response.user.display_name,
      },
      token: response.access_token,
      refreshToken: response.refresh_token,
    };
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.makeRequest('/auth/user', {
        method: 'GET',
        headers: this.getAuthHeader(),
      });

      return {
        id: response.user.id,
        email: response.user.email,
        displayName: response.user.display_name,
      };
    } catch (error) {
      // If token is invalid, clear localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return null;
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    // Update stored tokens
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    if (response.refresh_token) {
      localStorage.setItem('refresh_token', response.refresh_token);
    }

    return response.access_token;
  }

  async signOut(): Promise<void> {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
        headers: this.getAuthHeader(),
      });
    } catch (error) {
      // Even if logout fails on server, clear local tokens
      console.warn('Logout request failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }

    // Verify token with backend
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    return localStorage.getItem('access_token');
  }

  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
    const user = await this.getCurrentUser();
    return {
      isAuthenticated: !!user,
      user: user || undefined,
    };
  }
}
