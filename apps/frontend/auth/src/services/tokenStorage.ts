import { User } from '../domain/entities/User';

export const TOKEN_KEYS = {
  ACCESS_TOKEN: '@FinanceControl:access_token',
  REFRESH_TOKEN: '@FinanceControl:refresh_token',
  USER: '@FinanceControl:user',
  SESSION: '@FinanceControl:session'
};

export interface SessionData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number; // Timestamp de expiração
}

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
  
  setSession(session: SessionData): void {
    // Calcular o timestamp de expiração
    const expiresAt = Date.now() + session.expires_in * 1000;
    const sessionWithExpiry = {
      ...session,
      expires_at: expiresAt
    };
    localStorage.setItem(TOKEN_KEYS.SESSION, JSON.stringify(sessionWithExpiry));
    
    // Também atualizar os tokens individuais para compatibilidade
    this.setAccessToken(session.access_token);
    this.setRefreshToken(session.refresh_token);
  },
  
  getSession(): SessionData | null {
    const sessionData = localStorage.getItem(TOKEN_KEYS.SESSION);
    return sessionData ? JSON.parse(sessionData) : null;
  },
  
  isSessionExpired(): boolean {
    const session = this.getSession();
    if (!session || !session.expires_at) return true;
    
    // Verificar se o token expirou (com margem de segurança de 60 segundos)
    return Date.now() > session.expires_at - 60000;
  },

  clearAll(): void {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
    localStorage.removeItem(TOKEN_KEYS.SESSION);
  }
};