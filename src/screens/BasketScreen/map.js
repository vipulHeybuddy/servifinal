import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = '...';

const map = () => {
  const mapView = useRef(null);
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 37.3317876,
      longitude: -122.0054812,
    },
    {
      latitude: 37.771707,
      longitude: -122.4053769,
    },
  ]);

  const onMapPress = (e) => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  }

  return (
    <MapView
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={StyleSheet.absoluteFill}
      ref={mapView}
      onPress={onMapPress}
    >
      {coordinates.map((coordinate, index) => (
        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
      ))}
      {coordinates.length >= 2 && (
        <MapViewDirections
          origin={coordinates[0]}
          waypoints={(coordinates.length > 2) ? coordinates.slice(1, -1) : undefined}
          destination={coordinates[coordinates.length - 1]}
        //   apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onStart={(params) => {
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          }}
          onReady={(result) => {
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)

            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              }
            });
          }}
          onError={(errorMessage) => {
            // console.log('GOT AN ERROR');
          }}
        />
      )}
    </MapView>
  );
}

export default map;
