import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  login,
  register,
  logoutRequest,
  type RegisterPayload,
  type LoginPayload,
} from "../api/authService";
import type { AuthResponse, AuthState, User } from "@/types/auth";

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
          const res: AuthResponse = await register(data);
          set({ user: res.user, token: res.token, isLoading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || err.message,
            isLoading: false,
          });
        }
      },

      loginUser: async (data: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await login(data);
          set({ user: res.user, token: res.token, isLoading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || err.message,
            isLoading: false,
          });
        }
      },

      logoutUser: async () => {
        set({ isLoading: true, error: null });
        try {
          await logoutRequest();
          set({ user: null, token: null, isLoading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || err.message,
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
