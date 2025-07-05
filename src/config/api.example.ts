// Example API Configuration
// Copy this file to api.ts and replace with your actual API keys

export const API_CONFIG = {
  // Get your API key from: https://console.cloud.google.com/
  // Enable Google Maps API and Places API for your project
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
  GOOGLE_PLACES_API_KEY: 'YOUR_GOOGLE_PLACES_API_KEY_HERE',
  GOOGLE_PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place',
};

// Storage Keys for AsyncStorage
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'search_history',
};

// Default Map Configuration
export const MAP_CONFIG = {
  DEFAULT_LATITUDE: 37.78825,  // San Francisco
  DEFAULT_LONGITUDE: -122.4324,
  DEFAULT_LATITUDE_DELTA: 0.0922,
  DEFAULT_LONGITUDE_DELTA: 0.0421,
}; 