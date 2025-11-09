/*
* Drink Types
* 
* TypeScript types related to drinks.
*
*/

import { Drink, Beverage } from './database'

export type DrinkInput = {
  type: string // Beverage type (e.g., 'beer', 'wine', 'whiskey_shot')
  volumeOz: number // Volume in ounces
  time?: string // Optional timestamp (defaults to now)
  duration?: string // Optional duration as ISO interval (e.g., '2 hours', defaults to '0 hours')
}

export type PresetDrink = {
  name: string
  type: string // Beverage type
  volume_oz: number
  volumeOz?: number // Legacy field for backward compatibility
  abvPct?: number // Legacy field for backward compatibility
}

export type DrinkWithAlcohol = Drink & {
  alcoholGrams: number // Calculated alcohol content in grams
}

// Preset drink definitions
// These should match Beverage types in the database
export const PRESET_DRINKS: PresetDrink[] = [
  { name: 'Beer', type: 'beer', volume_oz: 12 },
  { name: 'Wine', type: 'wine', volume_oz: 5 },
  { name: 'Shot', type: 'whiskey_shot', volume_oz: 1.5 },
]

