import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import MyTabs from "../Components/RestoScreen/TabScreen";

import { NavigationContainer } from "@react-navigation/native";




/// ATTTENTIOOOONNNNN !!! Rebasculer l'overlay à true dans HomeScreen avant de push

    
export default function RestoScreen() {


  return (
    <View style={{backgroundColor:'white'}}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
          </View>
          <View style={styles.restoInfosContainer}>
            <Text style={styles.restoName}>Chai Les Copains</Text>
            <Text style={styles.restoAddress}>1 quai de Bacalan{'\n'}33300 Bordeaux</Text>
            <Text style={styles.restoPhone}>+33 5 56 04 55 27</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            <View style={styles.stars}>
              <FontAwesome name="star-o" size={20} color="black" />
              <FontAwesome name="star-o" size={20} color="black" />
              <FontAwesome name="star-o" size={20} color="black" />
              <FontAwesome name="star-o" size={20} color="black" />
              <FontAwesome name="star-o" size={20} color="black" />
            </View>
            <Text style={styles.nbVote}>(234)</Text>
          </View>

          <Text style={styles.seeAll}>Voir tous les avis</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.buttonTitle}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.buttonTitle}>Boissons</Text>
          </TouchableOpacity>        
        </View>

        {/* Tab Navigation */}
        <View style={{ height: 500 }}>
          <MyTabs/>
        </View>

    </View>
 
  )
}

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    flex:1,
    aspectRatio: 1 / 1,
    borderRadius: 40,
  },
  restoInfosContainer: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center'
  },
  restoName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  restoAddress: {
    fontSize: 13,
  },
  restoPhone: {
    fontSize: 13,
    fontWeight: '600'
  },
  // Rating
  ratingContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 18,
    justifyContent: 'space-between',

  },
  starsContainer: {
    flexDirection: 'row',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  nbVote: {
    fontSize: 12,
    alignSelf: 'center'
  },
  seeAll: {
    color: 'grey',
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  // Buttons
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
    marginVertical: 15,
  },
  touchableOpacity: {
    height: 56,
    backgroundColor: 'lightgrey',
    width: 150,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
});
