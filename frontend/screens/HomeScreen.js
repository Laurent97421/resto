import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity, TextInput } from "react-native";
import { Button, Overlay, Input } from "@rneui/themed";
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { color } from "@rneui/base";




    
export default function HomeScreen(props) {

  // Overlay à l'ouverture de la page
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  }

  // Overlay page connection
  const [visibleConnection, setVisibleConnection] = useState(false);
  const toggleOverlayConnection = () => {
    setVisible(!visibleConnection);
  }

  // Overlay page mdp oublié
  const [visibleForgetPassword, setVisibleForgetPassword] = useState(false);
  const toggleOverlayForgetPassword = () => {
    setVisible(!visibleForgetPassword);
  }

  // Information de connexion
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Information pour changement de mot de passe
  const [emailReset, setEmailRest] = useState('');
  const [passwordReset, setPasswordReset] = useState('');
  const [confirmedPasswordReset, setConfirmedPasswordReset] = useState('');



  // On vérifie dans le backend si le user existe déjà ou pas
  var checkConnectionInformation = async (mail, mdp) => {
    await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `emailFromFront=${mail}&passwordFromFront=${mdp}`
    });
  }

  // Declenche la route pour changer de mot de passe
  var resetPassword = async () => {
    await fetch('/reset-password', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `emailFromResetPassword=${emailReset}&passwordFromResetPassword=${passwordReset}&passwordFromResetPasswordConfirmed=${confirmedPasswordReset}`
    }); 
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
          <Text>  Nom</Text>

          <TextInput style = {styles.input} placeholder = "WESH ZOUBA LA MICHE"/>
          {/* <Input placeholder="Nom" style = {styles.input} /> */}
          <Text>  Prenom</Text>
          <Input placeholder="Prenom" />

          <Text>  Adresse email</Text>
          <Input placeholder="Mail" />

          <Text>  Numéro de téléphone</Text>
          {/* <Input placeholder="Tel"/>
           */}
          <TextInput style = {styles.input} placeholder = "WESH ZOUBA LA MICHE" keyboardType="phone-pad"/>


          <Text>  Mot de passe</Text>
          <Input placeholder="Mdp"/>


          <Button
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
        <Overlay isVisible={visibleConnection} onBackdropPress={setVisibleConnection} overlayStyle={{width: '90%'}}>
          <Text>  Adresse email</Text>
          <Input 
          placeholder="Mail" 
          style={{ paddingRight: '70%'}} 
          onChangeText={(msg) => setSignInEmail(msg)}
          />

          <Text>  Mot de passe</Text>
          <Input
          placeholder="Mdp" 
          style={{ paddingRight: '70%'}} 
          onChangeText={(msg) => setSignInPassword(msg)} 
          />

          <TouchableOpacity onPress = {() => {toggleOverlay(); setVisibleConnection(true)}}>
            <Text style={{textAlign: 'right', color: 'green', fontSize: 10}} onPress={() => {setVisibleConnection(false); setVisibleForgetPassword(true); checkConnectionInformation(signInEmail, signInPassword)}} >Mot de passe oublié</Text>
          </TouchableOpacity>
          <Button
            style = {{ paddingTop: '10%' }}
            title = "Se connecter"
            onPress={() => {console.log("Se connecter")}}
          />

        </Overlay>

        {/* Overlay mot de passe oublié */}
        <Overlay isVisible={visibleForgetPassword} onBackdropPress={setVisibleForgetPassword} overlayStyle={{width: '90%'}}>
          <Text>  Adresse email</Text>
          <Input 
          placeholder="Mail" 
          style={{ paddingRight: '70%'}} 
          onChangeText={(msg) => emailReset(msg)}
          />

          <Text>  Nouveau mot de passe</Text>
          <Input 
          placeholder="Mdp" 
          style={{ paddingRight: '70%'}} 
          onChangeText={(msg) => passwordReset(msg)}
          />

          <Text>  Confirmer le nouveau mot de passe</Text>
          <Input 
          placeholder="Mdp" 
          style={{ paddingRight: '70%'}} 
          onChangeText={(msg) => confirmedPasswordReset(msg)}
          />

          <Button
            style = {{ paddingTop: '1%' }}
            title = "Confirmer"
            onPress={() => console.log("Reset password")}
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
  }
});


// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     alignItems: 'center'
//   },
//   button: {
//     marginBottom: 30,
//     width: 260,
//     alignItems: 'center',
//     backgroundColor: '#2196F3'
//   },
//   buttonText: {
//     textAlign: 'center',
//     padding: 20,
//     color: 'white'
//   }
// });
