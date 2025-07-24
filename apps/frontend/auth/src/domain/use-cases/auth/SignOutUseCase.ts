import { AuthRepository } from '../../repositories/AuthRepository'

export class SignOutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.signOut()
  }
}
