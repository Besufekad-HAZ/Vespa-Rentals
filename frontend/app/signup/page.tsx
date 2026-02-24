import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Create account</span>
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            Sign up to list your Vespa or make reservations.
          </p>
        </div>
        <div className="glass p-6 rounded-xl">
          <SignupForm />
        </div>
        <p className="text-center text-white/50 text-sm">
          Already have an account?{" "}
          <Link href="/" className="text-[#00ff99] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
