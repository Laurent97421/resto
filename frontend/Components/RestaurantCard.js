import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';



function RestaurantCard(props) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Resto");
      }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#D3D3D3",
        margin: 10,
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/react_icon.png")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          overflow: "hidden",
          margin: 10,
        }}
      />
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
          Chai les copains
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
          <Text>(420)</Text>
        </View>
      </View>
      <Text>à 450m</Text>
      <IonIcon name="chevron-forward-outline" size={20} />
    </TouchableOpacity>
  );
}

export default RestaurantCard;
