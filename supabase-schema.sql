-- Supabase Database Schema for SipSafe
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  zagmail TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Profiles table (one-to-one with users)
CREATE TABLE profiles (
  zagmail TEXT PRIMARY KEY REFERENCES users(zagmail) ON DELETE CASCADE,
  weight_lbs NUMERIC(5, 2) NOT NULL CHECK (weight_lbs > 0),
  height_in NUMERIC(5, 2) NOT NULL CHECK (height_in > 0),
  gender TEXT NOT NULL CHECK (gender IN ('female', 'male')),
  emergency_phone TEXT
);

-- Beverages table (reference data)
CREATE TABLE beverages (
  type TEXT PRIMARY KEY,
  alc_pct NUMERIC(5, 4) NOT NULL CHECK (alc_pct >= 0 AND alc_pct <= 1)
);

-- Sessions table
CREATE TABLE sessions (
  session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zagmail TEXT NOT NULL REFERENCES users(zagmail) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  last_drink_at TIMESTAMPTZ,
  bac NUMERIC(5, 4) NOT NULL DEFAULT 0 CHECK (bac >= 0)
);

-- Drinks table
CREATE TABLE drinks (
  drink_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
  type TEXT NOT NULL REFERENCES beverages(type),
  volume_oz NUMERIC(5, 2) NOT NULL CHECK (volume_oz > 0),
  consumed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default beverage types
INSERT INTO beverages (type, alc_pct) VALUES
  ('beer', 0.05),
  ('wine', 0.12),
  ('whiskey_shot', 0.40)
ON CONFLICT (type) DO NOTHING;

