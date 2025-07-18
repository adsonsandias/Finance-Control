import {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from "../../domain/repositories/AuthRepository";
import { User } from "../../domain/entities/User";
import { ApiClient } from "./ApiClient";

export class Auth0ApiRepository implements AuthRepository {
  private apiClient: ApiClient;
  private baseURL: string;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    // Extract base URL from API client (remove /api suffix)
    this.baseURL = (apiClient as any).baseURL.replace("/api", "");
  }

  async signUp(data: SignUpData): Promise<AuthResponse> {
    // Auth0 handles signup through the hosted login page
    // This method redirects to Auth0 login with signup mode
    window.location.href = `${this.baseURL}/auth/login?screen_hint=signup`;

    // This will never be reached as we redirect
    throw new Error("Redirecting to Auth0 signup");
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    // Auth0 handles signin through the hosted login page
    // This method redirects to Auth0 login
    window.location.href = `${this.baseURL}/auth/login`;

    // This will never be reached as we redirect
    throw new Error("Redirecting to Auth0 login");
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.apiClient.get("/auth/user");
      return {
        id: response.user.id,
        email: response.user.email,
        displayName: response.user.displayName,
        avatarUrl: response.user.picture,
      };
    } catch (error) {
      return null;
    }
  }

  async refreshToken(): Promise<string> {
    // Auth0 handles token refresh automatically
    // We just need to check if user is still authenticated
    try {
      const response = await this.apiClient.get("/auth/refresh");
      if (response.token) {
        return response.token;
      }
      throw new Error("Not authenticated");
    } catch (error) {
      throw new Error("Failed to refresh token");
    }
  }

  async signOut(): Promise<void> {
    // Redirect to Auth0 logout
    window.location.href = `${this.baseURL}/auth/logout`;
  }

  isAuthenticated(): boolean {
    // Check if there's a valid session
    // This is a simple check - in a real app you might want to check localStorage or cookies
    return document.cookie.includes("connect.sid");
  }

  getToken(): string | null {
    // Auth0 uses session-based authentication, so we return a placeholder
    return this.isAuthenticated() ? "auth0-session" : null;
  }

  // Helper method to check authentication status
  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
    try {
      const response = await this.apiClient.get("/auth/user");
      return {
        isAuthenticated: true,
        user: {
          id: response.user.id,
          email: response.user.email,
          displayName: response.user.displayName,
          avatarUrl: response.user.picture,
        },
      };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }
}
