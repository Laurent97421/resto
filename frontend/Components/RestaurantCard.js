import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RestaurantsData from '../assets/files-JSON/restaurant.json'
import { connect } from 'react-redux';

function RestaurantCard(props) {

  const navigation = useNavigation();

  const toDo = (data) => {
    navigation.navigate("Resto");
    props.onRestoClick(data)
    console.log(data)
  }

  // // // // // // // // // // // // // // // // // // // // // // // // // // //$
var temporaire = []

props.searchInfos[1].map((data) => {

    RestaurantsData.map((dataResto) => {
      dataResto.features.map((dataFeatures) => {
          const found = dataFeatures.values.find(element => element == data.element);
          if(found){
            temporaire.push({id: dataResto.id, name: dataResto.name, address: dataResto.address, ZIPcode: dataResto.ZIPcode, city: dataResto.city, phoneNumber: dataResto.phoneNumber, rating: dataResto.rating, voteNumber: dataResto.voteNumber, logo: dataResto.logo, images: dataResto.images, menu: dataResto.menu, boissons: dataResto.boissons, features: dataResto.features})

          }
      })
    })

  })

  // Pour enlever les doublons dans le tableau d'objets
  let newArray = [];
  let uniqueObject = {};
  for(let i in temporaire){
    objName = temporaire[i]['name']
    uniqueObject[objName] = temporaire[i];
  }

  for (i in uniqueObject) {
    newArray.push(uniqueObject[i]);
}
  // // // // // // // // // // // // // // // // // // // // // // // // // // //
  return (
    <View>
      {
        newArray.map((data,i) => {
          return (
            <TouchableOpacity
              onPress={() => {toDo(data)}}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#D3D3D3",
                margin: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              key={i}
            >
                    <Image
                      source={{uri: data.logo}}
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

                    <Text>à 450m</Text>

                    <IonIcon name="chevron-forward-outline" size={20} />

            </TouchableOpacity>
          )
        })
      }
    </View>
    
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onRestoClick: function(restoSelected) {
      dispatch ( {type: 'addRestoSelected', restoSelected: restoSelected})
      // console.log(JSON.stringify(restoSelected))
    }
  }
}

function mapStateToProps(state) {
  return { searchInfos: state.search }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantCard);
