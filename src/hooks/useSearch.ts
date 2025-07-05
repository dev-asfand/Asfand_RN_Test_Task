import { useState, useEffect, useCallback } from 'react';
import { Place, SearchHistoryItem } from '../types';
import placesService from '../services/placesService';
import storageService from '../services/storageService';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Load search history on mount
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Load search history from storage
  const loadSearchHistory = async () => {
    try {
      const history = await storageService.getSearchHistory();
      setSearchHistory(history);
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  // Search places with debouncing
  const searchPlaces = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await placesService.searchPlaces(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching places:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle search query change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPlaces(searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchPlaces]);

  // Select a place from search results
  const selectPlace = async (place: Place) => {
    try {
      setSelectedPlace(place);
      setSearchQuery('');
      setSearchResults([]);
      
      // Add to search history
      await storageService.addToSearchHistory(place);
      await loadSearchHistory(); // Reload history
    } catch (error) {
      console.error('Error selecting place:', error);
    }
  };

  // Select a place from history
  const selectFromHistory = (historyItem: SearchHistoryItem) => {
    setSelectedPlace(historyItem.place);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Remove item from history
  const removeFromHistory = async (placeId: string) => {
    try {
      await storageService.removeFromHistory(placeId);
      await loadSearchHistory(); // Reload history
    } catch (error) {
      console.error('Error removing from history:', error);
    }
  };

  // Clear all search history
  const clearHistory = async () => {
    try {
      await storageService.clearSearchHistory();
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchHistory,
    isLoading,
    selectedPlace,
    selectPlace,
    selectFromHistory,
    removeFromHistory,
    clearHistory,
  };
}; 