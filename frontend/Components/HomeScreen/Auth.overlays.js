import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Button, Overlay } from "@rneui/themed";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Icon } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Authentification(props) {

// Overlays Visibility
const [visibleOverlaySub, setVisibleOverlaySub] = useState(true);
const [visibleOverlayLog, setVisibleOverlayLog] = useState(false);
const [visibleOverlayForget, setVisibleOverlayForget] = useState(false);

const closeSubscribe = () => {
    setVisibleOverlaySub(!visibleOverlaySub);
};

const closeLogin = () => {
    setVisibleOverlayLog(!visibleOverlayLog)
}

///////// SUBSCRIBE ///////////
    // Save inputs values
    const [signupLastName, setSignupLastName] = useState("");
    const [signupFirstName, setSignupFirstName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupTel, setSignupTel] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    // Connection with BackEnd to create a User in BDD
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

///////// LOGIN ///////////
    // Save inputs values
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    // Connection States
    const [userConnected, setUserConnected] = useState("");

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
            
            if(bodyConnectionInfos.result) {
                setVisibleConnection(false);
                // AsyncStorage.setItem("userToken", bodyConnectionInfos.userBDD.token);
                props.saveToken(bodyConnectionInfos.userBDD.token);
                props.navigation.navigate("Restaurant");
            }
        } catch (err) {
            console.log("No user connected");
        }

        const testToken = await AsyncStorage.getItem("userToken");
        props.saveToken(testToken);
    };

///////// FORGET PASSWORD ///////////
    // Save inputs values
    const [emailReset, setEmailReset] = useState("");
    const [passwordReset, setPasswordReset] = useState("");

    // Reset Password States
    const [confirmedPasswordReset, setConfirmedPasswordReset] = useState("");
    const [resetPsw, setResetPsw] = useState(false);

    // Connexion avec le BackEnd pour modifier le MDP du User en BDD
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
    };



  return (
    <View>
      
        {/* SUBSCRIBE */}
        <Overlay isVisible={visibleOverlaySub} overlayStyle={{width: '90%'}}>
            {/* input Last Name */}
            <FloatingLabelInput
            onChangeText={(msg) => setSignupLastName(msg)}
            value={signupLastName}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Nom"
            placeholder="Nom"
            ></FloatingLabelInput>

            {/* input First Name */}
            <FloatingLabelInput
            onChangeText={(msg) => setSignupFirstName(msg)}
            value={signupFirstName}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Prénom"
            placeholder="Prénom"
            ></FloatingLabelInput>

            {/* input Email */}
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

            {/* input Phone Number */}
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

            {/* input Password */}
            <FloatingLabelInput
            onChangeText={(msg) => setSignupPassword(msg)}
            value={signupPassword}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Mot de passe"
            placeholder="Mot de passe"
            ></FloatingLabelInput>

            {/* Button Subscribe */}
            <Button
            style={{ marginTop: 30 }}
            title="S'inscrire"
            onPress={() => {
                console.log("s'inscrire");
                signup();
            }}
            />

            {/* Button Google Connect */}
            <Button
            style={{ paddingTop: "1%" }}
            title="Connexion via Google"
            onPress={() => console.log("s'inscrire via google")}
            />

            {/* J'ai déjà un compte */}
            <Text
            style={{ textAlign: "center", marginTop: "4%", marginBottom: "2%" }}
            >
            J'ai déjà un compte
            </Text>

            <TouchableOpacity
            onPress={() => {
                // overlay subscribe se ferme
                closeSubscribe();
                // overlay login s'affiche
                setVisibleOverlayLog(true);
            }}
            >
            <Text style={{ textAlign: "center", color: "green" }}>
                Se connecter
            </Text>
            </TouchableOpacity>
        </Overlay>

        {/* LOGIN */}
        <Overlay isVisible={visibleOverlayLog} overlayStyle={{ width: "90%" }}>
            {/* Input Email */}
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

            {/* Input Password */}
            <FloatingLabelInput
            onChangeText={(msg) => setSignInPassword(msg)}
            value={signInPassword}
            isPassword={true}
            customShowPasswordComponent={<Icon name="eye" type="entypo" />}
            customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Mot de passe"
            placeholder="Mot de passe"
            ></FloatingLabelInput>

            {/* Button Forget Password */}
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
                    // overlay login se ferme
                    closeLogin();
                    // overlay forget password s'affiche
                    setVisibleOverlayForget(true);
                }}
                
            >
                Mot de passe oublié
            </Text>
            </TouchableOpacity>

            {/* Button Login */}
            <Button
            style={{ paddingTop: "10%" }}
            title="Se connecter"
            onPress={() => {
                checkConnectionInformation(signInEmail, signInPassword);
            }}
            />
        </Overlay>

        {/* FORGET PASSWORD */}
        <Overlay isVisible={visibleOverlayForget} onBackdropPress={() => setVisibleOverlayForget(false)} overlayStyle={{ width: "90%" }}>
            {/* Input Email */}
            <FloatingLabelInput
            onChangeText={(msg) => setEmailReset(msg)}
            value={emailReset}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Email"
            placeholder="Email"
            ></FloatingLabelInput>

            {/* Input New Password */}
            <FloatingLabelInput
            onChangeText={(msg) => setPasswordReset(msg)}
            value={passwordReset}
            isPassword={true}
            customShowPasswordComponent={<Icon name="eye" type="entypo" />}
            customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Nouveau mot de passe"
            placeholder="Nouveau mot de passe"
            ></FloatingLabelInput>

            {/* Input New Password Confirm */}
            <FloatingLabelInput
            onChangeText={(msg) => setConfirmedPasswordReset(msg)}
            value={confirmedPasswordReset}
            isPassword={true}
            customShowPasswordComponent={<Icon name="eye" type="entypo" />}
            customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
            labelStyles={styles.labelStyles}
            containerStyles={styles.containerStyles}
            staticLabel
            label="Confirmer le nouveau mot de passe"
            placeholder="Confirmer le nouveau mot de passe"
            ></FloatingLabelInput>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft : 16, marginRight: 16, marginBottom: 30 }}>
                <Button
                    title="Annuler"
                    type="outline"
                    buttonStyle={{ borderColor:'red', height: 56, width: 130, borderRadius: 40 }}
                    titleStyle={{ color: 'red' }} 
                    onPress={() => setVisibleOverlayForget(false)}
                />
                <Button
                    title="Valider"
                    containerStyle={{}}
                    buttonStyle={{ height: 56, width: 130, borderRadius: 40 }}
                    titleStyle={{}}
                    onPress={() => setVisibleOverlayForget(false)}
                />
            </View>
        </Overlay>

    </View>
    
  )
}

const styles = StyleSheet.create({
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
})