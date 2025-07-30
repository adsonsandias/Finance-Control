import { User } from '../domain/entities/User';

export const TOKEN_KEYS = {
  ACCESS_TOKEN: '@FinanceControl:access_token',
  REFRESH_TOKEN: '@FinanceControl:refresh_token',
  USER: '@FinanceControl:user'
};

export const TokenStorage = {
  setAccessToken(token: string): void {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  setUser(user: User): void {
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
  },

  getUser(): User | null {
    const userData = localStorage.getItem(TOKEN_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  },

  clearAll(): void {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
  }
};