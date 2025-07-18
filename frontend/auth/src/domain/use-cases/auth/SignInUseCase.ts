import {
  AuthRepository,
  SignInData,
  AuthResponse,
} from "../../repositories/AuthRepository";

export class SignInUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignInData): Promise<AuthResponse> {
    // Validações básicas
    if (!data.email || !data.password) {
      throw new Error("Email e senha são obrigatórios");
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error("Email inválido");
    }

    return this.authRepository.signIn(data);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
