import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { TabActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

// installer -> npm i react-native-keyboard-aware-scroll-view --save
// importer -> import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function ReservationScreen(props) {
  // console.log(typeof(formatDate(new Date(props.userSearch[0].date))))

  // Pour naviguer vers un screen du Bottom Tab Nav à partir d'un bouton
  const jumpToAction = TabActions.jumpTo("Mes réservations");
  const navigation = useNavigation();

  // INPUTS STATES
  const [counterAdults, setCounterAdults] = useState(0);
  const [counterChildren, setCounterChildren] = useState(0);
  const [counterBabies, setCounterBabies] = useState(0);

  // Fonctions pour formatter la date au format local
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  // Fonctions pour que le compteur convives ne soit pas < 0
  function minConvivesAdults() {
    if (counterAdults < 1) {
      setCounterAdults(0);
    } else {
      setCounterAdults(counterAdults - 1);
    }
  }

  function minConvivesChildren() {
    if (counterChildren < 1) {
      setCounterChildren(0);
    } else {
      setCounterChildren(counterChildren - 1);
    }
  }

  function minConvivesBabies() {
    if (counterBabies < 1) {
      setCounterBabies(0);
    } else {
      setCounterBabies(counterBabies - 1);
    }
  }

  // SAVE RESERVATION IN BDD
  // let privateAdressIP = "172.20.10.8"; // Laurent
  // let privateAdressIP = "172.20.10.4"; // Pauline
  let privateAdressIP = "192.168.1.14"; // JOhann

  // Connection with BackEnd to create a User in BDD
  var saveReservation = async () => {
    // Add new reservation in database using route from back end
    const saveResa = await fetch(
      "http://" + privateAdressIP + ":3000/reservation",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `restoName=${props.restoSelected[0].name}&restoAddress=${
          props.restoSelected[0].address
        }&restoZIPCode=${props.restoSelected[0].ZIPcode}&restoCity=${
          props.restoSelected[0].city
        }&restoPhone=${props.restoSelected[0].phoneNumber}&date=${formatDate(
          new Date(props.userSearch[0].date)
        )}&hour=${props.userSearch[0].heure}&numberOfPeople=${
          counterAdults + counterChildren + counterBabies
        }&resaName=${props.userConnected.userFromBDD.userName.toUpperCase()}&resaPhone=${
          props.userConnected.userFromBDD.userPhone
        }&status=${"En attente..."}&tokenFromRedux=${
          props.userConnected.userFromBDD.token
        }`,
      }
    );
    // const responseText = await saveResa.text();
    const responseJson = await saveResa.json();
    // console.log('Voici la réservation sauvegardé')
    // console.log(responseJson)
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: props.restoSelected[0].logo }}
          />
        </View>
        <View style={styles.restoInfosContainer}>
          <Text style={styles.restoName}>{props.restoSelected[0].name}</Text>
          <Text style={styles.restoAddress}>
            {props.restoSelected[0].address}
            {"\n"}
            {props.restoSelected[0].ZIPcode} {props.restoSelected[0].city}
          </Text>
          <Text style={styles.restoPhone}>
            {props.restoSelected[0].phoneNumber}
          </Text>
        </View>
      </View>

      {/* Inputs */}
      <View style={styles.inputsContainer}>
        {/* Date */}
        <View>
          <Text style={styles.inputHeader}>Date</Text>
          <TextInput
            value={formatDate(new Date(props.userSearch[0].date))}
            style={[styles.input, { paddingLeft: 10 }]}
          />
        </View>

        {/* Heure */}
        <View>
          <Text style={styles.inputHeader}>Heure</Text>
          <TextInput
            value={props.userSearch[0].heure}
            style={[styles.input, { paddingLeft: 10 }]}
          />
        </View>

        {/* Nombre de convives */}
        <View>
          <Text style={styles.inputHeader}>Nombre de convives</Text>

          <View style={styles.inputsConvivesContainer}>
            {/* Adultes */}
            <View style={styles.inputConvives}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>ADULTES</Text>
              <Text style={{ fontSize: 12 }}>13 ans et +</Text>

              {/* Stepper Input */}
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    alignSelf: "center",
                    left: 10,
                  }}
                >
                  <Ionicons
                    name="remove-circle"
                    size={24}
                    color="lightgrey"
                    onPress={() => minConvivesAdults()}
                  />
                </View>
                <TextInput
                  editable={false}
                  style={[styles.input, styles.inputStepper]}
                  value={counterAdults.toString()}
                  textAlign="center"
                />
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 10,
                  }}
                >
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color="lightgrey"
                    onPress={() => setCounterAdults(counterAdults + 1)}
                  />
                </View>
              </View>
            </View>

            {/* Enfants */}
            <View style={styles.inputConvives}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>ENFANTS</Text>
              <Text style={{ fontSize: 12 }}>de 2 à 12 ans</Text>

              {/* Stepper Input */}
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    alignSelf: "center",
                    left: 10,
                  }}
                >
                  <Ionicons
                    name="remove-circle"
                    size={24}
                    color="lightgrey"
                    onPress={() => minConvivesChildren()}
                  />
                </View>
                <TextInput
                  editable={false}
                  style={[styles.input, styles.inputStepper]}
                  value={counterChildren.toString()}
                  textAlign="center"
                />
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 10,
                  }}
                >
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color="lightgrey"
                    onPress={() => setCounterChildren(counterChildren + 1)}
                  />
                </View>
              </View>
            </View>

            {/* Bébé */}
            <View style={styles.inputConvives}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>BÉBÉ</Text>
              <Text style={{ fontSize: 12 }}>- de 2 ans</Text>

              {/* Stepper Input */}
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    alignSelf: "center",
                    left: 10,
                  }}
                >
                  <Ionicons
                    name="remove-circle"
                    size={24}
                    color="lightgrey"
                    onPress={() => minConvivesBabies()}
                  />
                </View>
                <TextInput
                  editable={false}
                  style={[styles.input, styles.inputStepper]}
                  value={counterBabies.toString()}
                  textAlign="center"
                />
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 10,
                  }}
                >
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color="lightgrey"
                    onPress={() => setCounterBabies(counterBabies + 1)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Nom */}
        <View>
          <Text style={styles.inputHeader}>Nom associé</Text>
          <TextInput
            value={props.userConnected.userFromBDD.userName.toUpperCase()}
            style={[styles.input, { paddingLeft: 10 }]}
          />
        </View>

        {/* Numéro de téléphone */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.inputHeader}>Numéro de téléphone</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                }}
              >
                Changer de numéro
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            keyboardType="phone-pad"
            value={props.userConnected.userFromBDD.userPhone.toString()}
            style={[styles.input, { paddingLeft: 10 }]}
          />
        </View>
      </View>

      {/* Button */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.dispatch(jumpToAction);
            saveReservation();
          }}
        >
          <Text style={styles.buttonTitle}>Je réserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    restoSelected: state.restoSelected,
    userConnected: state.user,
    userSearch: state.search,
  };
}

export default connect(mapStateToProps, null)(ReservationScreen);

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    borderRadius: 40,
  },
  restoInfosContainer: {
    flexDirection: "column",
    marginLeft: 15,
    justifyContent: "center",
  },
  restoName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restoAddress: {
    fontSize: 13,
  },
  restoPhone: {
    fontSize: 13,
    fontWeight: "600",
  },
  //Inputs
  inputsContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  inputHeader: {
    fontSize: 16,
    fontWeight: "400",
  },
  input: {
    height: 44,
    borderWidth: 0.3,
    borderColor: "grey",
    marginVertical: 10,
    borderRadius: 20,
  },
  // Nombre de convives
  inputsConvivesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inputConvives: {
    width: "30%",
    alignItems: "center",
  },
  inputStepper: {
    width: "100%",
  },
  // Button
  button: {
    backgroundColor: "#FDCF08",
    height: 56,
    marginHorizontal: 16,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
