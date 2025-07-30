import React, { useState } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { useAuth, AuthProvider } from '../../contexts/authcontext'
import { api } from '../../services/api'

// Mock the API service
jest.mock('../../services/api', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
    request: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Create a test component to test the hook
const TestComponent = () => {
  const auth = useAuth()
  return (
    <div>
      <div data-testid="user">{auth.user ? JSON.stringify(auth.user) : 'no-user'}</div>
      <div data-testid="loading">{auth.loading ? 'loading' : 'not-loading'}</div>
      <button
        data-testid="sign-in-button"
        onClick={() => auth.signIn({ email: 'john@example.com', password: 'password123' })}
      >
        Sign In
      </button>
      <button data-testid="sign-out-button" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

const renderAuthComponent = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )
}

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      session: {
        access_token: 'fake-token',
      },
    }

    ;(api.post as jest.Mock).mockResolvedValueOnce(apiResponse)

    renderAuthComponent()

    expect(screen.getByTestId('loading')).toHaveTextContent('not-loading')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')

    act(() => {
      screen.getByTestId('sign-in-button').click()
    })

    // Wait for the API call to resolve
    await screen.findByText('not-loading')

    expect(api.post).toHaveBeenCalledWith('/auth/token', {
      email: 'john@example.com',
      password: 'password123',
    })

    expect(localStorage.getItem('@FinanceControl:token')).toBe('fake-token')
    expect(localStorage.getItem('@FinanceControl:user')).toBe(JSON.stringify(apiResponse.user))

    // Como estamos usando fetch em vez de axios, não verificamos mais o header Authorization
    // O token é adicionado em cada requisição pelo interceptor na api.ts
  })

  it('should restore saved data from localStorage', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    }

    localStorage.setItem('@FinanceControl:token', 'fake-token')
    localStorage.setItem('@FinanceControl:user', JSON.stringify(user))

    renderAuthComponent()

    expect(screen.getByTestId('user')).not.toHaveTextContent('no-user')
    // Como estamos usando fetch em vez de axios, não verificamos mais o header Authorization
    // O token é adicionado em cada requisição pelo interceptor na api.ts
  })

  it('should be able to sign out', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    }

    localStorage.setItem('@FinanceControl:token', 'fake-token')
    localStorage.setItem('@FinanceControl:user', JSON.stringify(user))

    renderAuthComponent()

    // Verify user is logged in
    expect(screen.getByTestId('user')).not.toHaveTextContent('no-user')

    act(() => {
      screen.getByTestId('sign-out-button').click()
    })

    expect(localStorage.getItem('@FinanceControl:token')).toBeNull()
    expect(localStorage.getItem('@FinanceControl:user')).toBeNull()
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
  })

  it('should not update user state if sign in fails', async () => {
    // Configure mock to reject with error
    jest.spyOn(api, 'post').mockImplementationOnce(() => {
      return Promise.reject(new Error('Invalid credentials'))
    })

    // Create a custom TestComponent that handles the error
    const TestComponentWithErrorHandling = () => {
      const auth = useAuth()
      const [error, setError] = useState<string | null>(null)

      const handleSignIn = async () => {
        try {
          await auth.signIn({ email: 'john@example.com', password: 'password123' })
        } catch (err) {
          setError('Error occurred')
        }
      }

      return (
        <div>
          <div data-testid="user">{auth.user ? JSON.stringify(auth.user) : 'no-user'}</div>
          <div data-testid="loading">{auth.loading ? 'loading' : 'not-loading'}</div>
          <div data-testid="error">{error}</div>
          <button data-testid="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      )
    }

    // Render the component with error handling
    render(
      <AuthProvider>
        <TestComponentWithErrorHandling />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('not-loading')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')

    // Click the sign-in button
    fireEvent.click(screen.getByTestId('sign-in-button'))

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Error occurred')
    })

    expect(api.post).toHaveBeenCalledWith('/auth/token', {
      email: 'john@example.com',
      password: 'password123',
    })

    expect(localStorage.getItem('@FinanceControl:token')).toBeNull()
    expect(localStorage.getItem('@FinanceControl:user')).toBeNull()

    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
  })
})
