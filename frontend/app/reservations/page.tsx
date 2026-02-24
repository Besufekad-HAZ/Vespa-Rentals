"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getReservations } from "@/lib/api";
import type { Reservation } from "@/lib/types";

export default function ReservationsPage() {
  const router = useRouter();
  const [list, setList] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !localStorage.getItem("vespa_user")) {
      router.replace("/");
      return;
    }
    getReservations()
      .then(setList)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="text-center text-white/60 py-12">Loading reservations…</div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-red-400">
        {error}
        <Link href="/motorcycles" className="mt-4 inline-block text-[#00ff99]">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My reservations</h1>
        <Link
          href="/reservations/new"
          className="rounded-lg bg-[#00ff99] text-[#0a0a0f] font-medium py-2 px-4 hover:bg-[#00e187] transition-colors"
        >
          New booking
        </Link>
      </div>
      {list.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center text-white/60">
          <p>No reservations yet.</p>
          <Link href="/reservations/new" className="mt-4 inline-block text-[#00ff99] hover:underline">
            Book a motorcycle
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((r) => (
            <div
              key={r.id}
              className="glass rounded-xl p-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium text-white">
                  {r.motorcycle?.name ?? `Motorcycle #${r.motorcycle_id}`}
                </p>
                <p className="text-sm text-white/60">
                  {r.city} · {r.start_date} to {r.end_date}
                </p>
              </div>
              <Link
                href={`/motorcycles/${r.motorcycle_id}`}
                className="text-sm text-[#00ff99] hover:underline"
              >
                View bike
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
