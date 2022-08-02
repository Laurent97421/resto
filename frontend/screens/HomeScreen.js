import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity, TextInput } from "react-native";
import { Button, Overlay, Input } from "@rneui/themed";
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { color } from "@rneui/base";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Icon } from '@rneui/themed'



    
export default function HomeScreen(props) {

  // Overlay à l'ouverture de la page
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  }

  // Overlay page connection
  const [visibleConnection, setVisibleConnection] = useState(false);
  const toggleOverlayConnection = () => {
    setVisibleConnection(!visibleConnection);
  }

  // Overlay page mdp oublié
  const [visibleForgetPassword, setVisibleForgetPassword] = useState(false);
  const toggleOverlayForgetPassword = () => {
    setVisibleForgetPassword(!visibleForgetPassword);
  }

  // Information de connexion
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [connectionOK, setConnectionOK] = useState(false);

  // Information pour changement de mot de passe
  const [emailReset, setEmailReset] = useState('');
  const [passwordReset, setPasswordReset] = useState('');
  const [confirmedPasswordReset, setConfirmedPasswordReset] = useState('');
  const [resetPsw, setResetPsw] = useState(false);





  // On vérifie dans le backend si le user existe déjà ou pas
  var checkConnectionInformation = async (mail, mdp) => {
    var connectionInfos = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `emailFromFront=${mail}&passwordFromFront=${mdp}`
    });

    var bodyConnectionInfos = connectionInfos.json();

    // Si les données entrées appartiennent à un user en BDD
    // result sera = true, et donc on set
    if(bodyConnectionInfos.result){
      setConnectionOK(true);
    }
    
    
  }
  // // Si les infos écritent correspondent à un user en bdd, redirect vers la home page
var testConnectionPassed = () => {
  if(connectionOK){
    toggleOverlayConnection();
    props.navigation.navigate('Restaurant', {screen: HomeScreen})
    // props.navigation.navigate('Mon compte')
  }
}

  // Declenche la route pour changer de mot de passe
  var resetPassword = async () => {
    const dataResetPassword = await fetch('/reset-password', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `emailFromResetPassword=${emailReset}&passwordFromResetPassword=${passwordReset}&passwordFromResetPasswordConfirmed=${confirmedPasswordReset}`
    }); 

    const bodyResetPassword = dataResetPassword.json()

    // Si tout est ok en back, result = true, et donc on setResetPsw à true
    // et ensuite si resetPsw on revient sur l'overlay j'ai déjà un compte
    if(bodyResetPassword.result){
      console.log('test resetPassword')
      setResetPsw(true)
    }
  }
  // Si le password a été changé, on ferme l'overlay du chgt de mdp et on va sur celui de j'ai déjà un compte
  if(resetPsw){
    toggleOverlayForgetPassword();
    toggleOverlayConnection();
  }


 

  return (
    <ScrollView>

        <Text h4 style={{textAlign: 'center'}}>HOMESCREEN</Text>
        <Button
        title = "Go to Results page"
        onPress={() => props.navigation.navigate('Result')}
        />
        <Button
        style = {{ marginTop: "50%"}}
        title = "OVERLAYS TESTS"
        onPress={() => {toggleOverlay()}}
        />

        {/* Overlay avec les options de connexions */}
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}}>


          <FloatingLabelInput
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Nom"
          placeholder="Nom">
        </FloatingLabelInput>

          <FloatingLabelInput
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Prénom"
          placeholder="Prénom">
        </FloatingLabelInput>

          <FloatingLabelInput
          keyboardType="email-address"
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Email"
          placeholder="Email">
        </FloatingLabelInput>

        <FloatingLabelInput
          keyboardType="numeric"
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Tel"
          placeholder="Tel">
        </FloatingLabelInput>

        <FloatingLabelInput
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Mot de passe"
          placeholder="Mot de passe">
        </FloatingLabelInput>


          <Button
            style = {{ marginTop: 30 }}
            title = "S'inscrire"
            onPress={() => console.log("s'inscrire")}
          />
          <Button
            style = {{ paddingTop: '1%' }}
            title = "Connexion via Google"
            onPress={() => console.log("s'inscrire via google")}
          />
          <Text style={{textAlign: 'center', marginTop: '4%', marginBottom: '2%'}}>J'ai déjà un compte</Text>
          <TouchableOpacity onPress = {() => {toggleOverlay(); setVisibleConnection(true)}}>
            <Text style={{textAlign: 'center', color: 'green'}} >Se connecter</Text>
          </TouchableOpacity>
        </Overlay>

        {/* Overlay j'ai déjà un compte, se connecter */}
        <Overlay isVisible={visibleConnection} onBackdropPress={toggleOverlayConnection} overlayStyle={{width: '90%'}}>

        <FloatingLabelInput
          onChangeText={(msg) => setSignInEmail(msg)}
          value = {signInEmail}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Email"
          placeholder="Email">
        </FloatingLabelInput>


        <FloatingLabelInput
          onChangeText={(msg) => setSignInPassword(msg)}
          value = {signInPassword}
          isPassword= {true}
          customShowPasswordComponent={<Icon name='eye' type='entypo' />}
          customHidePasswordComponent={<Icon name='eye-with-line' type='entypo' />}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Mot de passe"
          placeholder="Mot de passe">
        </FloatingLabelInput>

          <TouchableOpacity onPress = {() => {toggleOverlay(); setVisibleConnection(true)}}>
            <Text style={{textAlign: 'right', color: 'green', fontSize: 10, paddingRight: 20}} onPress={() => {setVisibleConnection(false); setVisibleForgetPassword(true)}} >Mot de passe oublié</Text>
          </TouchableOpacity>

          <Button
            style = {{ paddingTop: '10%' }}
            title = "Se connecter"
            onPress={() => {console.log("Se connecter"); checkConnectionInformation(signInEmail, signInPassword); testConnectionPassed()}}
          />

        </Overlay>

        {/* Overlay mot de passe oublié */}
        <Overlay isVisible={visibleForgetPassword} onBackdropPress={toggleOverlayForgetPassword} overlayStyle={{width: '90%'}}>

        <FloatingLabelInput
          onChangeText={(msg) => setEmailReset(msg)}
          value = {emailReset}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Email"
          placeholder="Email">
        </FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setPasswordReset(msg)}
          value = {passwordReset}
          isPassword= {true}
          customShowPasswordComponent={<Icon name='eye' type='entypo' />}
          customHidePasswordComponent={<Icon name='eye-with-line' type='entypo' />}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Nouveau mot de passe"
          placeholder="Nouveau mot de passe">
        </FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setConfirmedPasswordReset(msg)}
          value = {confirmedPasswordReset}
          isPassword= {true}
          customShowPasswordComponent={<Icon name='eye' type='entypo'/>}
          customHidePasswordComponent={<Icon name='eye-with-line' type='entypo'/>}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Confirmer le nouveau mot de passe"
          placeholder="Confirmer le nouveau mot de passe">
        </FloatingLabelInput>

          <Button
            style = {{ paddingTop: '1%' }}
            title = "Confirmer"
            onPress={() => {console.log("Reset password");  resetPassword()}}
          />

          
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
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  labelStyles: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 20,
    marginLeft: 15
  },
  containerStyles: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15
  }
});

