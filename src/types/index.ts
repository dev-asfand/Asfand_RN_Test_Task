// Place interface for search results
export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId: string;
  timestamp: number;
}

// Google Places API response interfaces
export interface GooglePlaceResult {
  place_id: string;
  formatted_address: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface GooglePlacesResponse {
  results: GooglePlaceResult[];
  status: string;
}

// Search history item interface
export interface SearchHistoryItem {
  id: string;
  place: Place;
  searchDate: number;
}

// Map region interface
export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} 