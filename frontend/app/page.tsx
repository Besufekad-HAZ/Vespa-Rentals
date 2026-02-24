import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">Vespa</span>
            <span className="text-[#00ff99]">Rentals</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Rent a scooter or list your own. Sign in or create an account.
          </p>
        </div>
        <div className="glass p-6 rounded-xl">
          <LoginForm />
        </div>
        <p className="text-center text-white/50 text-sm">
          No account?{" "}
          <Link href="/signup" className="text-[#00ff99] hover:underline">
            Sign up
          </Link>
        </p>
        <div className="text-center">
          <Link
            href="/motorcycles"
            className="text-white/70 hover:text-[#00ff99] text-sm transition-colors"
          >
            Browse motorcycles without signing in →
          </Link>
        </div>
      </div>
    </div>
  );
}
