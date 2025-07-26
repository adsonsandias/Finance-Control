import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import bglogin from '../../assets/bg-login.jpg'
// import { ReactComponent as IconGithub } from '../../assets/github.svg'
// import { ReactComponent as IconGoogle } from '../../assets/google.svg'
import { ReactComponent as LogoLogin } from '../../assets/logologin.svg'
import Button from '../../components/Form/Button'
import {
  BgloginStyles,
  Container,
  ContentBackground,
  ContentForm,
} from '../../components/Form/styles/global'
import { Loading } from '../../components/Loading'
import { useAuthContext } from '../../presentation/contexts/AuthContext'

export function Signin() {
  const { user, isLoading, signIn, checkAuthStatus } = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Verificar status de autenticação quando a página carrega
    if (checkAuthStatus) {
      checkAuthStatus()
    }
  }, [checkAuthStatus])

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Por favor, preencha todos os campos')
        return
      }
      await signIn({ email, password })
      navigate('/')
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  const handleGoToSignup = () => {
    navigate('/signup')
  }

  if (isLoading) return <Loading />
  if (!user) {
    return (
      <Container>
        <ContentBackground>
          <div>
            <LogoLogin />
            <strong>
              <span>Finance</span>
              <span>Control</span>
            </strong>
          </div>
          <BgloginStyles
            className="bglogin"
            style={{
              backgroundImage: `url(${bglogin})`,
            }}
          />
        </ContentBackground>
        <ContentForm>
          <h1>Bem-vindo ao Finance Control</h1>
          <p>Faça login para acessar sua conta de forma segura</p>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            <Button
              isActive="sign"
              name="login"
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>

            <Button
              isActive="button"
              name="signup"
              type="button"
              onClick={handleGoToSignup}
              disabled={isLoading}
            >
              Criar conta
            </Button>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Autenticação segura fornecida por Supabase
            </p>
          </div>
        </ContentForm>
      </Container>
    )
  }
  return <Navigate to="/" />
}
