import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/api';
import { SearchHistoryItem, Place } from '../types';

class StorageService {
  // Save search history
  async saveSearchHistory(history: SearchHistoryItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving search history:', error);
      throw error;
    }
  }

  // Get search history
  async getSearchHistory(): Promise<SearchHistoryItem[]> {
    try {
      const history = await AsyncStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  }

  // Add a new search to history
  async addToSearchHistory(place: Place): Promise<void> {
    try {
      const history = await this.getSearchHistory();
      const newItem: SearchHistoryItem = {
        id: Date.now().toString(),
        place,
        searchDate: Date.now(),
      };

      // Remove duplicate if exists
      const filteredHistory = history.filter(item => item.place.placeId !== place.placeId);
      
      // Add new item at the beginning
      const updatedHistory = [newItem, ...filteredHistory].slice(0, 50); // Keep only last 50 searches
      
      await this.saveSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Error adding to search history:', error);
      throw error;
    }
  }

  // Clear search history
  async clearSearchHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error('Error clearing search history:', error);
      throw error;
    }
  }

  // Remove specific item from history
  async removeFromHistory(placeId: string): Promise<void> {
    try {
      const history = await this.getSearchHistory();
      const filteredHistory = history.filter(item => item.place.placeId !== placeId);
      await this.saveSearchHistory(filteredHistory);
    } catch (error) {
      console.error('Error removing from history:', error);
      throw error;
    }
  }
}

export default new StorageService(); 