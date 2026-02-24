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
      <div className="glass rounded-2xl border-red-500/30 p-6 text-red-400">
        {error}
        <Link href="/motorcycles" className="mt-4 inline-block text-vespa font-medium">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white font-display">My motorcycles</h1>
        <Link
          href="/motorcycles/new"
          className="btn-vespa rounded-xl font-semibold py-2.5 px-5 inline-flex items-center justify-center w-fit"
        >
          Add bike
        </Link>
      </div>
      {list.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-white/60">
          <p className="text-lg">You haven&apos;t listed any motorcycles yet.</p>
          <Link href="/motorcycles/new" className="mt-4 inline-block text-vespa hover:text-vespa-light font-medium transition-colors">
            Add your first Vespa
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <div key={m.id} className="glass rounded-2xl overflow-hidden border-vespa/10">
              <div className="aspect-[4/3] bg-white/5 overflow-hidden">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-white/20">
                    🛵
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h2 className="font-semibold text-lg text-white font-display">{m.name}</h2>
                <p className="text-sm text-vespa font-medium">{m.model}</p>
                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/motorcycles/${m.id}`}
                    className="flex-1 text-center rounded-xl border border-white/20 py-2 text-sm font-medium text-white/80 hover:border-vespa/50 hover:text-vespa transition-colors"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    className="rounded-xl border border-red-500/50 py-2 px-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
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
