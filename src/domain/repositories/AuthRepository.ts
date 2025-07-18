import { AuthUser, User } from "../entities/User";

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface AuthRepository {
  signUp(data: SignUpData): Promise<AuthResponse>;
  signIn(data: SignInData): Promise<AuthResponse>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
  isAuthenticated(): boolean;
  getToken(): string | null;
}
