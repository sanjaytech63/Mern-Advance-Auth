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
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user: User, token: string) => set({ user, token }),

      registerUser: async (data: RegisterPayload) => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await registerService(data);
          set({ user: res.user, token: res.token, isLoading: false });
        } catch (err: unknown) {
          const error = err as AxiosError<{ message: string }>;
          set({
            error: error.response?.data?.message || error.message,
            isLoading: false,
          });
        }
      },

      loginUser: async (data: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await loginService(data);
          set({ user: res.user, token: res.token, isLoading: false });
        } catch (err: unknown) {
          const error = err as AxiosError<{ message: string }>;
          set({
            error: error.response?.data?.message || error.message,
            isLoading: false,
          });
        }
      },

      logoutUser: async () => {
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
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
