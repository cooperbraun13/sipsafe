/**
 * Drink Types
 * 
 * TypeScript types related to drinks.
 * 
 * Types:
 * - DrinkInput: Input for creating a new drink
 * - PresetDrink: Predefined drink options (beer, wine, shot)
 * - DrinkWithAlcohol: Drink with calculated alcohol content
 */

import { Drink } from './database'

export type DrinkInput = {
  volumeOz: number
  abvPct: number
  name?: string
}

export type PresetDrink = {
  name: string
  volumeOz: number
  abvPct: number
}

export type DrinkWithAlcohol = Drink & {
  alcoholGrams: number // Calculated alcohol content in grams
}

// Preset drink definitions
export const PRESET_DRINKS: PresetDrink[] = [
  { name: 'Beer', volumeOz: 12, abvPct: 5.0 },
  { name: 'Wine', volumeOz: 5, abvPct: 12.0 },
  { name: 'Shot', volumeOz: 1.5, abvPct: 40.0 },
]

