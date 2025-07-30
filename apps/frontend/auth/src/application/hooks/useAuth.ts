import { useState, useEffect, useCallback } from 'react'

import { User } from '../../domain/entities/User'
import { SignUpData, SignInData } from '../../domain/repositories/AuthRepository'
import { AuthService } from '../services/AuthService'

export interface IUseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  signUp: (data: SignUpData) => Promise<void>
  signIn: (data: SignInData) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
  checkAuthStatus: () => Promise<void>
}

export function useAuth(authService: AuthService): IUseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const loadCurrentUser = useCallback(async () => {
    try {
      // Verificar se há token no localStorage
      const token = await authService.getToken();
      
      if (token) {
        // Se houver token, verificar se ainda é válido
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          // Se o token for inválido, tentar renovar
          try {
            await authService.refreshToken();
            // Após renovar, tentar obter o usuário novamente
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (refreshError) {
            // Se falhar ao renovar, fazer logout
            console.error('Erro ao renovar token:', refreshError);
            await authService.signOut();
            setUser(null);
          }
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Erro ao carregar usuário:', err);
      // Se falhar ao carregar o usuário, limpar o token
      await authService.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  useEffect(() => {
    loadCurrentUser()
  }, [loadCurrentUser])

  const signUp = useCallback(
    async (data: SignUpData) => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await authService.signUp(data)
        setUser(response.user)
      } catch (err: any) {
        setError(err.message || 'Erro ao criar conta')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [authService]
  )

  const signIn = useCallback(
    async (data: SignInData) => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await authService.signIn(data)
        setUser(response.user)
      } catch (err: any) {
        setError(err.message || 'Erro ao fazer login')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [authService]
  )

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      // Por enquanto, vamos simular o login com Google
      // TODO: Implementar integração com Google OAuth
      console.warn('Google Sign-In não implementado ainda')
      setError('Login com Google não está disponível no momento')
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login com Google')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true)
      await authService.signOut()
      setUser(null)
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer logout')
    } finally {
      setIsLoading(false)
    }
  }, [authService])

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true)
      const authStatus = await authService.checkAuthStatus()
      if (authStatus.isAuthenticated && authStatus.user) {
        setUser(authStatus.user)
      } else {
        setUser(null)
      }
    } catch (err: any) {
      console.error('Erro ao verificar status de autenticação:', err)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [authService])

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    clearError,
    checkAuthStatus,
  }
}
