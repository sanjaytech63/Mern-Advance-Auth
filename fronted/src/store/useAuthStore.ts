import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginService,
  registerService,
  logoutRequestService,
} from "../api/authService";
import type {
  AuthResponse,
  AuthState,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";
import { AxiosError } from "axios";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      success: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user: User, token: string) => set({ user, token }),

      registerUser: async (data: RegisterPayload): Promise<AuthResponse> => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await registerService(data);
          const { user, token } = res.data;
          set({ user, token, isLoading: false, success: true });
          return res;
        } catch (err: unknown) {
          const error = err as AxiosError<{ message: string }>;
          set({
            error: error.response?.data?.message || error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      loginUser: async (data: LoginPayload): Promise<AuthResponse> => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await loginService(data);
          const { user, token } = res.data;
          set({ user, token, isLoading: false, success: true });

          return res;
        } catch (err: unknown) {
          const error = err as AxiosError<{ message: string }>;
          set({
            error: error.response?.data?.message || error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      logoutUser: async (): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          await logoutRequestService();
          set({ user: null, token: null, isLoading: false });
        } catch (err: unknown) {
          const error = err as AxiosError<{ message: string }>;
          set({
            error: error.response?.data?.message || error.message,
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
