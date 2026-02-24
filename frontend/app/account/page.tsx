"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";
import type { User } from "@/lib/types";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("vespa_user") : null;
    if (!token) {
      router.replace("/");
      return;
    }
    getCurrentUser()
      .then((data) => {
        const u = data && typeof data === "object" && "username" in data ? data : (data as { user?: User })?.user;
        if (u && (u.id || u.username)) setUser(u as User);
      })
      .catch(() => router.replace("/"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-white/60">Loading your account…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initial = (user.username || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1
        className="text-3xl font-bold text-white"
        style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}
      >
        My account
      </h1>

      <div className="glass rounded-2xl border border-white/15 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-vespa text-3xl font-bold text-white ring-4 ring-vespa/30">
            {initial}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-white">{user.username}</h2>
            {user.email && <p className="mt-1 text-sm text-white/60">{user.email}</p>}
            <p className="mt-2 text-xs text-white/50">Member</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/motorcycles/my"
            className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-white/90 hover:border-vespa/40 hover:bg-white/10 transition-colors"
          >
            <span className="font-medium">My listings</span>
            <span className="text-vespa">→</span>
          </Link>
          <Link
            href="/reservations"
            className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-white/90 hover:border-vespa/40 hover:bg-white/10 transition-colors"
          >
            <span className="font-medium">My reservations</span>
            <span className="text-vespa">→</span>
          </Link>
          <Link
            href="/motorcycles/new"
            className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-white/90 hover:border-vespa/40 hover:bg-white/10 transition-colors"
          >
            <span className="font-medium">Add a scooter</span>
            <span className="text-vespa">→</span>
          </Link>
          <Link
            href="/reservations/new"
            className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-white/90 hover:border-vespa/40 hover:bg-white/10 transition-colors"
          >
            <span className="font-medium">New booking</span>
            <span className="text-vespa">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
