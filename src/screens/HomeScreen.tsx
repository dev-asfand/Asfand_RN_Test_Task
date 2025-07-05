import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapView';
import SearchHistory from '../components/SearchHistory';

type TabType = 'map' | 'history';

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const {
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
  } = useSearch();

  const handleClearSelection = () => {
    // This will be handled by the hook when we implement it
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <View style={styles.mapContainer}>
            <MapViewComponent
              selectedPlace={selectedPlace}
              onClearSelection={handleClearSelection}
            />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isLoading={isLoading}
              onSelectPlace={selectPlace}
            />
          </View>
        );
      case 'history':
        return (
          <SearchHistory
            searchHistory={searchHistory}
            onSelectFromHistory={selectFromHistory}
            onRemoveFromHistory={removeFromHistory}
            onClearHistory={clearHistory}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Location Search</Text>
      </View>

      <View style={styles.content}>
        {renderTabContent()}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'map' && styles.activeTabButton]}
          onPress={() => setActiveTab('map')}
        >
          <Icon
            name="map"
            size={24}
            color={activeTab === 'map' ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'map' && styles.activeTabLabel,
            ]}
          >
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
          onPress={() => setActiveTab('history')}
        >
          <Icon
            name="history"
            size={24}
            color={activeTab === 'history' ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'history' && styles.activeTabLabel,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingBottom: hp('2%'),
    paddingTop: hp('1%'),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  activeTabButton: {
    backgroundColor: '#f0f8ff',
  },
  tabLabel: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.5%'),
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default HomeScreen; 