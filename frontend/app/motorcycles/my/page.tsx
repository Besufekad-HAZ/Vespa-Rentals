"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMyMotorcycles, deleteMotorcycle } from "@/lib/api";
import type { Motorcycle as Moto } from "@/lib/types";

export default function MyMotorcyclesPage() {
  const router = useRouter();
  const [list, setList] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("vespa_user");
    if (!token) {
      router.replace("/");
      return;
    }
    getMyMotorcycles()
      .then(setList)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this motorcycle?")) return;
    try {
      await deleteMotorcycle(id);
      setList((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white/60 py-12">Loading your bikes…</div>
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
        <h1 className="text-2xl font-bold text-white">My motorcycles</h1>
        <Link
          href="/motorcycles/new"
          className="rounded-lg bg-[#00ff99] text-[#0a0a0f] font-medium py-2 px-4 hover:bg-[#00e187] transition-colors"
        >
          Add bike
        </Link>
      </div>
      {list.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center text-white/60">
          <p>You haven&apos;t listed any motorcycles yet.</p>
          <Link href="/motorcycles/new" className="mt-4 inline-block text-[#00ff99] hover:underline">
            Add your first Vespa
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <div key={m.id} className="glass rounded-xl overflow-hidden">
              <div className="aspect-video bg-white/5">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-white/20">
                    🛵
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-white">{m.name}</h2>
                <p className="text-sm text-[#00ff99]">{m.model}</p>
                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/motorcycles/${m.id}`}
                    className="flex-1 text-center rounded-lg border border-white/20 py-1.5 text-sm text-white/80 hover:border-[#00ff99]/50 transition-colors"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    className="rounded-lg border border-red-500/50 py-1.5 px-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
