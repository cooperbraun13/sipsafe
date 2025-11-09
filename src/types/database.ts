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
  sex: 'female'|'male';
  emergency_phone?: string | null;
};

export type Session = {
  session_id: number; // SERIAL (auto-incrementing integer)
  zagmail: string; // FK -> User
  start_time: string;
  end_time?: string | null;
  bac: number;
};

export type Beverage = {
  type: string; // e.g., 'beer', 'wine', 'whiskey_shot'
  alc_pct: number; // fraction 0..1 (e.g., 0.05 for 5%)
};

export type Drink = {
  session_id: number; // FK -> Session (part of composite PK)
  type: string; // FK -> Beverage.type (part of composite PK)
  time: string; // TIMESTAMPTZ (part of composite PK)
  volume_oz: number; // e.g., 12.0
  duration: string; // INTERVAL (e.g., '2 hours', '30 minutes')
};