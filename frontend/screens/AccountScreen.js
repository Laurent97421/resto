import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Overlay, Button, Input } from "@rneui/themed";
import { FloatingLabelInput } from 'react-native-floating-label-input';
// import EncryptedStorage from 'react-native-encrypted-storage';


export default function AccountScreen() {

  const [inputEditable, setInputEditable] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Pré-remplir les inputs
  // async function retrieveUserSession() {
  //   try {   
  //       const session = await EncryptedStorage.getItem("user_session");
    
  //       if (session !== undefined) {
  //           // Congrats! You've just retrieved your first value!
  //       }
  //   } catch (error) {
  //       console.log('No user connected !')
  //   }
  // }

  // Deconnexion (Option 1 : Clear all)
  // async function clearStorage() {
  //   try {
  //       await EncryptedStorage.clear();
  //       // Congrats! You've just cleared the device storage!
  //   } catch (error) {
  //     console.log('No data found !')
  //   }
  // }

  // Deconnexion (Option 2 : Remove one)
  // async function removeUserSession() {
  //   try {
  //       await EncryptedStorage.removeItem("user_session");
  //       // Congrats! You've just removed your first value!
  //   } catch (error) {
  //     console.log('No data found !')
  //   }
  // }

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <View style={styles.container}>

      {/* AccountScreen Overlay */}
      <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} overlayStyle={{width:'90%', height: 'auto'}}>
        <Text style={{marginLeft:15}}>Modifier mes informations</Text>
        <FloatingLabelInput
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            marginLeft: 15
          }}
          containerStyles={{
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15
          }}
          staticLabel
          label="Nom"
          placeholder="Nom">
        </FloatingLabelInput>
        <FloatingLabelInput
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            marginLeft: 15
          }}
          containerStyles={{
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15
          }}
          staticLabel
          label="Prénom"
          placeholder="Prénom">
        </FloatingLabelInput>
        <FloatingLabelInput
          errorMessage="Invalid"
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            marginLeft: 15
          }}
          containerStyles={{
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15
          }}
          staticLabel
          label="Adresse e-mail"
          placeholder="Adresse e-mail">
        </FloatingLabelInput>
        <FloatingLabelInput
          errorMessage="Invalid"
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 15
          }}
          containerStyles={{
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 15,
            marginRight: 15
          }}
          staticLabel
          label="Numéro de téléphone"
          placeholder="Numéro de téléphone">
        </FloatingLabelInput>
        <View style={styles.twoButtons}>
          <Button
            title="Annuler"
            type="outline"
            containerStyle={{}}
            buttonStyle={{borderColor:'red'}}
            titleStyle={styles.buttonTitle} 
            onPress={toggleOverlay}
          />
          <Button
            title="Valider"
            containerStyle={{}}
            buttonStyle={{}}
            titleStyle={{}}
            onPress={toggleOverlay}
          />
        </View>
      </Overlay>

      {/* AccountScreen Front */}
        <Text h1>Vos informations</Text>
        <TextInput style={styles.input}
                   editable={inputEditable}>
          Nom
        </TextInput>
        <TextInput style={styles.input}
                   editable={inputEditable}>
          Prénom
        </TextInput>
        <TextInput style={styles.input}
                   editable={inputEditable}>
          Adresse e-mail
        </TextInput>
        <TextInput style={styles.input}
                   editable={inputEditable}>
          Numéro de téléphone
        </TextInput>
        <Button
        title="Modifier mes informations"
        onPress={() => setOverlayVisible(true)}
        />
        <Button titleStyle={styles.buttonTitle} type="clear" >SE DÉCONNECTER</Button>
    </View>
 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  twoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonTitle: {
    color:'red'
  },
});
