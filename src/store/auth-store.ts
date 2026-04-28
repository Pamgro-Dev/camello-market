"use client";

import { getAuthMe, loginWithDummyAuth } from "@/lib/api";
import { AuthUser } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  hydrateUser: () => Promise<void>;
  setUser: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await loginWithDummyAuth({ username, password, expiresInMins: 60 });
          set({
            user: {
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              image: data.image,
            },
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
            error: null,
          });
        } catch {
          set({
            isLoading: false,
            error: "Invalid username or password",
          });
          throw new Error("Invalid username or password");
        }
      },
      hydrateUser: async () => {
        const token = get().accessToken;
        if (!token) {
          return;
        }

        try {
          const user = await getAuthMe(token);
          set({ user });
        } catch {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
          });
        }
      },
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          error: null,
        });
      },
    }),
    {
      name: "camello-market-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
