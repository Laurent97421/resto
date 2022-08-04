import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Overlay, Input, Button } from "@rneui/themed";
import { FloatingLabelInput } from 'react-native-floating-label-input';
// import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { connect } from 'react-redux';



function AccountScreen(props) {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [lastnameInput, setLastnameInput] = useState('');
  const [firstnameInput, setFirstnameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [token, setToken] = useState('');

  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}),[]);
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('oui')
  //     updateState({})
  //   }, [])
  // );


  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // console.log(token)

  useEffect(() => {
    console.log('Etape 1: On rentre dans le UseEffect ')
    // Récupération du token
    // const getData = async () => {
    //   try {
    //     const token =  await AsyncStorage.getItem('userToken')
    //     if(token){
    //       console.log('Etape 2: getData effectuée')
    //       setToken(token)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // getData();
    console.log('Etape 2: token')
    setToken(props.myToken)
    console.log('Mon Token')
    console.log(token)
    // props.navigation.navigate('Restaurant')
    // props.navigation.navigate('Restaurant', {screen: HomeScreen})

    // A l'aide du token on récupère les infos du user
    // var userInfos = async () => {
    //   console.log('Etape 3: userInfos effectuée')
    //   let privateAdressIP = "172.20.10.8";

    //   // Récupérer les infos BDD du User à partir du token obtenu
    //   //// Requête
    //   const getUserInfosFromBDD = await fetch("http://" + privateAdressIP + ":3000/account-screen", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     body: `tokenFromFront=${token}`,
    //   });
    //   //// Réponse
    //   const userInfosFromBDD = await getUserInfosFromBDD.json();
    //   // console.log()
    //   //// Pré-remplissage
      
    //   setLastnameInput(userInfosFromBDD.userFromBDD.userName);
    //   setFirstnameInput(userInfosFromBDD.userFromBDD.userFirstName);
    //   setEmailInput(userInfosFromBDD.userFromBDD.userEmail);
    //   setPhoneNumberInput(userInfosFromBDD.userFromBDD.userPhone);
    // };
    // userInfos();

  },[token])

  // Alternative à async/await
  // const getData = () => {
  //   try {
  //     AsyncStorage.getItem('userToken')
  //     .then(value => {
  //       if (value != null) {
  //         console.log('getData OK')
  //         setToken(value)
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  
 var userInfos = async () => {
      console.log('Etape 3: userInfos effectuée')
      let privateAdressIP = "172.20.10.8";

      // Récupérer les infos BDD du User à partir du token obtenu
      //// Requête
      const getUserInfosFromBDD = await fetch("http://" + privateAdressIP + ":3000/account-screen", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `tokenFromFront=${token}`,
      });
      //// Réponse
      const userInfosFromBDD = await getUserInfosFromBDD.json();
      console.log(userInfosFromBDD)
      //// Pré-remplissage
      
      setLastnameInput(userInfosFromBDD.userFromBDD.userName);
      setFirstnameInput(userInfosFromBDD.userFromBDD.userFirstName);
      setEmailInput(userInfosFromBDD.userFromBDD.userEmail);
      setPhoneNumberInput(userInfosFromBDD.userFromBDD.userPhone);
    };
  // On récupère userFromBDD à chaque fois que l'on va sur l'onglet Mon compte
  useFocusEffect(
    useCallback(() => {
        userInfos();
        console.log('UseFocusEffect OK')
        console.log(token)
    }, [token])
  );
  
  // Change le pré-remplissage des inputs si modification par le user
  // useEffect ( () => {
  //   if(hasModified) {
  //     AsyncStorage.getItem('userEmail', function(error, userEmail){
  //       if(true){
  //         setLastnameInput('modif');
  //         setFirstnameInput('modif');
  //         setEmailInput('modif');
  //         setPhoneNumberInput('modif');  
  //       } else {
  //         console.log('No modification done !')
  //       }
  //     })
  //   }
  // }, [hasModified])

  // On est pas gentil on se deconnecte de l'app
  // const deconnexion = () => {
  //   // await AsyncStorage.removeItem('userToken', (err) => console.log('userToken', err));
  //   AsyncStorage.clear()
  //   props.navigation.navigate('Home')
  //   console.log('DECONNECTER')
  //   // console.log(token)
  // }

  // useEffect(() => {
  //   AsyncStorage.clear();
  //   console.log(token)
  // }, [token])

  // useEffect(() => {
  //    console.log('useEffect')
  //    console.log(props.myToken)
  //   }, [])


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
              value={phoneNumberInput.toString()}
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
            onPress={() => {toggleOverlay(); console.log('User has modified !')}}
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
          value={phoneNumberInput.toString()}
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
        onPress={() => {deconnexion()}}
        buttonStyle={{ height: 56, marginTop: 20, marginBottom: 20}}
        titleStyle={{ color: 'red', fontSize: 15 }}
        type="clear" >
      SE DÉCONNECTER
      </Button>
    </View>
 
  )
}

function mapStateToProps(state) {
	return { myToken : state.token }
}

export default connect(
  mapStateToProps,
  null
)(AccountScreen)