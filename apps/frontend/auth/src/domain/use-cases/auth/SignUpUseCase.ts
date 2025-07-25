import { AuthRepository, SignUpData, AuthResponse } from '../../repositories/AuthRepository'

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignUpData): Promise<AuthResponse> {
    // Validações básicas
    if (!data.email || !data.password) {
      throw new Error('Email e senha são obrigatórios')
    }

    if (!data.displayName || data.displayName.trim() === '') {
      throw new Error('Nome de exibição é obrigatório')
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error('Email inválido')
    }

    if (data.password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres')
    }

    return this.authRepository.signUp(data)
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
