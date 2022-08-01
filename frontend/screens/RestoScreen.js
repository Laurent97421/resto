import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button } from "@rneui/themed";



    
export default function RestoScreen(props) {

  return (
    <ScrollView>
        <Text h4 style={{textAlign: 'center'}}>RESTOSCREEN</Text>
        <Button
        title = "Go to Reservation page"
        onPress={() => props.navigation.navigate('Reservation')}
        />
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
