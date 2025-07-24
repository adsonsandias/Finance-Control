import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import bglogin from '../../assets/bg-login.jpg'
// import { ReactComponent as IconGithub } from '../../assets/github.svg'
// import { ReactComponent as IconGoogle } from '../../assets/google.svg'
import { ReactComponent as LogoLogin } from '../../assets/logologin.svg'
import { Button } from '../../components/Form/Button'
import {
  BgloginStyles,
  Container,
  ContentBackground,
  ContentForm,
} from '../../components/Form/styles/global'
import { Loading } from '../../components/Loading'
import { useAuthContext } from '../../presentation/contexts/AuthContext'

export function Signup() {
  const { user, isLoading, signUp, checkAuthStatus } = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    // Verificar status de autenticação quando a página carrega
    checkAuthStatus()
  }, [checkAuthStatus])

  const handleSignup = async () => {
    try {
      if (!email || !password || !displayName) {
        alert('Por favor, preencha todos os campos')
        return
      }
      if (password !== confirmPassword) {
        alert('As senhas não coincidem')
        return
      }
      await signUp({ email, password, displayName })
      alert('Conta criada com sucesso! Faça login para continuar.')
      navigate('/signin')
    } catch (error) {
      console.error('Erro no cadastro:', error)
      alert('Erro ao criar conta. Tente novamente.')
    }
  }

  const handleGoToLogin = () => {
    navigate('/signin')
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
          <h1>Criar Conta</h1>
          <p>Cadastre-se para começar a gerenciar suas finanças</p>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input
              type="text"
              placeholder="Nome completo"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
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
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            <Button
              isActive="sign"
              name="signup"
              type="button"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? 'Criando...' : 'Criar conta'}
            </Button>

            <Button
              isActive="button"
              name="login"
              type="button"
              onClick={handleGoToLogin}
              disabled={isLoading}
            >
              Já tenho conta
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
