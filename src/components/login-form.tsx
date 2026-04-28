"use client";

import { useAuthStore } from "@/store/auth-store";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(username, password);
      toast.success("Logged in successfully");
      router.push("/");
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Welcome Back</h1>
          <p className="text-sm text-zinc-600">Sign in to continue shopping on Camello Market.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700">Username</span>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-400"
                placeholder="Enter username"
              />
            </div>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700">Password</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-zinc-400"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-zinc-500">
          Demo credentials are prefilled from DummyJSON.
        </p>
      </div>
    </section>
  );
}
