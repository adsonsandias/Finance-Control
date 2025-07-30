import { TokenStorage } from '../../services/tokenStorage';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeader(): HeadersInit {
    const token = TokenStorage.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleTokenRefresh(response: Response): Promise<Response> {
    // Se o token expirou (401), tenta renovar usando o refresh token
    if (response.status === 401) {
      const refreshToken = TokenStorage.getRefreshToken();
      
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${this.baseURL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken })
          });
          
          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            TokenStorage.setAccessToken(data.access_token);
            TokenStorage.setRefreshToken(data.refresh_token);
            
            // Refaz a requisição original com o novo token
            const originalRequest = response.url;
            const originalMethod = response.type;
            const originalHeaders = {
              ...this.getAuthHeader(),
              'Content-Type': 'application/json'
            };
            
            return fetch(originalRequest, {
              method: originalMethod,
              headers: originalHeaders
            });
          } else {
            // Se falhar ao renovar o token, limpa o armazenamento
            TokenStorage.clearAll();
            // NÃO redirecionar automaticamente - remover esta linha
            // window.location.href = '/signin';
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
          // Se falhar ao renovar o token, limpa o armazenamento
          TokenStorage.clearAll();
          // NÃO redirecionar automaticamente - remover esta linha
          // window.location.href = '/signin';
        }
      } else {
        // Se não houver refresh token, limpa o armazenamento
        TokenStorage.clearAll();
        // NÃO redirecionar automaticamente - remover esta linha
        // window.location.href = '/signin';
      }
    }
    
    return response;
  }

  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
    };

    try {
      let response = await fetch(url, config);
      
      // Tenta renovar o token se necessário
      response = await this.handleTokenRefresh(response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}