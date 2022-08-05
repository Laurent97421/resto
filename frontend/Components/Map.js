import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

function Map() {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);

  useEffect(() => {
    async function askPermissions() {
      // let { status } = await Permissions.askAsync(Permissions.LOCATION);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
        });
      }
    }
    askPermissions();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 44.836151,
        longitude: -0.580816,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* Notre position perso */}
      <Marker
        key={"currentPos"}
        pinColor="green"
        title="Hello"
        description="I'm here"
        coordinate={{
          latitude: currentLatitude,
          longitude: currentLongitude,
        }}
      />
    </MapView>
  );
}

export default Map;
