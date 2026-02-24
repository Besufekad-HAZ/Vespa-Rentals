"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createMotorcycle } from "@/lib/api";

export default function NewMotorcyclePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (typeof window === "undefined" || !localStorage.getItem("vespa_user")) {
      router.replace("/");
      return;
    }
    setLoading(true);
    try {
      await createMotorcycle({ name, model, description, photo });
      router.push("/motorcycles/my");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link href="/motorcycles/my" className="text-white/60 hover:text-vespa text-sm font-medium transition-colors inline-block">
        ← My motorcycles
      </Link>
      <h1 className="text-3xl font-bold text-white font-display mt-4">Add a motorcycle</h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl border-vespa/20 p-6 mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition"
            placeholder="e.g. Vespa Primavera"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-white/80 mb-1">Model</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition"
            placeholder="e.g. 2024"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition resize-none"
            placeholder="Short description and condition..."
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-white/80 mb-1">Photo URL</label>
          <input
            id="photo"
            type="url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
            className="input-vespa w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition"
            placeholder="https://..."
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-vespa w-full rounded-xl font-semibold py-3 px-4 disabled:opacity-50"
        >
          {loading ? "Adding…" : "Add motorcycle"}
        </button>
      </form>
    </div>
  );
}
