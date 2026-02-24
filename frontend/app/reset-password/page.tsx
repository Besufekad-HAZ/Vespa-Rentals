"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/lib/api";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("reset_password_token") ?? "";
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset link. Request a new one.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const data = await resetPassword(token, password, passwordConfirmation);
      if (data?.user?.token) {
        const toStore = {
          user: {
            data: data.user?.data ?? data.user,
            token: data.user?.token,
          },
        };
        localStorage.setItem("vespa_user", JSON.stringify(toStore));
      }
      setSuccess(true);
      setTimeout(() => router.push("/motorcycles"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed. Link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md text-center space-y-6">
        <div className="rounded-2xl border-2 border-vespa/30 bg-white/5 backdrop-blur p-8">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-white font-display">
            Password updated
          </h1>
          <p className="text-white/70 mt-2">Redirecting you to the app…</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full max-w-md text-center space-y-6">
        <div className="rounded-2xl border-2 border-red-500/30 bg-white/5 backdrop-blur p-8">
          <p className="text-red-400">{error}</p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-block text-vespa hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display">
          <span className="text-white">Set new </span>
          <span className="text-vespa">password</span>
        </h1>
        <p className="text-white/60 mt-2 text-sm">
          Enter your new password below.
        </p>
      </div>
      <div className="rounded-2xl border-2 border-vespa/30 bg-white/5 backdrop-blur p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-white/80 mb-1">
              Confirm password
            </label>
            <input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength={6}
              className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition"
              placeholder="Same as above"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-vespa w-full rounded-xl font-semibold py-3 px-4 disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
      <p className="text-center text-white/50 text-sm">
        <Link href="/" className="text-vespa hover:underline">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#1a0f0a] via-[#0f0a08] to-[#0a0a0f">
      <Suspense fallback={<div className="text-white/60">Loading…</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
