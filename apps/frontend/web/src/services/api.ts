// API service for authentication

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3002'

interface RequestOptions extends RequestInit {
  headers: HeadersInit
}

export const api = {
  async request<T>(endpoint: string, options: RequestOptions = { headers: {} }): Promise<T> {
    const token = localStorage.getItem('@FinanceControl:token')

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await fetch(`${baseURL}${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json()
  },

  get<T>(endpoint: string, options: RequestOptions = { headers: {} }): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(endpoint: string, data: any, options: RequestOptions = { headers: {} }): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
  },

  put<T>(endpoint: string, data: any, options: RequestOptions = { headers: {} }): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
  },

  delete<T>(endpoint: string, options: RequestOptions = { headers: {} }): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  },
}
