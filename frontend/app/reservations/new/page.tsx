"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getMotorcycles, createReservation } from "@/lib/api";
import type { Motorcycle as Moto } from "@/lib/types";

const CITIES = [
  "Addis Ababa",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Philadelphia",
];

function NewReservationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("motorcycle_id");

  const [motorcycles, setMotorcycles] = useState<Moto[]>([]);
  const [motorcycleId, setMotorcycleId] = useState(preselectedId || "");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("vespa_user")) {
      router.replace("/");
      return;
    }
    getMotorcycles()
      .then(setMotorcycles)
      .catch(() => setError("Could not load motorcycles"));
  }, [router]);

  useEffect(() => {
    if (preselectedId) setMotorcycleId(preselectedId);
  }, [preselectedId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createReservation({
        motorcycle_id: Number(motorcycleId),
        city,
        start_date: startDate,
        end_date: endDate,
      });
      router.push("/reservations");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create reservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href="/reservations"
        className="text-white/60 hover:text-vespa text-sm font-medium transition-colors inline-block"
      >
        ← Reservations
      </Link>
      <h1 className="text-3xl font-bold text-white font-display mt-4">New reservation</h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl border-vespa/20 p-6 mt-6 space-y-4">
        <div>
          <label htmlFor="motorcycle_id" className="block text-sm font-medium text-white/80 mb-1">Motorcycle</label>
          <select
            id="motorcycle_id"
            value={motorcycleId}
            onChange={(e) => setMotorcycleId(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition"
          >
            <option value="">Select a motorcycle</option>
            {motorcycles.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.model})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-1">City</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition"
          >
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-white/80 mb-1">Start date</label>
          <input
            id="start_date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-white/80 mb-1">End date</label>
          <input
            id="end_date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-vespa w-full rounded-xl font-semibold py-3 px-4 disabled:opacity-50"
        >
          {loading ? "Booking…" : "Create reservation"}
        </button>
      </form>
    </div>
  );
}

export default function NewReservationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto">
          <div className="glass rounded-2xl border-vespa/20 p-6 mt-6 text-center text-white/70">
            Loading reservation form…
          </div>
        </div>
      }
    >
      <NewReservationForm />
    </Suspense>
  );
}
