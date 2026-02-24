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
      <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-white/70">Motorcycle not found.</p>
        <Link href="/motorcycles" className="mt-4 inline-block text-[#00ff99] hover:underline">
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/motorcycles" className="text-white/60 hover:text-[#00ff99] text-sm transition-colors">
        ← Back to list
      </Link>
      <div className="glass rounded-xl overflow-hidden">
        <div className="aspect-video bg-white/5 flex items-center justify-center">
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
          <h1 className="text-2xl font-bold text-white">{motorcycle.name}</h1>
          <p className="text-[#00ff99] font-medium">{motorcycle.model}</p>
          {motorcycle.user?.username && (
            <p className="text-sm text-white/50 mt-1">
              Listed by {motorcycle.user.username}
            </p>
          )}
          <p className="text-white/80 mt-4 leading-relaxed">
            {motorcycle.description}
          </p>
          <div className="mt-6">
            <Link
              href={`/reservations/new?motorcycle_id=${motorcycle.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-[#00ff99] text-[#0a0a0f] font-medium py-2 px-5 hover:bg-[#00e187] transition-colors"
            >
              Reserve this bike
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
