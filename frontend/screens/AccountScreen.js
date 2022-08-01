import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Overlay, Button, Input } from "@rneui/themed";



    
export default function AccountScreen() {


  const [visible, setVisible] = useState(true);
  const toggleOverlay = () => {
    setVisible(!visible);
  }

  return (
    <ScrollView>
        <Text h4 style={{textAlign: 'center'}}>ACCOUNTSCREEN</Text>
        <Button style = {{marginTop: "50%"}} title = "OVERLAY TEST" onPress={toggleOverlay}/>
        
        {/* <Overlay isVisible={visible}> */}
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Input placeholder="Zoubi" containerStyle = {{ width: '70%' }} />
          <Text>Hello from Overlay!</Text>
        </Overlay>
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
