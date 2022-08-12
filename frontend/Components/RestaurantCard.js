import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RestaurantsData from "../assets/files-JSON/restaurant.json";
import { connect } from "react-redux";

function RestaurantCard(props) {
  const navigation = useNavigation();

  const toDo = (data) => {
    navigation.navigate("Resto");
    props.onRestoClick(data);
    // console.log(JSON.stringify(data));
  };
  const destinations = props.resultsDirection;
  console.log(destinations);

  // const destinationsData = destinations.map((restaurant) => {
  //   return <Text>{restaurant.distance} m</Text>;
  // });

  return (
    <View>
      {RestaurantsData &&
        // destination &&
        RestaurantsData.map((data) => {
          // const dest = destination[index];
          // console.log(dest);
          return (
            <TouchableOpacity
              onPress={() => {
                toDo(data);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#D3D3D3",
                margin: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              key={data.id}
            >
              <Image
                source={{ uri: data.logo }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  overflow: "hidden",
                  margin: 10,
                }}
              />
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {data.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <IonIcon name="star-outline" />
                    <IonIcon name="star-outline" />
                    <IonIcon name="star-outline" />
                    <IonIcon name="star-outline" />
                    <IonIcon name="star-outline" />
                  </View>
                  <Text>({data.voteNumber})</Text>
                </View>
              </View>

              <IonIcon name="chevron-forward-outline" size={20} />
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
function mapStateToProps(state) {
  return { resultsDirection: state.resultsDirection };
}

function mapDispatchToProps(dispatch) {
  return {
    onRestoClick: function (restoSelected) {
      dispatch({ type: "addRestoSelected", restoSelected: restoSelected });
      // console.log(JSON.stringify(restoSelected))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantCard);
