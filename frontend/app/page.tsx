import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <section className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
            Premium Urban Rentals
          </p>
          <h1
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}
          >
            Ride the city in style with{" "}
            <span className="bg-gradient-to-r from-[#ffb073] to-[#f3700c] bg-clip-text text-transparent">
              VespaRentals
            </span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Discover curated scooters, secure your booking in minutes, and manage every ride from a polished dashboard.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white/75">
            <span className="rounded-full border border-white/15 px-3 py-1">Instant booking</span>
            <span className="rounded-full border border-white/15 px-3 py-1">Trusted hosts</span>
            <span className="rounded-full border border-white/15 px-3 py-1">Flexible dates</span>
          </div>
        </section>

        <section className="glass rounded-2xl border border-white/15 p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h2
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}
            >
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Sign in to manage reservations and listings.
            </p>
          </div>

          <LoginForm />

          <p className="mt-5 text-center text-sm text-white/60">
            No account?{" "}
            <Link href="/signup" className="font-semibold text-[#ff9f59] hover:text-[#f3700c] transition-colors">
              Create one
            </Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/motorcycles" className="text-sm font-medium text-white/80 hover:text-[#ff9f59] transition-colors">
              Browse motorcycles without signing in →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
