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
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  setUser: (user: User, token: string) => void;
  registerUser: (data: RegisterPayload) => Promise<AuthResponse>;
  loginUser: (data: LoginPayload) => Promise<AuthResponse>;
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
  message: string | null;
  response?: () => void;
}

export interface ForgotPasswordPayload {
  email: string | null;
}

export interface ResetPasswordPayload {
  newPassword: string;
}
