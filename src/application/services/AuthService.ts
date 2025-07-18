import { SignUpUseCase } from "../../domain/use-cases/auth/SignUpUseCase";
import { SignInUseCase } from "../../domain/use-cases/auth/SignInUseCase";
import { SignOutUseCase } from "../../domain/use-cases/auth/SignOutUseCase";
import {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from "../../domain/repositories/AuthRepository";
import { User } from "../../domain/entities/User";

export class AuthService {
  private signUpUseCase: SignUpUseCase;
  private signInUseCase: SignInUseCase;
  private signOutUseCase: SignOutUseCase;

  constructor(private authRepository: AuthRepository) {
    this.signUpUseCase = new SignUpUseCase(authRepository);
    this.signInUseCase = new SignInUseCase(authRepository);
    this.signOutUseCase = new SignOutUseCase(authRepository);
  }

  async signUp(data: SignUpData): Promise<AuthResponse> {
    return this.signUpUseCase.execute(data);
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    return this.signInUseCase.execute(data);
  }

  async signOut(): Promise<void> {
    await this.signOutUseCase.execute();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }

  async refreshToken(): Promise<string> {
    return this.authRepository.refreshToken();
  }

  isAuthenticated(): boolean {
    return this.authRepository.isAuthenticated();
  }

  getToken(): string | null {
    return this.authRepository.getToken();
  }
}
