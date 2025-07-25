/* eslint-disable prettier/prettier */
/**
 * User related types
 */
export interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
  createdAt?: string
}

export interface UserProfile extends Omit<User, 'token'> {}

export interface AuthUser extends Omit<User, 'avatarUrl' | 'createdAt'> {
  token?: string
}

/**
 * Transaction related types
 */
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface ITransaction {
  id: string
  userId: string
  title: string
  type: TransactionType
  category: string
  amount: number
  createdAt: string
  updatedAt?: string
}

export interface ICreateTransactionData {
  title: string
  type: TransactionType
  category: string
  amount: number
}

export interface IUpdateTransactionData extends Partial<ICreateTransactionData> {}

export interface ITransactionFilters {
  page?: number
  limit?: number
  type?: TransactionType
  category?: string
  startDate?: string
  endDate?: string
}

export interface ITransactionSummary {
  totalIncome: number
  totalExpense: number
  balance: number
  transactionCount: number
  period?: string
}

/**
 * Authentication related interfaces
 */
export interface SignUpData {
  email: string
  password: string
  displayName: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
  refreshToken?: string
}

export interface AuthRepository {
  signUp(data: SignUpData): Promise<AuthResponse>
  signIn(data: SignInData): Promise<AuthResponse>
  signOut(): Promise<void>
  getCurrentUser(): Promise<User | null>
  refreshToken(): Promise<string>
  isAuthenticated(): Promise<boolean>
  getToken(): Promise<string | null>
  checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }>
}

/**
 * Pagination interface
 */
export interface IPaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * Transaction repository interface
 */
export interface ITransactionRepository {
  getTransactions(filters?: ITransactionFilters): Promise<IPaginatedResponse<ITransaction>>
  getTransactionById(id: string): Promise<ITransaction>
  createTransaction(data: ICreateTransactionData): Promise<ITransaction>
  updateTransaction(id: string, data: IUpdateTransactionData): Promise<ITransaction>
  deleteTransaction(id: string): Promise<void>
  getTransactionSummary(period?: string): Promise<ITransactionSummary>
}

/**
 * Common types
 */
export interface ApiError {
  message: string
  code?: string
  details?: any
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface FormState<T> extends LoadingState {
  data: T
  isDirty: boolean
  isValid: boolean
}

/**
 * Event types
 */
export interface FormEvent {
  preventDefault: () => void
}

/**
 * Component props types
 */
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value?: string | number
  onChange?: (value: string) => void
  onBlur?: () => void
  error?: string
  disabled?: boolean
  required?: boolean
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}
