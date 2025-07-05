import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchHistoryItem } from '../types';

interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
  onSelectFromHistory: (historyItem: SearchHistoryItem) => void;
  onRemoveFromHistory: (placeId: string) => void;
  onClearHistory: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  onSelectFromHistory,
  onRemoveFromHistory,
  onClearHistory,
}) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all search history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: onClearHistory,
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: SearchHistoryItem }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => onSelectFromHistory(item)}
    >
      <View style={styles.historyContent}>
        <View style={styles.historyInfo}>
          <Text style={styles.historyName} numberOfLines={1}>
            {item.place.name}
          </Text>
          <Text style={styles.historyAddress} numberOfLines={1}>
            {item.place.address}
          </Text>
          <Text style={styles.historyDate}>
            {formatDate(item.searchDate)}
          </Text>
        </View>
        <View style={styles.historyActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onSelectFromHistory(item)}
          >
            <Icon name="location-on" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onRemoveFromHistory(item.place.placeId)}
          >
            <Icon name="delete-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyHistory = () => (
    <View style={styles.emptyContainer}>
      <Icon name="history" size={60} color="#ccc" />
      <Text style={styles.emptyTitle}>No Search History</Text>
      <Text style={styles.emptySubtitle}>
        Your searched places will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search History</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearHistory}
          >
            <Icon name="clear-all" size={24} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>

      {searchHistory.length > 0 ? (
        <FlatList
          data={searchHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          style={styles.historyList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.historyListContent}
        />
      ) : (
        renderEmptyHistory()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    padding: wp('1%'),
  },
  historyList: {
    flex: 1,
  },
  historyListContent: {
    paddingBottom: hp('2%'),
  },
  historyItem: {
    backgroundColor: 'white',
    marginHorizontal: wp('4%'),
    marginTop: hp('1%'),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  historyAddress: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('0.5%'),
  },
  historyDate: {
    fontSize: wp('3%'),
    color: '#999',
  },
  historyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: wp('2%'),
    marginLeft: wp('1%'),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  emptyTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#666',
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
  },
  emptySubtitle: {
    fontSize: wp('4%'),
    color: '#999',
    textAlign: 'center',
    lineHeight: hp('3%'),
  },
});

export default SearchHistory; 