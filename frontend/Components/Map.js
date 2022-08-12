import React, { useEffect, useState, useRef, useCallback } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import * as Location from "expo-location";
import restaurantData from "../assets/files-JSON/restaurant.json";
import Icon from "react-native-vector-icons/Ionicons";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

import { connect } from "react-redux";
import resultsDirection from "../reducers/resultsDest";

function Map(props) {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [resultsDirection, setResultsDirection] = useState([]);

  const mapRef = useRef();

  const { width, height } = Dimensions.get("window");
  const Aspect_Ratio = width / height;
  const latitude_delta = 0.02;
  const longitude_delta = latitude_delta * Aspect_Ratio;

  //direction const
  const origin = { latitude: currentLatitude, longitude: currentLongitude };

  const currentLocation = {
    latitude: currentLatitude,
    longitude: currentLongitude,
    latitudeDelta: latitude_delta,
    longitudeDelta: longitude_delta,
  };

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
    if (currentLocation != 0) {
      const yourLocation = () => {
        mapRef.current.animateToRegion(currentLocation, 3 * 1000);
      };
      yourLocation();
    }

    props.fetchRestauData(resultsDirection);
  }, [currentLatitude, currentLongitude, mapRef]);

  var listPOI = [];
  for (var i = 0; i < restaurantData.length; i++) {
    listPOI.push({
      id: restaurantData[i].id,
      restLatitude: restaurantData[i].location.lat,
      restLongitude: restaurantData[i].location.lng,
      name: restaurantData[i].name,
      address: restaurantData[i].address,
      logo: restaurantData[i].logo,
      image: restaurantData[i].images[0].uri,
    });

    listPOI.forEach((item, i) => {
      item.id = i + 1;
    });
  }

  var markerPOI = listPOI.map((POI, i) => {
    return (
      <Marker
        key={i}
        // pinColor="hotpink"
        coordinate={{
          latitude: POI.restLatitude,
          longitude: POI.restLongitude,
        }}
      >
        <Icon name="restaurant" color="hotpink" size={18} />
        <Callout tooltip>
          <View style={styles.bubble}>
            <Text style={{ flexDirection: "column" }}>
              <Text style={styles.name}>
                {POI.name}
                {/* <Text style={styles.name}>{POI.address}</Text> */}
              </Text>
              <Text style={styles.name}>
                {/* <Text>{POI.address}</Text> */}
              </Text>

              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: POI.image }}
              />
            </Text>
          </View>
        </Callout>
      </Marker>
    );
  });

  const directionRest = listPOI.map((POI) => {
    return (
      <MapViewDirections
        key={POI.id}
        origin={origin}
        destination={{
          latitude: POI.restLatitude,
          longitude: POI.restLongitude,
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="red"
        onReady={useCallback(
          (results) => {
            const resultsDest = [];
            resultsDest.push({
              id: POI.id,
              name: POI.name,
              distance: results.distance,
              duration: results.duration,
            });
            console.log(resultsDest);
            setResultsDirection(resultsDest);
          },
          [origin]
        )}
      />
    );
  });

  return (
    <MapView
      ref={mapRef}
      showsUserLocation
      style={styles.map}
      initialRegion={{
        latitude: 44.836151,
        longitude: -0.580816,
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta,
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
      {markerPOI}
      {directionRest}
      {/* /* <MapViewDirections
        origin={origin}
        destination={{
          latitude: 45,
          longitude: -0.5,
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="red"
        onReady={useCallback((results) => {
          const resultsDir = [];
          resultsDir.push({
            distance: results.distance,
            duration: results.duration,
          });
          resultsDir.forEach((item, i) => {
            item.id = i + 1;
            console.log(resultsDir);
          });
        }, [])} */}
      {/* /> */}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  name: {
    fontSize: 16,
  },
  address: {
    fontSize: 12,
  },
  image: {
    width: 120,
    height: 80,
  },
});

// function mapDispatchToProps(dispatch) {
//   return {
//     setResultsDirection: function (resultsDirection) {
//       dispatch({ type: "saveResultsDirection", resultsDirection });
//     },
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestauData: (resultsDirection) =>
      dispatch({
        type: "saveResultsDirection",
        resultsDirection: resultsDirection,
      }),
  };
};

export default connect(null, mapDispatchToProps)(Map);
