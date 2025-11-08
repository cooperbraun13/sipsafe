/**
 * Gonzaga University Resources
 * 
 * Static data for Gonzaga-specific emergency and support resources.
 * This data is returned by the /api/resources endpoint.
 * 
 * Resources to include:
 * - Campus Security: 509-313-2222
 * - Health Ride (urgent): 509-313-2222
 * - Health & Counseling: 509-313-4052
 * - #GetHomeSafe Lyft code: "ZagsRideSafe"
 * - Link to GU Medical Amnesty Policy
 * - 911 for emergencies
 */

export const GONZAGA_RESOURCES = {
  emergency: {
    name: '911',
    phone: '911',
    description: 'Emergency services',
    isEmergency: true,
  },
  campusSecurity: {
    name: 'Campus Security',
    phone: '509-313-2222',
    description: 'Gonzaga Campus Security',
    isEmergency: false,
  },
  healthRide: {
    name: 'Health Ride (Urgent)',
    phone: '509-313-2222',
    description: 'Urgent health transportation',
    isEmergency: false,
  },
  healthCounseling: {
    name: 'Health & Counseling',
    phone: '509-313-4052',
    description: 'Student health and counseling services',
    isEmergency: false,
  },
  lyftCode: {
    name: '#GetHomeSafe',
    code: 'ZagsRideSafe',
    description: 'Lyft code for safe rides home',
    isEmergency: false,
  },
  medicalAmnesty: {
    name: 'Medical Amnesty Policy',
    url: 'https://www.gonzaga.edu/student-life/health-wellness/medical-amnesty-policy',
    description: 'Read Gonzaga\'s Medical Amnesty Policy',
    isEmergency: false,
  },
}

export type Resource = typeof GONZAGA_RESOURCES[keyof typeof GONZAGA_RESOURCES]

