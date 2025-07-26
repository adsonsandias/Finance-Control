import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authcontext'
import Button from '../../components/Form/Button'
import Input from '../../components/Form/Input'
import {
  Container,
  ContentBackground,
  ContentForm,
  BgloginStyles,
} from '../../components/Form/styles/global'
import { ReactComponent as LogoLogin } from '../../assets/logologin.svg'
import bglogin from '../../assets/bg-login.jpg'

const Login = () => {
  const navigate = useNavigate()
  const { signIn, loading, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: '', password: '' }

    if (!email) {
      newErrors.email = 'E-mail é obrigatório'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de e-mail inválido'
      isValid = false
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await signIn({ email, password })
      navigate('/')
    } catch (error) {
      console.error('Erro no login:', error)
    }
  }

  const handleGoToRegister = () => {
    navigate('/signup')
  }

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

        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Button isActive="sign" name="login" type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p>
                Não tem uma conta?{' '}
                <span
                  onClick={handleGoToRegister}
                  style={{
                    color: 'var(--color-primary)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Cadastre-se
                </span>
              </p>
            </div>
          </div>
        </form>
      </ContentForm>
    </Container>
  )
}

export default Login
