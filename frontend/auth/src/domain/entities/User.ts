export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  token?: string;
}
