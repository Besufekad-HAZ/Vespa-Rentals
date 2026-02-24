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
      <div className="glass rounded-2xl p-12 text-center text-white/60">
        <p className="text-xl font-medium">No scooters listed yet.</p>
        <p className="mt-2 text-sm">Sign in and add your first Vespa to get started.</p>
        <Link href="/signup" className="btn-vespa mt-6 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold">
          Create account
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {motorcycles.map((m) => (
        <article
          key={m.id}
          className="glass rounded-2xl overflow-hidden transition-all hover:border-vespa/40 hover:shadow-[0_0_24px_rgba(216,72,0,0.15)] flex flex-col"
        >
          <Link href={`/motorcycles/${m.id}`} className="block flex-1">
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
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="font-semibold text-lg text-white" style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}>
                {m.name}
              </h2>
              <p className="text-sm text-vespa font-medium">{m.model}</p>
              <p className="text-sm text-white/60 mt-1 line-clamp-2 flex-1">
                {m.description}
              </p>
              {m.user?.username && (
                <p className="text-xs text-white/45 mt-2">
                  Hosted by {m.user.username}
                </p>
              )}
            </div>
          </Link>
          <div className="p-5 pt-0">
            <Link
              href={`/motorcycles/${m.id}`}
              className="btn-vespa block w-full rounded-xl py-2.5 text-center text-sm font-semibold"
            >
              View details & reserve
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function MotorcyclesPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center sm:px-10 sm:py-10">
        <h1
          className="text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}
        >
          Browse scooters
        </h1>
        <p className="mt-2 max-w-xl mx-auto text-white/70">
          Choose a Vespa for your next ride. Click any listing to see details and book.
        </p>
      </section>
      <MotorcycleList />
    </div>
  );
}
