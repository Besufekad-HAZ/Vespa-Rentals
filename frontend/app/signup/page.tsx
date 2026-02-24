import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#1a0f0a] via-[#0f0a08] to-[#0a0a0f">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-display">
            <span className="text-white">Create </span>
            <span className="text-vespa">account</span>
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            Sign up to list your Vespa or make reservations.
          </p>
        </div>
        <div className="glass p-6 rounded-2xl border-2 border-vespa/20">
          <SignupForm />
        </div>
        <p className="text-center text-white/50 text-sm">
          Already have an account?{" "}
          <Link href="/" className="text-vespa hover:text-vespa-light font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
