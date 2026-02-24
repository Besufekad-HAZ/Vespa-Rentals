const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const API_V1 = `${API_URL}/api/v1`;

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem("vespa_user");
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed?.user?.token ?? parsed?.token ?? null;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Login failed");
  }
  return res.json();
}

export async function signup(username: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { username, email, password } }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Sign up failed");
  }
  return res.json();
}

export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${API_URL}/current_user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

/** Public: all motorcycles */
export async function getMotorcycles() {
  const res = await fetch(`${API_V1}/motorcycles`);
  if (!res.ok) throw new Error("Failed to fetch motorcycles");
  return res.json();
}

/** Public: single motorcycle */
export async function getMotorcycle(id: string) {
  const res = await fetch(`${API_V1}/motorcycles/${id}`);
  if (!res.ok) throw new Error("Motorcycle not found");
  return res.json();
}

/** Auth: my motorcycles */
export async function getMyMotorcycles() {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  const res = await fetch(`${API_V1}/motorcycles/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function createMotorcycle(body: {
  name: string;
  model: string;
  description: string;
  photo: string;
}) {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  const res = await fetch(`${API_V1}/motorcycles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Create failed");
  }
  return res.json();
}

export async function deleteMotorcycle(id: number) {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  const res = await fetch(`${API_V1}/motorcycles/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Delete failed");
}

/** Reservations */
export async function getReservations() {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  const res = await fetch(`${API_V1}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

export async function createReservation(body: {
  start_date: string;
  end_date: string;
  city: string;
  motorcycle_id: number;
}) {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  const res = await fetch(`${API_V1}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservation: body }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Create reservation failed");
  }
  return res.json();
}
