// Re-export domain entities
export type { User, UserProfile, AuthUser } from "../../domain/entities/User";
export type {
  ITransaction,
  ICreateTransactionData,
  IUpdateTransactionData,
  ITransactionFilters,
  ITransactionSummary,
} from "../../domain/entities/Transaction";
export { TransactionType } from "../../domain/entities/Transaction";

// Re-export repository interfaces
export type {
  AuthRepository,
  SignUpData,
  SignInData,
  AuthResponse,
} from "../../domain/repositories/AuthRepository";
export type {
  ITransactionRepository,
  IPaginatedResponse,
} from "../../domain/repositories/TransactionRepository";

// Common types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface FormState<T> extends LoadingState {
  data: T;
  isDirty: boolean;
  isValid: boolean;
}

// Event types
export interface FormEvent {
  preventDefault: () => void;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface InputProps extends BaseComponentProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}
