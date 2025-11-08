/*
 * Validation Utilities
 * 
 * Form validation functions for user inputs.
 * 
 * Usage:
 *   validateEmail('test@example.com')
 *   validateWeight(70)
 *   validateHeight(170)
 *   validatePhone('1234567890')
 *   validateDrinkInput(12, 5)
*/

export function validateEmail(email: string) {
  // Validate email is a valid zagmail email
  if (!email.endsWith('@zagmail.gonzaga.edu')) {
    alert('Please use your @zagmail.gonzaga.edu email to sign up.');
    return;
  }
  return true;
}

export function validateWeight(weight: number) {
  // Validate weight is positive number
  if (weight <= 0) {
    alert('Weight must be a positive number.');
    return;
  }
  return true;
}

export function validateHeight(height: number) {
  // Validate height is positive number
  if (height <= 0) {
    alert('Height must be a positive number.');
    return;
  }
  return true;
}

export function validatePhone(phone: string) {
  // Validate phone number format
  if (!phone.match(/^\d{10}$/)) {
    alert('Phone number must be 10 digits.');
    return;
  }
  return true;
}

export function validateUsername(username: string) {
  // Validate username length
  if (username.length < 4) {
    alert('Username must be at least 4 characters long.');
    return;
  }
  return true;
}

export function validateDrinkInput(volumeOz: number, abvPct: number) {
  // Validate drink volume (must be positive, reasonable max)
  if (volumeOz <= 0 || volumeOz > 100) {
    alert('Drink volume must be between 0 and 100 ounces.');
    return false;
  }
  
  // Validate ABV percentage (0-100%)
  if (abvPct < 0 || abvPct > 100) {
    alert('Alcohol percentage must be between 0 and 100.');
    return false;
  }
  return true;
}

