"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLoggedIn = mounted && !!localStorage.getItem("vespa_user");

  const handleLogout = () => {
    localStorage.removeItem("vespa_user");
    router.push("/");
    router.refresh();
  };

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={
        pathname === href
          ? "text-[#00ff99] font-medium"
          : "text-white/70 hover:text-[#00ff99] transition-colors"
      }
    >
      {label}
    </Link>
  );

  return (
    <header className="border-b border-white/10 sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/motorcycles" className="text-xl font-bold">
          <span className="text-white">Vespa</span>
          <span className="text-[#00ff99]">Rentals</span>
        </Link>
        <nav className="flex items-center gap-6">
          {link("/motorcycles", "Browse")}
          {isLoggedIn && (
            <>
              {link("/motorcycles/my", "My Bikes")}
              {link("/motorcycles/new", "Add Bike")}
              {link("/reservations", "Reservations")}
              {link("/reservations/new", "New Booking")}
              <button
                type="button"
                onClick={handleLogout}
                className="text-white/70 hover:text-red-400 transition-colors text-sm"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
