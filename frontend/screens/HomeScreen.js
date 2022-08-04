import React, { useState } from "react";

import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";


import { Button, Overlay, Input } from "@rneui/themed";
import IconIonic from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { color } from "@rneui/base";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Icon } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '@react-native-community/datetimepicker';



    
function HomeScreen(props) {

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
  };
  LocaleConfig.defaultLocale = 'fr';

  // Overlay à l'ouverture de la page
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // Overlay page connection
  const [visibleConnection, setVisibleConnection] = useState(false);
  const toggleOverlayConnection = () => {
    setVisibleConnection(!visibleConnection);
  };

  // Overlay page mdp oublié
  const [visibleForgetPassword, setVisibleForgetPassword] = useState(false);
  const toggleOverlayForgetPassword = () => {
    setVisibleForgetPassword(!visibleForgetPassword);
  };

  // Information de création de compte
  const [signupLastName, setSignupLastName] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupTel, setSignupTel] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Information de connexion
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [connectionOK, setConnectionOK] = useState(false);
  const [userConnected, setUserConnected] = useState("");

  // Information pour changement de mot de passe
  const [emailReset, setEmailReset] = useState("");
  const [passwordReset, setPasswordReset] = useState("");
  const [confirmedPasswordReset, setConfirmedPasswordReset] = useState("");
  const [resetPsw, setResetPsw] = useState(false);

  // Pour la recherche du restaurant
  const [searchAddressResto, setSearchAddressResto] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateInfos, setDateInfos] = useState();
  const [timeVisible, setTimeVisible] = useState(false);

  // Selection des filtres
  const [selectedHallal, setSelectedHallal] = useState(false);
  const [selectedVeggie, setSelectedVeggie] = useState(false);
  const [selectedOther, setSelectedOther] = useState(false);


  const selectHallal = () => {
    setSelectedHallal(!selectedHallal);
  }
  const selectVeggie = () => {
    setSelectedVeggie(!selectedVeggie);
  }

  const selectOther = () => {
    setSelectedOther(!selectedOther)
  }

  var colorFilterHallal;
  if(!selectedHallal){
    colorFilterHallal = 'lightgrey';
  } else {
    colorFilterHallal = 'lightblue';
  }

  var colorFilterVeggie;
  if(!selectedVeggie){
    colorFilterVeggie = 'lightgrey';
  } else {
    colorFilterVeggie = 'lightblue';
  }

  var colorFilterOther;
  if(!selectedOther){
    colorFilterOther = 'lightgrey';
  } else {
    colorFilterOther = 'lightblue';
  }

  // signup
  var signup = async () => {
    let privateAdressIP = "172.20.10.8";

    const test = await fetch("http://" + privateAdressIP + ":3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstNameFromFront=${signupFirstName}&nameFromFront=${signupLastName}&emailFromFront=${signupEmail}&passwordFromFront=${signupPassword}&phoneFromFront=${signupTel}`,
    });
    // const bodyTest = test.json();
    // var token = bodyTest.token
    // if(token){
    //   AsyncStorage.setItem("userToken", token)
    // }
  };

  // On vérifie dans le backend si le user existe déjà ou pas
  var checkConnectionInformation = async (mail, mdp) => {
    let privateAdressIP = "172.20.10.8";
    try {
      var connectionInfos = await fetch(
        "http://" + privateAdressIP + ":3000/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `emailFromFront=${mail}&passwordFromFront=${mdp}`,
        }
      );
      // console.log('try ok')

      var bodyConnectionInfos = await connectionInfos.json();
      setUserConnected(bodyConnectionInfos);
      console.log(bodyConnectionInfos);
      // Si les données entrées appartiennent à un user en BDD
      // result sera = true, et donc on set
      if (bodyConnectionInfos.result) {
        setConnectionOK(true);
        AsyncStorage.setItem("userToken", bodyConnectionInfos.userBDD.token);
      }
    } catch (err) {
      console.log("No user connected");
    }
    const testToken = await AsyncStorage.getItem("userToken");
    props.saveToken(testToken);
    console.log("Le token");
    console.log(testToken);
  };

  // console.log('En dehors')
  // console.log(userConnected)
  // // Si les infos écritent correspondent à un user en bdd, redirect vers la home page
  var testConnectionPassed = () => {
    if (connectionOK) {
      setVisibleConnection(false);
      props.navigation.navigate("Restaurant", { screen: HomeScreen });
      // props.navigation.navigate('Mon compte')
    }
  };

  // Declenche la route pour changer de mot de passe
  var resetPassword = async () => {
    const dataResetPassword = await fetch("/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromResetPassword=${emailReset}&passwordFromResetPassword=${passwordReset}&passwordFromResetPasswordConfirmed=${confirmedPasswordReset}`,
    });

    const bodyResetPassword = dataResetPassword.json();

    // Si tout est ok en back, result = true, et donc on setResetPsw à true
    // et ensuite si resetPsw on revient sur l'overlay j'ai déjà un compte
    if (bodyResetPassword.result) {
      console.log("test resetPassword");
      setResetPsw(true);
    }
  };
  // Si le password a été changé, on ferme l'overlay du chgt de mdp et on va sur celui de j'ai déjà un compte
  if (resetPsw) {
    toggleOverlayForgetPassword();
    toggleOverlayConnection();
  }


  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));


  const showTimePicker = () => {
    setTimePicker(true);
  }

  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false)
    setTimeVisible(false)
  }

  const [filter, setFilter] = useState({});
  // setFilter({a: 'a'})
  console.log(filter)



  const searchResto = async () => {
    console.log('Search Resto')
    let privateAdressIP = "172.20.10.8";

    

      // On envoie nos informations de recherche au backend
      //// Requête
      const searchUser = await fetch("http://" + privateAdressIP + ":3000/result-screen", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `address=${searchAddressResto}&date=${dateInfos}&time=${time}`,
      });
  }



  return (
    <ScrollView>

        <Text h4 style={{textAlign: 'center'}}>Rechercher un restaurant</Text>
        
        {/* <Button
        style = {{ marginTop: "50%"}}
        title = "OVERLAYS TESTS"
        onPress={() => {toggleOverlay()}}
        /> */}

        {/* Overlay avec les options de connexions */}
        <Overlay isVisible={visible} overlayStyle={{width: '90%'}}>




        <FloatingLabelInput
          onChangeText={(msg) => setSignupLastName(msg)}
          value={signupLastName}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Nom"
          placeholder="Nom"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setSignupFirstName(msg)}
          value={signupFirstName}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Prénom"
          placeholder="Prénom"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setSignupEmail(msg)}
          value={signupEmail}
          keyboardType="email-address"
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Email"
          placeholder="Email"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setSignupTel(msg)}
          value={signupTel}
          keyboardType="numeric"
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Tel"
          placeholder="Tel"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setSignupPassword(msg)}
          value={signupPassword}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Mot de passe"
          placeholder="Mot de passe"
        ></FloatingLabelInput>

        <Button
          style={{ marginTop: 30 }}
          title="S'inscrire"
          onPress={() => {
            console.log("s'inscrire");
            signup();
          }}
        />
        <Button
          style={{ paddingTop: "1%" }}
          title="Connexion via Google"
          onPress={() => console.log("s'inscrire via google")}
        />
        <Text
          style={{ textAlign: "center", marginTop: "4%", marginBottom: "2%" }}
        >
          J'ai déjà un compte
        </Text>
        <TouchableOpacity
          onPress={() => {
            toggleOverlay();
            setVisibleConnection(true);
          }}
        >
          <Text style={{ textAlign: "center", color: "green" }}>
            Se connecter
          </Text>
        </TouchableOpacity>
      </Overlay>
      {/* Overlay j'ai déjà un compte, se connecter */}
      <Overlay isVisible={visibleConnection} overlayStyle={{ width: "90%" }}>
        <FloatingLabelInput
          keyboardType="email-address"
          onChangeText={(msg) => setSignInEmail(msg)}
          value={signInEmail}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Email"
          placeholder="Email"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setSignInPassword(msg)}
          value={signInPassword}
          isPassword={true}
          customShowPasswordComponent={<Icon name="eye" type="entypo" />}
          customHidePasswordComponent={
            <Icon name="eye-with-line" type="entypo" />
          }
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Mot de passe"
          placeholder="Mot de passe"
        ></FloatingLabelInput>

        <TouchableOpacity
          onPress={() => {
            toggleOverlay();
            setVisibleConnection(true);
          }}
        >
          <Text
            style={{
              textAlign: "right",
              color: "green",
              fontSize: 10,
              paddingRight: 20,
            }}
            onPress={() => {
              setVisibleConnection(false);
              setVisibleForgetPassword(true);
            }}
          >
            Mot de passe oublié
          </Text>
        </TouchableOpacity>

        <Button
          style={{ paddingTop: "10%" }}
          title="Se connecter"
          onPress={() => {
            console.log("Se connecter");
            checkConnectionInformation(signInEmail, signInPassword);
            testConnectionPassed();
          }}
        />
      </Overlay>
      {/* Overlay mot de passe oublié */}
      <Overlay
        isVisible={visibleForgetPassword}
        onBackdropPress={toggleOverlayForgetPassword}
        overlayStyle={{ width: "90%" }}
      >
        <FloatingLabelInput
          onChangeText={(msg) => setEmailReset(msg)}
          value={emailReset}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Email"
          placeholder="Email"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setPasswordReset(msg)}
          value={passwordReset}
          isPassword={true}
          customShowPasswordComponent={<Icon name="eye" type="entypo" />}
          customHidePasswordComponent={
            <Icon name="eye-with-line" type="entypo" />
          }
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Nouveau mot de passe"
          placeholder="Nouveau mot de passe"
        ></FloatingLabelInput>

        <FloatingLabelInput
          onChangeText={(msg) => setConfirmedPasswordReset(msg)}
          value={confirmedPasswordReset}
          isPassword={true}
          customShowPasswordComponent={<Icon name="eye" type="entypo" />}
          customHidePasswordComponent={
            <Icon name="eye-with-line" type="entypo" />
          }
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          staticLabel
          label="Confirmer le nouveau mot de passe"
          placeholder="Confirmer le nouveau mot de passe"
        ></FloatingLabelInput>
        </Overlay>



        {/* RECHERCHE DU RESTO */}
        <View style = {styles.viewSearch}>
            <TextInput 
            style = {{margin: 12, borderWidth: 1, width: '30%', borderRadius: 5}}
            placeholder="Adresse"
            onChangeText={(msg) => setSearchAddressResto(msg)}
            value = {searchAddressResto}
            />

            <TextInput 
            onPressIn={() => {console.log('woula'); setCalendarVisible(true)}}
            editable = {false}
            style = {{margin: 12, borderWidth: 1, width: '30%', borderRadius: 5}}
            placeholder="Date"
            onChangeText={(msg) => setSearchAddressResto(msg)}
            value = {dateInfos}
            />

            {!timePicker && (
              <TextInput 
                style = {{margin: 12, borderWidth: 1, width: '30%', borderRadius: 5}}
                onPressIn = {() => {console.log('zebi'); setTimeVisible(); showTimePicker()}}
                editable = {false}
                placeholder="Heure"
                onChangeText={(msg) => setTime(msg)}
                value = {time.getHours().toString() + ':' + time.getMinutes().toString()}
            />)}

        </View>
            

        <Overlay isVisible={calendarVisible} overlayStyle={{width: '90%'}}>
          <Calendar
           onDayPress={day => {
            // console.log('Selected day')
            // console.log(day);
            setDateInfos(day.dateString)
            setCalendarVisible(false);
          }}
          // onMonthChange={month => {
          //   console.log('month changed', month);
          // }}
          />
        </Overlay>

      <View>
        <View style={styles.filtreContainer}>
          <Text style={styles.title}>Alimentation</Text>
          
          <View style={styles.filtreCarre}>

            <TouchableOpacity style={{backgroundColor: colorFilterHallal, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}} onPress={()=> {selectHallal()}}>
              <Text>Hallal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: colorFilterVeggie, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}} onPress={()=> {selectVeggie()}}>
              <Text>Veggie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: colorFilterOther, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}} onPress={()=> {selectOther()}}>
              <Text>Je ne mange que de l'air bio</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>

      <View>
        <View style={styles.filtreContainer}>
          <Text style={styles.title}>Equipements</Text>
          
          <View style={styles.filtreCarre}>

            <TouchableOpacity style={{backgroundColor: colorFilterHallal, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}} onPress={()=> {selectHallal()}}>
              <Text>Image jolie</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>

      <View>
        <View style={styles.filtreContainer}>
          <Text style={styles.title}>Accessibilité</Text>
          
          <View style={styles.filtreCarre}>

            <TouchableOpacity style={{backgroundColor: colorFilterHallal, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}} onPress={()=> {selectHallal()}}>
              <Text>Image jolie</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>






      <Button
      style = {{justifyContent: 'flex-end'}}
      title = "Rechercher un restaurant"
      onPress={() => {props.navigation.navigate('Result'); searchResto()}}
      />
    

      {timePicker && (
        <Overlay overlayStyle = {{width: '23%'}}>
          <DateTimePicker
          value = {time}
          mode = {'time'}
          minuteInterval = {15}
          display = {Platform.OS === 'ios' ? 'default' : 'default'}
          is24hour = {false}
          onChange = {onTimeSelected}
          />
        </Overlay>
      )}

    </ScrollView>
  );
}






{if(true){ console.log(true)}}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  labelStyles: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginTop: 20,
    marginLeft: 15,
  },
  containerStyles: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 15,

    marginRight: 15
  },
  viewSearch: {
    flexDirection: 'row',
    width: '90%'
  },
  filtreContainer:{
    flexDirection: 'column',
    marginVertical: 10,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  filtreCarre: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filtre: {
    backgroundColor: 'lightgrey',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }

});

function mapDispatchToProps(dispatch) {
  return {
    saveToken: function (token) {
      dispatch({ type: "saveToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
