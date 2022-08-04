import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { Button } from "@rneui/themed";

import { SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";

import RestaurantCard from "../Components/RestaurantCard";

export default function ResultScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          h4
          style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
        >
          Restaurants disponibles
        </Text>
      </View>
      <View style={styles.outsideSearch}>
        <View style={styles.searchBox}>
          <SearchIcon color="#A0A0A0" size="20" />
          <TextInput
            style={{ textAlign: "center", fontWeight: "bold", width: 250 }}
            placeholder="Adresse ou la position"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon color="#A0A0A0" />
      </View>
      <View>
        <Image
          style={{ height: 150, margin: 10, borderRadius: 8, width: 340 }}
          source={require("../assets/GoogleMap.webp")}
        />
      </View>
      <View>
        <Text
          h5
          style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
        >
          Liste des restaurants
        </Text>
      </View>
      <ScrollView>
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </ScrollView>
    </SafeAreaView>

    // <ScrollView>
    //   <Text h4 style={{ textAlign: "center" }}>
    //     RESULTSCREEN
    //   </Text>
    //   <Button
    //     title="Go to Resto page"
    //     onPress={() => props.navigation.navigate("Resto")}
    //   />
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  outsideSearch: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
    padding: 4,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  map: {
    flex: 1,
    // margin: 4,
  },
});
