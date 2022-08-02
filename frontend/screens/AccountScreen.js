import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Overlay, Input, Button } from "@rneui/themed";
import { FloatingLabelInput } from 'react-native-floating-label-input';
// import EncryptedStorage from 'react-native-encrypted-storage';


export default function AccountScreen() {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [lastnameInput, setLastnameInput] = useState('a');
  const [firstnameInput, setFirstnameInput] = useState('b');
  const [emailInput, setEmailInput] = useState('c');
  const [phoneNumberInput, setPhoneNumberInput] = useState('d');
  
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // Obtenir le user en sessions
  // useEffect( () => {
  //   const userSessionID = async function retrieveUserSession() {
  //     try {   
  //         const session = await EncryptedStorage.getItem("user_session");
      
  //         if (session !== undefined) {
  //           console.log(session)
  //         }
  //     } catch (error) {
  //         console.log('No user connected !', error)
  //     }
  //   }

  //   const sendUserSessionIDtoBE = async () => {
  //     await fetch('/account-screen', {
  //     })
  //   }
  // }, []);

  // Remplir les inputs à partir de la BDD
  
  // try {
  //   const res = await fetch("/service", { method: "GET" }),
  //     json = await res.json();
  //   console.log(json);
  // } catch (err) {
  //   console.error("error:", err);
  // }

  // var getUserDataFromBDD;
  

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



  return (
    <View style={{ paddingTop: 60, paddingLeft:16, paddingRight:16, flex: 1, backgroundColor: '#fff' }}>

      {/* AccountScreen Overlay */}
      <Overlay 
        overlayStyle={{ width:'90%', height: 'auto', borderRadius: 20 }}
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
      >
        {/* overlay title */}
        <Text style={{ marginLeft:16, marginRight: 16, marginTop: 30, fontSize: 20 }}>
          Modifier mes informations
        </Text>
        {/* overlay inputs */}
        <View style={{ marginLeft : 16, marginRight: 16, marginTop: 30, marginBottom: 30 }}>
          <View>
            <Text style={{ fontSize: 15 }}>Nom :</Text>
            <Input 
              type='text'
              value={lastnameInput}
              onChangeText={ value => { setLastnameInput(value) } }
            ></Input>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>Prénom :</Text>
            <Input
              type='text'
              value={firstnameInput}
              onChangeText={ value => { setFirstnameInput(value) } }
            ></Input>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>Adresse e-mail :</Text>
            <Input
              type='email'
              value={emailInput}
              onChangeText={ value => { setEmailInput(value) } }
            ></Input>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>Numéro de téléphone :</Text>
            <Input
              type='tel'
              value={phoneNumberInput}
              onChangeText={ value => { setPhoneNumberInput(value) } }
            ></Input>
          </View>
        </View>        
        {/* overlay buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft : 16, marginRight: 16, marginBottom: 30 }}>
          <Button
            title="Annuler"
            type="outline"
            buttonStyle={{ borderColor:'red', height: 56, width: 130, borderRadius: 40 }}
            titleStyle={{ color: 'red' }} 
            onPress={toggleOverlay}
          />
          <Button
            title="Valider"
            containerStyle={{}}
            buttonStyle={{ height: 56, width: 130, borderRadius: 40 }}
            titleStyle={{}}
            onPress={toggleOverlay}
          />
        </View>
      </Overlay>

      {/* AccountScreen Front */}
      {/* title */}
      <Text style={{ paddingBottom: 10, paddingTop: 10, fontSize: 30 }}>Vos informations</Text>
      {/* floating label inputs */}
      <View style={{flex:1, marginTop: 30, marginBottom: 80}}>
        <FloatingLabelInput
          labelStyles={{
            backgroundColor: '#fff',
            color: 'grey',
            paddingHorizontal: 10,
            marginTop: 20,
          }}
          containerStyles={{
            height: 56,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
          }}
          staticLabel
          label='Nom'
          editable={false}
          value={lastnameInput}
        >
        </FloatingLabelInput>
        <FloatingLabelInput
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            color:'grey',
          }}
          containerStyles={{
            height: 56,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
          }}
          staticLabel
          label="Prénom"
          editable={false}
          value={firstnameInput}
        >
        </FloatingLabelInput>
        <FloatingLabelInput
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            color:'grey',
          }}
          containerStyles={{
            height: 56,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
          }}
          staticLabel
          label="Adresse e-mail"
          editable={false}
          value={emailInput}
        >
        </FloatingLabelInput>
        <FloatingLabelInput
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            color:'grey',
          }}
          containerStyles={{
            height: 56,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 20,
          }}
          staticLabel
          label="Numéro de téléphone"
          editable={false}
          value={phoneNumberInput}
        >
        </FloatingLabelInput>
      </View>
      {/* buttons */}
      <Button
        buttonStyle={{ height:56, marginTop: 20, borderRadius:40 }}
        titleStyle={{ fontSize: 17 }}
        title="Modifier mes informations"
        onPress={() => setOverlayVisible(true)}
      />
      <Button
        buttonStyle={{ height: 56, marginTop: 20, marginBottom: 20}}
        titleStyle={{ color: 'red', fontSize: 15 }}
        type="clear" >
      SE DÉCONNECTER
      </Button>
    </View>
 
  )
}
