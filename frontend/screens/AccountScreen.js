import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Overlay, Input, Button } from "@rneui/themed";
import { FloatingLabelInput } from 'react-native-floating-label-input';
// import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";



export default function AccountScreen(props) {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [lastnameInput, setLastnameInput] = useState('a');
  const [firstnameInput, setFirstnameInput] = useState('b');
  const [emailInput, setEmailInput] = useState('c');
  const [phoneNumberInput, setPhoneNumberInput] = useState('d');

  const [hasModified, setHasModified] = useState(false);
  
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // Pré-remplir les données à partir de la BDD
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('userEmail', function(error, userEmail){
        if(true){
          setLastnameInput('AsyncStorage');
          setFirstnameInput('AsyncStorage');
          setEmailInput('AsyncStorage');
          setPhoneNumberInput('AsyncStorage');  
        } else {
          console.log('No user connected !')
        }
      })
    },[])
  )

  // Change le pré-remplissage des inputs si modification par le user
  useEffect ( () => {
    if(hasModified) {
      AsyncStorage.getItem('userEmail', function(error, userEmail){
        if(true){
          setLastnameInput('modif');
          setFirstnameInput('modif');
          setEmailInput('modif');
          setPhoneNumberInput('modif');  
        } else {
          console.log('No modification done !')
        }
      })
    }
  }, [hasModified])



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
              keyboardType="numeric"
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
            onPress={() => {toggleOverlay(); console.log('User has modified !'); setHasModified(true)}}
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
