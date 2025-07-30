import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../pages/Login'
import { AuthProvider } from '../../contexts/authcontext'

// Mock SVG imports
jest.mock('../../assets/logologin.svg', () => ({
  ReactComponent: () => <div data-testid="logo-mock">Logo Mock</div>,
}))

// Mock image imports
jest.mock('../../assets/bg-login.jpg', () => 'mocked-image-path')

// Mock the auth context
const mockSignIn = jest.fn().mockImplementation((credentials) => {
  if (credentials.email === 'valid@example.com' && credentials.password === 'password123') {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Invalid credentials'))
})

const mockSignOut = jest.fn()

jest.mock('../../contexts/authcontext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    signIn: mockSignIn,
    loading: false,
    user: null,
    signOut: mockSignOut,
  }),
}))

// Mock the react-router-dom
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock styled components
jest.mock('../../components/Form/styles/global', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
  ContentBackground: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content-background">{children}</div>
  ),
  ContentForm: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content-form">{children}</div>
  ),
  BgloginStyles: ({
    children,
    style,
  }: {
    children?: React.ReactNode
    style?: React.CSSProperties
  }) => (
    <div data-testid="bg-login-styles" style={style}>
      {children}
    </div>
  ),
}))

// Mock form components
jest.mock('../../components/Form/Button', () => {
  return function MockButton({
    children,
    type,
    disabled,
    isActive,
    name,
  }: {
    children: React.ReactNode
    type: 'submit' | 'reset' | 'button' | undefined
    disabled: boolean
    isActive: string
    name: string
  }) {
    return (
      <button
        type={type as 'submit' | 'reset' | 'button' | undefined}
        disabled={disabled}
        data-testid={`button-${name}`}
      >
        {children}
      </button>
    )
  }
})

jest.mock('../../components/Form/Input', () => {
  return function MockInput({
    type,
    placeholder,
    value,
    onChange,
    error,
  }: {
    type: string
    placeholder: string
    value: string
    onChange: (e: any) => void
    error: string
  }) {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid={`input-${placeholder}`}
        />
        {error && <span data-testid={`error-${placeholder}`}>{error}</span>}
      </div>
    )
  }
})

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Login Page', () => {
  it('renders login form correctly', () => {
    renderLoginPage()

    expect(screen.getByTestId('input-E-mail')).toBeInTheDocument()
    expect(screen.getByTestId('input-Senha')).toBeInTheDocument()
    expect(screen.getByTestId('button-login')).toBeInTheDocument()
    expect(screen.getByText(/não tem uma conta\?/i)).toBeInTheDocument()
    expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument()
  })

  it('validates form inputs', async () => {
    renderLoginPage()

    const submitButton = screen.getByTestId('button-login')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('error-E-mail')).toBeInTheDocument()
      expect(screen.getByTestId('error-Senha')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    renderLoginPage()

    const emailInput = screen.getByTestId('input-E-mail')
    const submitButton = screen.getByTestId('button-login')

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('error-E-mail')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    renderLoginPage()

    const emailInput = screen.getByTestId('input-E-mail')
    const passwordInput = screen.getByTestId('input-Senha')
    const submitButton = screen.getByTestId('button-login')

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    // Wait for form submission to complete
    await waitFor(() => {
      // Check that no validation errors are displayed
      expect(screen.queryByTestId('error-E-mail')).not.toBeInTheDocument()
      expect(screen.queryByTestId('error-Senha')).not.toBeInTheDocument()
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'valid@example.com',
        password: 'password123',
      })
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('navigates to register page when clicking on register link', () => {
    renderLoginPage()

    const registerLink = screen.getByText(/cadastre-se/i)
    fireEvent.click(registerLink)

    expect(mockNavigate).toHaveBeenCalledWith('/signup')
  })
})
