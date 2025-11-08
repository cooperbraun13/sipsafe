/*
* Safety Tips by BAC Range
* 
* Harm-reduction tips and advice organized by BAC ranges.
* These tips are displayed to users based on their current estimated BAC.
* 
* BAC Ranges:
* - 0.00-0.05: Low risk
* - 0.05-0.08: Moderate risk
* - 0.08-0.15: High risk
* - 0.15+: Very high risk
* 
* Tips should include:
* - Hydration reminders
* - Snack suggestions
* - When to stop drinking
* - Safety precautions
*/

export const SAFETY_TIPS = {
  low: {
    range: [0.0, 0.05],
    tips: [
      'Stay hydrated! Make sure to drink water between drinks...',
      'Eat something to slow alcohol absorption now!',
      'Know your limits and pace yourself...',
    ],
    snackSuggestions: [
      'Protein-rich snacks (nuts, cheese)',
      'Complex carbs (bread, crackers)',
    ],
  },
  moderate: {
    range: [0.05, 0.08],
    tips: [
      'You\'re approaching legal driving limit - consider stopping and don\'t touch your keys!',
      'Make sure to take a break and drink water and eat food now!',
      'Plan your safe ride home...',
      'Stay with friends and look out for each other...',
    ],
    snackSuggestions: [
      'Pizza or other substantial food',
      'Fruits and vegetables if possible...',
    ],
  },
  high: {
    range: [0.08, 0.15],
    tips: [
      'STOP DRINKING - You\'re at high risk!!!',
      'Drink water immediately!',
      'Do NOT drive - use resources to get home safely...',
      'Stay with trusted friends...',
      'Consider calling Health Ride or using Lyft code...',
    ],
    snackSuggestions: [
      'Eat a full meal if possible',
      'Avoid more alcohol',
    ],
  },
  veryHigh: {
    range: [0.15, 1.0],
    tips: [
      'STOP DRINKING IMMEDIATELY!!!',
      'Seek medical attention if needed...',
      'Call 911 or Campus Security if you or someone else needs help!',
      'Stay with someone who can monitor you...',
      'This is a medical emergency - use Medical Amnesty Policy please!',
    ],
    snackSuggestions: [
      'Focus on hydration and safety, not food',
    ],
  },
}

export type SafetyTipCategory = keyof typeof SAFETY_TIPS

