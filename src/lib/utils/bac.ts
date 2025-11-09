/**
 * BAC (Blood Alcohol Content) Calculation Utilities
 * 
 * This file contains functions for calculating estimated BAC based on:
 * - Number of drinks consumed
 * - Time elapsed since first drink
 * - User's weight, height, and gender
 * - Alcohol content (ABV) of drinks
 * 
 * Functions to implement:
 * - calculateBAC(height, weight, prev_bac, drink_type: (wine, beer, liquor), alc_pct: (0.05, 0.12, 0.4), size(oz): (shot, 8,12,16,24), num_of_drinks, timeElapsed): Calculate current BAC
 * - calculateTimeToSober(calculateBAC): Estimate time until BAC reaches 0
 * - getBACRange(bac): Return BAC range category (e.g., "0.00-0.05", "0.05-0.08")
 * - getWidmarkFactor(gender): Get Widmark factor based on gender
 * 
 * Formula reference:
 * BAC = (A / (W * r)) - (β * t)
 * Where:
 * - A = total alcohol consumed (in grams)
 * - W = body weight (in kg)
 * - r = Widmark factor (0.68 for men, 0.55 for women)
 * - β = elimination rate (typically 0.15 g/L per hour)
 * - t = time since first drink (in hours)
 */

// --- Constants for Widmark Formula ---
const BAC_CONSTANTS = {
  // Widmark factor (r)
  WIDMARK_MALE: 0.68,
  WIDMARK_FEMALE: 0.55,
  // BAC elimination rate (β) in % per hour (typical)
  ELIMINATION_RATE_PERCENT_PER_HOUR: 0.015,
  // Density of pure ethanol in grams per mL
  ETHANOL_DENSITY_G_PER_ML: 0.789,
  // Conversion: 1 US fluid ounce (oz) to mL
  OZ_TO_ML: 29.5735,
  // Conversion: 1 pound (lb) to kg
  LB_TO_KG: 0.453592,
  // Conversion factor for g/L to % BAC (g/dL): / 10
  CONVERSION_FACTOR: 10,
};

// Interface reflecting the data you need for each drink logged
export interface DrinkRecord {
  // The time the drink was started (ISO string or Date object)
  time: string | Date;
  // Alcohol by volume (e.g., 0.05 for 5%)
  alcPct: number;
  // Volume of the drink in ounces
  volumeOz: number;
}

/**
 * Gets the Widmark Factor (r) based on gender.
 * @param gender 'male' or 'female'.
 * @returns The Widmark factor.
 */
export function getWidmarkFactor(gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return BAC_CONSTANTS.WIDMARK_MALE;
  }
  return BAC_CONSTANTS.WIDMARK_FEMALE;
}

/**
 * Calculates the total mass of pure alcohol consumed in grams (A) for a single drink.
 * @param volumeOz Volume of the drink in ounces.
 * @param alcPct Alcohol by volume percentage (e.g., 0.05).
 * @returns Alcohol mass in grams (A).
 */
function calculateAlcoholMassGrams(volumeOz: number, alcPct: number): number {
  // Alcohol Mass (g) = Volume (oz) * OZ_TO_ML * alcPct * ETHANOL_DENSITY_G_PER_ML
  return volumeOz * BAC_CONSTANTS.OZ_TO_ML * alcPct * BAC_CONSTANTS.ETHANOL_DENSITY_G_PER_ML;
}

/**
 * The core function for your application. Calculates the cumulative BAC
 * based on all drinks in a session and the total time elapsed.
 *
 * @param height The user's height (not strictly needed for calculation, but often tracked).
 * @param weightLbs User's weight in pounds.
 * @param gender User's gender ('male' or 'female').
 * @param drinks An array of all drinks consumed in the session, sorted by 'time'.
 * @param currentTime The current time (e.g., new Date()) to calculate metabolism up to this point.
 * @returns The final estimated BAC percentage.
 */
export function calculateSessionBAC(
  weightLbs: number,
  gender: 'male' | 'female',
  drinks: DrinkRecord[],
  currentTime: Date,
): number {
  if (drinks.length === 0 || weightLbs <= 0) {
    return 0;
  }

  // Ensure drinks are sorted chronologically by time
  const sortedDrinks = drinks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
  // 1. Calculate Total Alcohol Consumed (A)
  const totalAlcoholGrams = sortedDrinks.reduce((sum, drink) => {
    return sum + calculateAlcoholMassGrams(drink.volumeOz, drink.alcPct);
  }, 0);

  // 2. Determine Time Elapsed (t)
  // Time elapsed is from the FIRST drink to the current time.
  const firstDrinkTime = new Date(sortedDrinks[0].time).getTime();
  const timeElapsedMs = currentTime.getTime() - firstDrinkTime;
  const timeElapsedHours = timeElapsedMs / (1000 * 60 * 60); // Convert ms to hours

  // 3. Widmark Formula Components
  const W_kg = weightLbs * BAC_CONSTANTS.LB_TO_KG; // Weight in kg
  const r = getWidmarkFactor(gender); // Widmark factor
  const β = BAC_CONSTANTS.ELIMINATION_RATE_PERCENT_PER_HOUR; // Elimination rate

  // 4. Calculate BAC (BAC = (A / (W * r * 10)) - (β * t))
  // a) Concentration (peak BAC without metabolism)
  const Concentration = (totalAlcoholGrams / (W_kg * r)) / BAC_CONSTANTS.CONVERSION_FACTOR;

  // b) Metabolism Deduction
  const Metabolism = β * timeElapsedHours;

  // c) Final BAC
  const finalBAC = Concentration - Metabolism;

  // BAC cannot be negative
  return Math.max(0, finalBAC);
}

/**
 * Estimates the time required until BAC reaches 0.
 * @param currentBac The current estimated BAC percentage.
 * @returns Time to sober in hours (number).
 */
export function calculateTimeToSober(currentBac: number): number {
  // Time (hours) = Current BAC / Elimination Rate
  if (currentBac <= 0) {
    return 0;
  }
  return currentBac / BAC_CONSTANTS.ELIMINATION_RATE_PERCENT_PER_HOUR;
}

/**
 * Returns a descriptive BAC range category.
 * @param bac The current estimated BAC percentage.
 * @returns A string representing the BAC range category.
 */
export function getBACRange(bac: number): string {
  if (bac < 0.02) {
    return '0.00-0.02: Sober / Minimal Effect';
  } else if (bac < 0.05) {
    return '0.02-0.05: Relaxation / Mild Euphoria';
  } else if (bac < 0.08) {
    // 0.08% is the legal limit for driving in most of the U.S.
    return '0.05-0.08: Impairment / Legal Limit Zone';
  } else if (bac < 0.15) {
    return '0.08-0.15: Significant Motor Impairment';
  } else if (bac < 0.25) {
    return '0.15-0.25: Intoxication / Danger';
  } else {
    return '0.25+: Severe Intoxication / Seek Assistance';
  }
}
