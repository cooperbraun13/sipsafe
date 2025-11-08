/*
* Database Types
* 
* TypeScript types for database tables.
*/

export type User = {
  zagmail: string; // PK (only @zagmail.gonzaga.edu allowed in app/DB)
  created_at: string;
  deleted_at?: string | null;
};

export type Profile = {
  zagmail: string; // FK -> User
  weight_lbs: number;
  height_in: number;
  gender: 'female'|'male';
  emergency_phone?: string | null;
};

export type Session = {
  session_id: string;
  zagmail: string; // FK -> User
  start_time: string;
  end_time?: string | null;
  last_drink_at?: string | null; // optional; can compute from Drinks
  bac: number;
};

export type Beverage = {
  type: string; // e.g., 'beer', 'wine', 'whiskey_shot'
  alc_pct: number; // fraction 0..1 (e.g., 0.05 for 5%)
};

export type Drink = {
  drink_id: string; // uuid string (keeps rows distinct)
  session_id: string; // FK -> Session
  type: string; // FK -> Beverage.type (keeps it simple—no numeric IDs)
  volume_oz: number; // e.g., 12.0
  consumed_at: string;
};