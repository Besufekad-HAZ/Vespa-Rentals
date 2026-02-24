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
      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center text-white/70">
        {error}
        <p className="mt-2 text-sm">
          Run the Rails backend on port 4000 and set NEXT_PUBLIC_API_URL.
        </p>
      </div>
    );
  }

  if (motorcycles.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/60">
        <p>No motorcycles listed yet.</p>
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
          className="glass rounded-xl overflow-hidden transition-all hover:border-[#00ff99]/50 hover:shadow-[0_0_20px_rgba(0,255,153,0.1)]"
        >
          <div className="aspect-video bg-white/5 flex items-center justify-center">
            {m.photo ? (
              <img
                src={m.photo}
                alt={m.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-white/20">🛵</span>
            )}
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-white">{m.name}</h2>
            <p className="text-sm text-[#00ff99]">{m.model}</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Browse motorcycles</h1>
      </div>
      <MotorcycleList />
    </div>
  );
}
