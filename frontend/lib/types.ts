export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface Motorcycle {
  id: number;
  name: string;
  model: string;
  description: string;
  photo: string;
  user_id?: number;
  user?: User;
  created_at?: string;
  updated_at?: string;
}

export interface Reservation {
  id: number;
  start_date: string;
  end_date: string;
  city: string;
  user_id: number;
  motorcycle_id: number;
  motorcycle?: { name: string };
  created_at?: string;
  updated_at?: string;
}
