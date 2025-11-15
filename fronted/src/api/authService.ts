import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  MessageResponse,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";
import api from "./api";

export const register = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutRequest = async (): Promise<MessageResponse> => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordPayload
): Promise<MessageResponse> => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPassword = async (
  resetToken: string,
  data: ResetPasswordPayload
): Promise<MessageResponse> => {
  const response = await api.post(`/auth/reset-password/${resetToken}`, data);
  return response.data;
};

export const checkAuth = async (): Promise<AuthResponse> => {
  const response = await api.get("/auth/check-auth");
  return response.data;
};
