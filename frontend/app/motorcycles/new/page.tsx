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
      <Link href="/motorcycles/my" className="text-white/60 hover:text-[#00ff99] text-sm">
        ← My motorcycles
      </Link>
      <h1 className="text-2xl font-bold text-white mt-4">Add a motorcycle</h1>
      <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-white/70 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-[#00ff99] focus:outline-none"
            placeholder="e.g. Vespa Primavera"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm text-white/70 mb-1">
            Model
          </label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-[#00ff99] focus:outline-none"
            placeholder="e.g. 2024"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm text-white/70 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-[#00ff99] focus:outline-none resize-none"
            placeholder="Short description and condition..."
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm text-white/70 mb-1">
            Photo URL
          </label>
          <input
            id="photo"
            type="url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-[#00ff99] focus:outline-none"
            placeholder="https://..."
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#00ff99] text-[#0a0a0f] font-medium py-2 px-4 hover:bg-[#00e187] transition-colors disabled:opacity-50"
        >
          {loading ? "Adding…" : "Add motorcycle"}
        </button>
      </form>
    </div>
  );
}
