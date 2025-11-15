export interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User, token: string) => void;
  registerUser: (data: RegisterPayload) => Promise<void>;
  loginUser: (data: LoginPayload) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
}