import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Place, MapRegion } from '../types';
import { MAP_CONFIG } from '../config/api';

interface MapViewProps {
  selectedPlace: Place | null;
  onClearSelection: () => void;
}

const MapViewComponent: React.FC<MapViewProps> = ({ selectedPlace, onClearSelection }) => {
  const getMapRegion = (): MapRegion => {
    if (selectedPlace) {
      return {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: MAP_CONFIG.DEFAULT_LATITUDE_DELTA,
        longitudeDelta: MAP_CONFIG.DEFAULT_LONGITUDE_DELTA,
      };
    }

    return {
      latitude: MAP_CONFIG.DEFAULT_LATITUDE,
      longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
      latitudeDelta: MAP_CONFIG.DEFAULT_LATITUDE_DELTA,
      longitudeDelta: MAP_CONFIG.DEFAULT_LONGITUDE_DELTA,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={getMapRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
            pinColor="#007AFF"
          />
        )}
      </MapView>

      {selectedPlace && (
        <View style={styles.placeDetailsContainer}>
          <View style={styles.placeDetails}>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName} numberOfLines={1}>
                {selectedPlace.name}
              </Text>
              <Text style={styles.placeAddress} numberOfLines={2}>
                {selectedPlace.address}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClearSelection}
            >
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  placeDetailsContainer: {
    position: 'absolute',
    bottom: hp('5%'),
    left: wp('4%'),
    right: wp('4%'),
    backgroundColor: 'white',
    borderRadius: 12,
    padding: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  placeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  placeAddress: {
    fontSize: wp('3.5%'),
    color: '#666',
    lineHeight: hp('2.5%'),
  },
  closeButton: {
    marginLeft: wp('3%'),
    padding: wp('1%'),
  },
});

export default MapViewComponent; 