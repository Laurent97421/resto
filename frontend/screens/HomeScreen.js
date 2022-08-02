import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, Overlay, Input } from "@rneui/themed";

export default function HomeScreen(props) {
  // Overlay à l'ouverture de la page
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // Overlay page connection
  const [visibleConnection, setVisibleConnection] = useState(false);
  const toggleOverlayConnection = () => {
    setVisible(!visibleConnection);
  };

  // Overlay page mdp oublié
  const [visibleForgetPassword, setVisibleForgetPassword] = useState(false);
  const toggleOverlayForgetPassword = () => {
    setVisible(!visibleForgetPassword);
  };

  // Information de connexion
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // On vérifie dans le backend si le user existe déjà ou pas
  var checkConnectionInformation = async (mail, mdp) => {
    await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${mail}&passwordFromFront=${mdp}`,
    });
  };

  console.log(signInEmail);

  //sign-up

  var signup = async (firstName, name, mail, mdp, tel) => {
    let privateAdressIP = "37.65.5.111";

    await fetch("/sign-up", "http://" + privateAdressIP + ":3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstNameFromFront=${firstName}&nameFromFront=${name}&emailFromFront=${mail}&passwordFromFront=${mdp}&phoneFromFront=${tel}`,
    });
  };
}
return (
  <ScrollView>
    <Text h4 style={{ textAlign: "center" }}>
      HOMESCREEN
    </Text>
    <Button
      title="Go to Results page"
      onPress={() => props.navigation.navigate("Result")}
    />
    <Button
      style={{ marginTop: "50%" }}
      title="OVERLAYS TESTS"
      onPress={() => {
        toggleOverlay();
      }}
    />

    {/* Overlay avec les options de connexions */}
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text> Prénom</Text>
      <Input placeholder="Premom" style={{ paddingRight: "70%" }} />

      <Text> Nom</Text>
      <Input placeholder="Nom" style={{ paddingRight: "70%" }} />

      <Text> Adresse email</Text>
      <Input placeholder="Mail" style={{ paddingRight: "70%" }} />

      <Text> Numéro de téléphone</Text>
      <Input placeholder="Tel" style={{ paddingRight: "70%" }} />

      <Text> Mot de passe</Text>
      <Input placeholder="Mdp" style={{ paddingRight: "70%" }} />

      <Button title="S'inscrire" onPress={() => console.log("s'inscrire")} />
      <Button
        style={{ paddingTop: "1%" }}
        title="Connexion via Google"
        onPress={() => console.log("s'inscrire via google")}
      />
      <Text>J'ai déjà un compte</Text>
      <Button
        style={{ paddingTop: "1%" }}
        title="Se connecter"
        onPress={() => {
          console.log("ée");
          setVisible(false);
          setVisibleConnection(true);
        }}
      />
    </Overlay>

    {/* Overlay j'ai déjà un compte, se connecter */}
    <Overlay
      isVisible={visibleConnection}
      onBackdropPress={toggleOverlayConnection}
    >
      <Text> Adresse email</Text>
      <Input
        placeholder="Mail"
        style={{ paddingRight: "70%" }}
        onChangeText={(msg) => setSignInEmail(msg)}
      />

      <Text> Mot de passe</Text>
      <Input
        placeholder="Mdp"
        style={{ paddingRight: "70%" }}
        onChangeText={(msg) => setSignInPassword(msg)}
      />

      <Button
        style={{ paddingTop: "1%" }}
        title="Mot de passe oublié"
        onPress={() => {
          console.log("Mdp oublié zebi");
          setVisibleConnection(false);
          setVisibleForgetPassword(true);
        }}
      />

      <Button
        style={{ paddingTop: "1%" }}
        title="Connexion via Google"
        onPress={() => {
          console.log("Se connecter");
          checkConnectionInformation(signInEmail, signInPassword);
        }}
      />
    </Overlay>

    {/* Overlay mot de passe oublié */}
    <Overlay
      isVisible={visibleForgetPassword}
      onBackdropPress={toggleOverlayForgetPassword}
    >
      <Text> Adresse email</Text>
      <Input placeholder="Mail" style={{ paddingRight: "70%" }} />
      <Button
        style={{ paddingTop: "1%" }}
        title="Reset password"
        onPress={() => console.log("Reset password")}
      />
    </Overlay>
  </ScrollView>
);
