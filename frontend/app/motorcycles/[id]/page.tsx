import Link from "next/link";
import { getMotorcycle } from "@/lib/api";
import type { Motorcycle as Moto } from "@/lib/types";

export default async function MotorcycleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let motorcycle: Moto | null = null;
  try {
    motorcycle = await getMotorcycle(id);
  } catch {
    // not found
  }

  if (!motorcycle) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-white/70">Motorcycle not found.</p>
        <Link href="/motorcycles" className="mt-4 inline-block text-vespa hover:text-vespa-light font-medium transition-colors">
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/motorcycles" className="text-white/60 hover:text-vespa text-sm font-medium transition-colors inline-block">
        ← Back to list
      </Link>
      <div className="glass rounded-2xl overflow-hidden border-vespa/20">
        <div className="aspect-video bg-white/5 flex items-center justify-center overflow-hidden">
          {motorcycle.photo ? (
            <img
              src={motorcycle.photo}
              alt={motorcycle.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl text-white/20">🛵</span>
          )}
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui" }}>{motorcycle.name}</h1>
          <p className="text-vespa font-semibold">{motorcycle.model}</p>
          {motorcycle.user?.username && (
            <p className="text-sm text-white/50 mt-1">
              Hosted by {motorcycle.user.username}
            </p>
          )}
          <p className="text-white/80 mt-4 leading-relaxed">
            {motorcycle.description}
          </p>
          <div className="mt-6">
            <Link
              href={`/reservations/new?motorcycle_id=${motorcycle.id}`}
              className="btn-vespa inline-flex items-center justify-center rounded-xl font-semibold py-3 px-6"
            >
              Reserve this bike
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
