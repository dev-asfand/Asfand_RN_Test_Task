import { API_CONFIG } from '../config/api';
import { GooglePlacesResponse, Place } from '../types';

class PlacesService {
  // Search for places using Google Places API
  async searchPlaces(query: string): Promise<Place[]> {
    try {
      if (!query.trim()) {
        return [];
      }

      const url = `${API_CONFIG.GOOGLE_PLACES_BASE_URL}/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${API_CONFIG.GOOGLE_PLACES_API_KEY}`;

      const response = await fetch(url);
      const data: GooglePlacesResponse = await response.json();

      if (data.status === 'OK' && data.results) {
        return data.results.map((result, index) => ({
          id: `${result.place_id}_${index}`,
          name: result.name,
          address: result.formatted_address,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          placeId: result.place_id,
          timestamp: Date.now(),
        }));
      }

      return [];
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  // Get place details by place ID
  async getPlaceDetails(placeId: string): Promise<Place | null> {
    try {
      const url = `${API_CONFIG.GOOGLE_PLACES_BASE_URL}/details/json?place_id=${placeId}&fields=place_id,formatted_address,name,geometry&key=${API_CONFIG.GOOGLE_PLACES_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        const result = data.result;
        return {
          id: result.place_id,
          name: result.name,
          address: result.formatted_address,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          placeId: result.place_id,
          timestamp: Date.now(),
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }
}

export default new PlacesService(); 