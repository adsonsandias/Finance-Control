import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User | null
  loading: boolean
  isLoading: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  signUp?(credentials: SignInCredentials & { displayName: string }): Promise<void>
  checkAuthStatus?(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState | null>(() => {
    const token = localStorage.getItem('@FinanceControl:token')
    const user = localStorage.getItem('@FinanceControl:user')

    if (token && user) {
      // Configurar o token para requisições futuras
      // Como estamos usando fetch em vez de axios, não precisamos configurar defaults.headers
      // O token será adicionado em cada requisição pelo interceptor na api.ts
      return { token, user: JSON.parse(user) }
    }

    return null
  })

  const [loading, setLoading] = useState(false)

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    setLoading(true)
    try {
      const response = await api.post<{ session: { access_token: string }; user: User }>(
        '/auth/token',
        {
          email,
          password,
        }
      )

      // Extraindo os dados da resposta
      const { session, user } = response
      const token = session.access_token

      localStorage.setItem('@FinanceControl:token', token)
      localStorage.setItem('@FinanceControl:user', JSON.stringify(user))

      // Configurar o token para requisições futuras
      // Como estamos usando fetch em vez de axios, não precisamos configurar defaults.headers
      // O token será adicionado em cada requisição pelo interceptor na api.ts

      setData({ token, user })
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@FinanceControl:token')
    localStorage.removeItem('@FinanceControl:user')

    setData(null)
  }, [])

  // Função para verificar o status de autenticação (usada nas páginas SignIn e SignUp)
  const checkAuthStatus = useCallback(() => {
    // Implementação simples que apenas verifica se há dados de autenticação
    const token = localStorage.getItem('@FinanceControl:token')
    const user = localStorage.getItem('@FinanceControl:user')

    if (token && user) {
      setData({ token, user: JSON.parse(user) })
    }
  }, [])

  // Função para cadastro de usuário
  const signUp = useCallback(
    async ({ email, password, displayName }: SignInCredentials & { displayName: string }) => {
      setLoading(true)
      try {
        const response = await api.post<{ session: { access_token: string }; user: User }>(
          '/auth/signup',
          {
            email,
            password,
            displayName,
          }
        )

        // Extraindo os dados da resposta
        const { session, user } = response
        const token = session.access_token

        localStorage.setItem('@FinanceControl:token', token)
        localStorage.setItem('@FinanceControl:user', JSON.stringify(user))

        setData({ token, user })
      } catch (error) {
        throw error
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        loading,
        isLoading: loading,
        signIn,
        signOut,
        signUp,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth, AuthContext }
