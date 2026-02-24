"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !!localStorage.getItem("vespa_user");
  } catch {
    return false;
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handler = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", handler);
    window.addEventListener("vespa_user_updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("vespa_user_updated", handler);
    };
  }, [mounted]);

  const showAuthLinks = mounted && !loggedIn;

  return (
    <footer className="mt-auto w-full min-w-0 overflow-x-hidden border-t border-white/10 bg-[#0b0a0d]/80">
      <div className="container mx-auto min-w-0 max-w-[100vw] px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <Link
              href="/motorcycles"
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}
            >
              <span className="text-white">Vespa</span>
              <span className="text-vespa">Rentals</span>
            </Link>
            <p className="mt-2 max-w-sm text-sm text-white/60">
              Premium urban scooter rentals. Book in minutes, ride in style.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="mb-2 font-semibold text-white/90">Explore</p>
              <ul className="space-y-1.5 text-white/60">
                <li>
                  <Link href="/motorcycles" className="hover:text-vespa transition-colors">
                    Browse scooters
                  </Link>
                </li>
                {showAuthLinks && (
                  <>
                    <li>
                      <Link href="/signup" className="hover:text-vespa transition-colors">
                        Create account
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="hover:text-vespa transition-colors">
                        Log in
                      </Link>
                    </li>
                  </>
                )}
                {mounted && loggedIn && (
                  <li>
                    <Link href="/account" className="hover:text-vespa transition-colors">
                      My account
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {mounted && loggedIn && (
              <div>
                <p className="mb-2 font-semibold text-white/90">Account</p>
                <ul className="space-y-1.5 text-white/60">
                  <li>
                    <Link href="/account" className="hover:text-vespa transition-colors">
                      My account
                    </Link>
                  </li>
                  <li>
                    <Link href="/reservations" className="hover:text-vespa transition-colors">
                      My reservations
                    </Link>
                  </li>
                  <li>
                    <Link href="/motorcycles/my" className="hover:text-vespa transition-colors">
                      My listings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {currentYear} Vespa Rentals. Built with ❤️ by Besutech.
        </div>
      </div>
    </footer>
  );
}
