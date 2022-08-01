import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button } from "@rneui/themed";



    
export default function HomeScreen(props) {

  return (
    <ScrollView>
        <Text h4 style={{textAlign: 'center'}}>HOMESCREENN</Text>
        <Button
        title = "Go to Results page"
        onPress={() => props.navigation.navigate('Result')}
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
