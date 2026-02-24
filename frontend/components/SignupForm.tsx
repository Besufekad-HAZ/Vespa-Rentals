"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api";

export default function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signup(username, email, password);
      const toStore = {
        user: {
          data: data.user?.data ?? data.user,
          token: data.user?.token ?? data.token,
        },
      };
      localStorage.setItem("vespa_user", JSON.stringify(toStore));
      router.push("/motorcycles");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm text-white/70 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-[#00ff99] focus:outline-none"
          placeholder="johndoe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-white/70 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-[#00ff99] focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-white/70 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-[#00ff99] focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#00ff99] text-[#0a0a0f] font-medium py-2 px-4 hover:bg-[#00e187] transition-colors disabled:opacity-50"
      >
        {loading ? "Creating account…" : "Sign up"}
      </button>
    </form>
  );
}
