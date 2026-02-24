"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function getStoredUser(): { username?: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("vespa_user");
    if (!raw) return null;
    const data = JSON.parse(raw);
    const userData = data?.user?.data ?? data?.user;
    return userData && typeof userData.username === "string" ? { username: userData.username } : null;
  } catch {
    return null;
  }
}

function Avatar({ username }: { username: string }) {
  const initial = username.trim().charAt(0).toUpperCase() || "?";
  const second = username.trim().split(/\s+/)[1]?.charAt(0).toUpperCase();
  const display = second ? `${initial}${second}` : initial;
  return (
    <span
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-vespa text-sm font-semibold text-white ring-2 ring-white/20"
      title={username}
    >
      {display}
    </span>
  );
}

function IconLogin() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );
}

function IconSignup() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function IconBike() {
  return (
    <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h-1m4-1V6a1 1 0 011-1h2a1 1 0 011 1v10m-5 1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4-2a2 2 0 110-4m14 4a2 2 0 104 0m-4-2a2 2 0 110-4" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ username?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handler = () => setUser(getStoredUser());
    window.addEventListener("storage", handler);
    window.addEventListener("vespa_user_updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("vespa_user_updated", handler);
    };
  }, [mounted]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isLoggedIn = mounted && !!localStorage.getItem("vespa_user");
  const displayName = user?.username ?? "Account";

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    localStorage.removeItem("vespa_user");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const closeMobile = () => setMobileMenuOpen(false);

  const navLink = (href: string, label: string, icon?: React.ReactNode) => (
    <Link
      href={href}
      className={
        pathname === href
          ? "flex items-center gap-2 text-vespa font-semibold"
          : "flex items-center gap-2 text-white/75 hover:text-vespa transition-colors"
      }
    >
      {icon}
      {label}
    </Link>
  );

  const desktopAuth = (
    <div className="ml-4 flex items-center gap-3 border-l border-white/15 pl-6">
      {!isLoggedIn ? (
        <>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:border-vespa/50 hover:bg-white/10 transition-colors"
          >
            <IconLogin />
            Log in
          </Link>
          <Link
            href="/signup"
            className="btn-vespa flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
          >
            <IconSignup />
            Sign up
          </Link>
        </>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-vespa/50"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <Avatar username={displayName} />
            <span className="hidden max-w-[120px] truncate text-sm text-white/90 sm:inline">{displayName}</span>
            <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/15 bg-[#141218] py-2 shadow-xl">
              <div className="border-b border-white/10 px-4 py-2">
                <p className="truncate text-sm font-medium text-white">{displayName}</p>
                <p className="text-xs text-white/50">Signed in</p>
              </div>
              <Link
                href="/account"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-400 hover:bg-white/10"
              >
                <IconLogout />
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0a0d]/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 min-w-0 items-center justify-between gap-4 px-4">
        <Link
          href="/motorcycles"
          className="flex flex-shrink-0 items-center gap-2 text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}
        >
          <span className="text-white">Vespa</span>
          <span className="text-vespa">Rentals</span>
        </Link>

        {/* Desktop nav: visible from lg (1024px) up to avoid cramping at 768–1000px */}
        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-6 text-sm lg:flex">
          {navLink("/motorcycles", "Browse", <IconBike />)}
          {isLoggedIn && (
            <>
              {navLink("/motorcycles/my", "My Bikes")}
              {navLink("/motorcycles/new", "Add Bike")}
              {navLink("/reservations", "Reservations")}
              {navLink("/reservations/new", "New Booking")}
            </>
          )}
          {desktopAuth}
        </nav>

        {/* Hamburger: shown below lg so 768–1000px use menu instead of cramped links */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0b0a0d] lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            <Link
              href="/motorcycles"
              onClick={closeMobile}
              className={pathname === "/motorcycles" ? "flex items-center gap-3 rounded-lg bg-white/10 py-3 px-4 text-vespa font-semibold" : "flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa"}
            >
              <IconBike />
              Browse
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/motorcycles/my" onClick={closeMobile} className={pathname === "/motorcycles/my" ? "flex items-center gap-3 rounded-lg bg-white/10 py-3 px-4 text-vespa font-semibold" : "flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa"}>
                  My Bikes
                </Link>
                <Link href="/motorcycles/new" onClick={closeMobile} className={pathname === "/motorcycles/new" ? "flex items-center gap-3 rounded-lg bg-white/10 py-3 px-4 text-vespa font-semibold" : "flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa"}>
                  Add Bike
                </Link>
                <Link href="/reservations" onClick={closeMobile} className={pathname === "/reservations" ? "flex items-center gap-3 rounded-lg bg-white/10 py-3 px-4 text-vespa font-semibold" : "flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa"}>
                  Reservations
                </Link>
                <Link href="/reservations/new" onClick={closeMobile} className={pathname === "/reservations/new" ? "flex items-center gap-3 rounded-lg bg-white/10 py-3 px-4 text-vespa font-semibold" : "flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa"}>
                  New Booking
                </Link>
                <div className="my-2 border-t border-white/10" />
                <Link href="/account" onClick={closeMobile} className="flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa">
                  Account
                </Link>
                <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg py-3 px-4 text-left text-red-400 hover:bg-white/10">
                  <IconLogout />
                  Log out
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <div className="my-2 border-t border-white/10" />
                <Link href="/" onClick={closeMobile} className="flex items-center gap-3 rounded-lg py-3 px-4 text-white/80 hover:bg-white/10 hover:text-vespa">
                  <IconLogin />
                  Log in
                </Link>
                <Link href="/signup" onClick={closeMobile} className="btn-vespa mt-2 flex items-center justify-center gap-2 rounded-lg py-3 px-4 font-semibold">
                  <IconSignup />
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
