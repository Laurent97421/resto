import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button } from "@rneui/themed";


    
export default function ResultScreen(props) {

  return (
    <ScrollView>
        <Text h4 style={{textAlign: 'center'}}>RESULTSCREEN</Text>
        <Button
        title = "Go to Resto page"
        onPress={() => props.navigation.navigate('Resto')}
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
