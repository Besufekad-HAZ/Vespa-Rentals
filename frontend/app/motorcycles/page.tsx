import Link from "next/link";
import { getMotorcycles } from "@/lib/api";
import type { Motorcycle as Moto } from "@/lib/types";

async function MotorcycleList() {
  let motorcycles: Moto[] = [];
  let error = "";
  try {
    motorcycles = await getMotorcycles();
  } catch (e) {
    error = "Could not load motorcycles. Is the API running?";
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center text-white/70">
        <p>{error}</p>
        <p className="mt-2 text-sm text-white/50">
          Run the Rails backend on port 4000 and set NEXT_PUBLIC_API_URL.
        </p>
      </div>
    );
  }

  if (motorcycles.length === 0) {
    return (
      <div className="glass rounded-2xl p-10 text-center text-white/60">
        <p className="text-lg">No motorcycles listed yet.</p>
        <p className="mt-2 text-sm">Sign in and add your first Vespa!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {motorcycles.map((m) => (
        <Link
          key={m.id}
          href={`/motorcycles/${m.id}`}
          className="glass rounded-2xl overflow-hidden transition-all hover:border-vespa/40 hover:shadow-[0_0_24px_rgba(216,72,0,0.15)]"
        >
          <div className="aspect-[4/3] bg-white/5 flex items-center justify-center overflow-hidden">
            {m.photo ? (
              <img
                src={m.photo}
                alt={m.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-white/20">🛵</span>
            )}
          </div>
          <div className="p-5">
            <h2 className="font-semibold text-lg text-white font-display">{m.name}</h2>
            <p className="text-sm text-vespa font-medium">{m.model}</p>
            <p className="text-sm text-white/60 mt-1 line-clamp-2">
              {m.description}
            </p>
            {m.user?.username && (
              <p className="text-xs text-white/40 mt-2">
                by {m.user.username}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function MotorcyclesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white font-display">Browse motorcycles</h1>
      </div>
      <MotorcycleList />
    </div>
  );
}
