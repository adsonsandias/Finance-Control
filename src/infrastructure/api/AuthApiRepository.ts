import {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from "../../domain/repositories/AuthRepository";
import { User } from "../../domain/entities/User";
import { ApiClient } from "./ApiClient";

export class AuthApiRepository implements AuthRepository {
  constructor(private apiClient: ApiClient) {}

  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await this.apiClient.post("/auth/signup", {
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    });

    this.apiClient.setToken(response.session.access_token);

    return {
      user: {
        id: response.user.id,
        email: response.user.email,
        displayName: data.displayName,
        token: response.session.access_token,
      },
      token: response.session.access_token,
    };
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await this.apiClient.post("/auth/token", {
      email: data.email,
      password: data.password,
      grant_type: "password",
    });

    this.apiClient.setToken(response.access_token);

    return {
      user: {
        id: response.user.id,
        email: response.user.email,
        displayName: response.user.email, // Temporário até buscar do perfil
        token: response.access_token,
      },
      token: response.access_token,
    };
  }

  async signOut(): Promise<void> {
    try {
      await this.apiClient.post("/auth/logout");
    } finally {
      this.apiClient.setToken(null);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.apiClient.get("/auth/user");
      return {
        id: response.id,
        email: response.email,
        displayName: response.display_name,
        avatarUrl: response.avatar_url,
        createdAt: response.created_at,
      };
    } catch (error) {
      return null;
    }
  }

  async refreshToken(): Promise<string> {
    const response = await this.apiClient.post("/auth/refresh");
    this.apiClient.setToken(response.access_token);
    return response.access_token;
  }

  async isAuthenticated(): Promise<boolean> {
    return !!this.apiClient.getToken();
  }

  async getToken(): Promise<string | null> {
    return this.apiClient.getToken();
  }

  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
    try {
      const user = await this.getCurrentUser();
      return {
        isAuthenticated: !!user,
        user: user || undefined,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
      };
    }
  }
}
