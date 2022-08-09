import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Button, Overlay, Input } from "@rneui/themed";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "@react-native-community/datetimepicker";
import Authentification from "../Components/HomeScreen/Auth.overlays";
import filters from "../assets/files-JSON/filters.json"
import { acc } from "react-native-reanimated";
import { connect } from "react-redux";



function HomeScreen(props) {


  
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";


  // Pour la recherche du restaurant
  const [searchAddressResto, setSearchAddressResto] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateInfos, setDateInfos] = useState();
  const [timeVisible, setTimeVisible] = useState(false);

  // Selection des filtres  
  const listRegimeAlimentaire = (indice, element) => {
    const [colorAlimentaire, setColorAlimentaire] = useState("lightgrey");
    const [activeAlimentaire, setActiveAlimentaire] = useState(false);

    const handleClickAlimentaire = () => {
      setActiveAlimentaire(true);
      setColorAlimentaire("lightblue")
      if(activeAlimentaire === true){
        setActiveAlimentaire(false)
        setColorAlimentaire("lightgrey")
      }
    };
    return(
      <TouchableOpacity 
        key = {indice}
        style={{backgroundColor: colorAlimentaire, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
        onPress={()=> {handleClickAlimentaire()}}
        >
        <Text style = {{ textAlign: 'center' }}>{element}</Text>
      </TouchableOpacity>
    )
  }

  const listEquipement = (indice, element) => {
    const [colorEquipement, setColorEquipement] = useState("lightgrey");
    const [activeEquipement, setActiveEquipement] = useState(false);

    const handleClickEquipement = () => {
      setActiveEquipement(true);
      setColorEquipement("lightblue")
      if(activeEquipement === true){
        setActiveEquipement(false)
        setColorEquipement("lightgrey")
      }
    };
    return(
      <TouchableOpacity 
        key = {indice}
        style={{backgroundColor: colorEquipement, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
        onPress={()=> {handleClickEquipement()}}
        >
        <Text style = {{ textAlign: 'center' }}>{element}</Text>
      </TouchableOpacity>
    )
  }

  const listAccessibilité = (indice, element) => {
    const [colorAccessibilite, setColorAccessibilite] = useState("lightgrey");
    const [activeAccessibilite, setActiveAccessibilite] = useState(false);

    const handleClickAccessibilite = () => {
      setActiveAccessibilite(true);
      setColorAccessibilite("lightblue")
      if(activeAccessibilite === true){
        setActiveAccessibilite(false)
        setColorAccessibilite("lightgrey")
      }
    };
    return(
      <TouchableOpacity 
        key = {indice}
        style={{backgroundColor: colorAccessibilite, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
        onPress={()=> {handleClickAccessibilite()}}
        >
        <Text style = {{ textAlign: 'center' }}>{element}</Text>
      </TouchableOpacity>
    )
  }

  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
    setTimeVisible(false);
  };


  const searchResto = async () => {
    console.log("Search Resto");
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

      {/* Authentification Overlays */}
      <Authentification/>

      {/* SEARCH INPUTS */}
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
          
        {/* CALENDAR OVERLAY */}
        <Overlay isVisible={calendarVisible} overlayStyle={{width: '90%'}}>
          <Calendar
           onDayPress={day => {
            // console.log('Selected day')
            // console.log(day);
            setDateInfos(day.dateString);
            setCalendarVisible(false);
          }}
          // onMonthChange={month => {
          //   console.log('month changed', month);
          // }}
        />
      </Overlay>


        {/* TIME OVERLAY */}
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


      {/* FILTERS */}

        {/* ALIMENTATION FILTERS */}
        {
          filters && filters.map((data) => {

            if(data.id == 1){
              return(
                // touchable()
                <View key = {data.id}>
                <View style={styles.filtreContainer}>
                  {/* HEADER */}
                  <Text style={styles.title}>{data.categoryName}</Text>
                  {/* FILTERS */}
                  <View style={styles.filtreCarre}>
                    {data.filtres && data.filtres.map((alimentation, i) => {
                      return(
                        listRegimeAlimentaire(i, alimentation.name)
                      )
                    })}
                  </View>
                </View>
              </View>
              )
            }
          })
        }


        {/* EQUIPEMENTS FILTERS */}
        {
          filters && filters.map((data) => {
            if(data.id == 4) {
              return(
              <View key = {data.id}>
                <View style={styles.filtreContainer}>
                  {/* HEADER */}
                  <Text style={styles.title}>{data.categoryName}</Text>
                  {/* FILTERS */}
                  <View style={styles.filtreCarre}>
                    {data.filtres && data.filtres.map((equipement, i) => {

                      return(
                        listEquipement(i, equipement.name)
                      )
                    })}
                  </View>
                </View>
              </View>
              )
            }
          })
        }

        {/* ACCESS FILTERS */}
        {
          filters && filters.map((data) => {
            if(data.id == 5){
              return(
                <View key = {data.id}>
                  <View style={styles.filtreContainer}>
                    {/* HEADER */}
                    <Text style={styles.title}>{data.categoryName}</Text>
                    {/* FILTERS */}
                    <View style={styles.filtreCarre}>
                      {data.filtres && data.filtres.map((accessibilite, i) => {
                        return(
                          listAccessibilité(i, accessibilite.name)
                        )
                      })}
                    </View>
                  </View>
                </View>
                )
            }
          })
        }

      {/* BUTTON SEARCH */}
      <Button
        style={{ justifyContent: "flex-end" }}
        title="Rechercher un restaurant"
        onPress={() => {
          props.navigation.navigate("Result");
          searchResto();
        }}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewSearch: {
    flexDirection: "row",
    width: "90%",
  },
  filtreContainer: {
    flexDirection: "column",
    marginVertical: 10,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  filtreCarre: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  filtre: {
    backgroundColor: "lightgrey",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    saveSearchResto: function (addresse) {
      dispatch({ type: "saveSearchResto", addresse: addresse });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);