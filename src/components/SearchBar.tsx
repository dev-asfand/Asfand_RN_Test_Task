import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Place } from '../types';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Place[];
  isLoading: boolean;
  onSelectPlace: (place: Place) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  isLoading,
  onSelectPlace,
}) => {
  const renderSearchResult = ({ item }: { item: Place }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onSelectPlace(item)}
    >
      <Icon name="location-on" size={20} color="#666" style={styles.resultIcon} />
      <View style={styles.resultContent}>
        <Text style={styles.resultName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.resultAddress} numberOfLines={1}>
          {item.address}
        </Text>
      </View>
      <Icon name="arrow-forward-ios" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <Icon name="search" size={40} color="#ccc" />
      <Text style={styles.emptyText}>
        {searchQuery.trim() ? 'No places found' : 'Search for places...'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for places..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isLoading && (
          <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIcon} />
        )}
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            style={styles.resultsList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}

      {!isLoading && searchQuery.trim() && searchResults.length === 0 && (
        <View style={styles.resultsContainer}>
          {renderEmptyResults()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('4%'),
    right: wp('4%'),
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    fontSize: wp('4%'),
    color: '#333',
  },
  loadingIcon: {
    marginLeft: wp('2%'),
  },
  clearButton: {
    marginLeft: wp('2%'),
    padding: wp('1%'),
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: hp('1%'),
    maxHeight: hp('40%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  resultsList: {
    borderRadius: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultIcon: {
    marginRight: wp('3%'),
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  resultAddress: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: hp('5%'),
  },
  emptyText: {
    fontSize: wp('4%'),
    color: '#999',
    marginTop: hp('2%'),
  },
});

export default SearchBar; 