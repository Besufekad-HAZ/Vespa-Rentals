import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0b0a0d]/80">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
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
                <li><Link href="/motorcycles" className="hover:text-vespa transition-colors">Browse scooters</Link></li>
                <li><Link href="/signup" className="hover:text-vespa transition-colors">Create account</Link></li>
                <li><Link href="/" className="hover:text-vespa transition-colors">Log in</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-white/90">Account</p>
              <ul className="space-y-1.5 text-white/60">
                <li><Link href="/account" className="hover:text-vespa transition-colors">My account</Link></li>
                <li><Link href="/reservations" className="hover:text-vespa transition-colors">My reservations</Link></li>
                <li><Link href="/motorcycles/my" className="hover:text-vespa transition-colors">My listings</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {currentYear} Vespa Rentals. Built for portfolio demonstration.
        </div>
      </div>
    </footer>
  );
}
