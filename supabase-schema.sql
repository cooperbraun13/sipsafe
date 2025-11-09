-- Supabase Database Schema for SipSafe

-- Users table
CREATE TABLE users (
  zagmail VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  PRIMARY KEY (zagmail),
  CONSTRAINT valid_zagmail CHECK (zagmail LIKE '%@zagmail.gonzaga.edu')
);

-- Profiles table (one-to-one with users)
CREATE TABLE profiles (
  zagmail VARCHAR(50),
  weight_lbs NUMERIC(6, 2) NOT NULL,
  height_in NUMERIC(6, 2) NOT NULL,
  sex TEXT NOT NULL,
  emergency_phone TEXT,
  PRIMARY KEY (zagmail),
  FOREIGN KEY (zagmail) REFERENCES users(zagmail),
  CONSTRAINT valid_weight CHECK (weight_lbs > 0),
  CONSTRAINT valid_height CHECK (height_in > 0),
  CONSTRAINT valid_gender CHECK (sex IN ('female', 'male')),
  CONSTRAINT valid_zagmail CHECK (zagmail LIKE '%@zagmail.gonzaga.edu')
);

-- Beverages table (reference data)
CREATE TABLE beverages (
  type VARCHAR(50),
  alc_pct NUMERIC(5, 4) NOT NULL,
  PRIMARY KEY (type),
  CONSTRAINT valid_alc_pct CHECK (alc_pct >= 0 AND alc_pct <= 1)
);

-- Sessions table
CREATE TABLE sessions (
  session_id SERIAL PRIMARY KEY,
  zagmail VARCHAR(50) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  bac NUMERIC(5, 4) NOT NULL DEFAULT 0,
  FOREIGN KEY (zagmail) REFERENCES users(zagmail),
  CONSTRAINT valid_bac CHECK (bac >= 0)
);

-- Drinks table
CREATE TABLE drinks (
  session_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  volume_oz NUMERIC(5, 2) NOT NULL,
  duration INTERVAL NOT NULL,
  PRIMARY KEY (session_id, type, time),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (type) REFERENCES beverages(type),
  CONSTRAINT valid_volume_oz CHECK (volume_oz > 0),
  CONSTRAINT valid_duration CHECK (duration > INTERVAL '0')
);

-- Insert default beverage types
INSERT INTO beverages (type, alc_pct) VALUES
  ('beer', 0.05),
  ('wine', 0.12),
  ('whiskey_shot', 0.40)
ON CONFLICT (type) DO NOTHING;