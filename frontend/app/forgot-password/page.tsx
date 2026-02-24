"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/api";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <Nav />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="rounded-2xl border-2 border-vespa/30 bg-white/5 backdrop-blur p-8">
            <div className="text-5xl mb-4">✉️</div>
            <h1 className="text-2xl font-bold text-white font-display">
              Check your email
            </h1>
            <p className="text-white/70 mt-2">
              If an account exists for <strong className="text-vespa">{email}</strong>, you
              will receive a link to reset your password.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-vespa text-white font-semibold py-3 px-6 hover:bg-vespa-dark transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-display">
            <span className="text-white">Forgot </span>
            <span className="text-vespa">password?</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>
        <div className="rounded-2xl border-2 border-vespa/30 bg-white/5 backdrop-blur p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-vespa focus:ring-1 focus:ring-vespa/50 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-vespa w-full rounded-xl font-semibold py-3 px-4 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </div>
        <p className="text-center text-white/50 text-sm">
          <Link href="/" className="text-vespa hover:underline">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
