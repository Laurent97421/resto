import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


    
export default function MyReservationScreen() {

  return (
    <ScrollView>
        <Text h4 style={{textAlign: 'center'}}>RESERVATIONSCREEN</Text>
    </ScrollView>
 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
