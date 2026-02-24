"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      const toStore = {
        user: {
          data: data.user?.data ?? data.user,
          token: data.user?.token ?? data.token,
        },
      };
      localStorage.setItem("vespa_user", JSON.stringify(toStore));
      if (typeof window !== "undefined") window.dispatchEvent(new Event("vespa_user_updated"));
      router.push("/motorcycles");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/85">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-vespa w-full rounded-xl border border-white/25 px-4 py-3 text-base outline-none transition"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-white/85">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#ffb073] hover:text-[#f3700c] transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-vespa w-full rounded-xl border border-white/25 px-4 py-3 text-base outline-none transition"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-vespa w-full rounded-xl px-4 py-3 text-base font-semibold tracking-wide disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
