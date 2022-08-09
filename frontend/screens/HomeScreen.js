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
// import { IconFill, IconOutline } from "@ant-design/icons-react-native";
// import { Icon } from "@rneui/themed";
// import { checkcircleo } from "react-native-vector-icons/AntDesign";
import Icon from 'react-native-vector-icons/AntDesign';




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
  const listFilter = (indice, element) => {
    const [color, setColor] = useState("lightgrey");
    const [active, setActive] = useState(false);
    const [logoColor, setLogoColor] = useState("black")

    //  Filtres
    const handleClick = () => {
      setActive(true);
      setColor("lightblue")
      setLogoColor("blue")
      if(active === true){
        setActive(false)
        setColor("lightgrey")
        setLogoColor("black")
      }
    };
    return(
      <TouchableOpacity 
      key = {indice}
      style={{backgroundColor: color, width: 75, height: 75, justifyContent: 'center',alignItems: 'center', borderRadius: 10, marginRight: 10, marginVertical: 10}}
      onPress={()=> {handleClick()}}
      >
        <View style = {{marginLeft: '70%', marginTop: '-30%', marginBottom: '13%', backgroundColor: 'white', borderRadius: '90%'}}>
          <Icon name="checkcircleo" color = {logoColor} />
        </View>
          <Text style = {{ textAlign: 'center', fontSize: 12 }}  >{element}</Text>
        <View >
        </View>
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
                        listFilter(i, alimentation.name)
                      )
                    })}
                  </View>
                </View>
              </View>
              )
            }
          })
        }

        {/* ALLERGENES */}
        {
          filters && filters.map((data) => {
            if(data.id == 2) {
              return(
              <View key = {data.id}>
                <View style={styles.filtreContainer}>
                  {/* HEADER */}
                  <Text style={styles.title}>{data.categoryName}</Text>
                  {/* FILTERS */}
                  <View style={styles.filtreCarre}>
                    {data.filtres && data.filtres.map((equipement, i) => {

                      return(
                        listFilter(i, equipement.name)
                      )
                    })}
                  </View>
                </View>
              </View>
              )
            }
          })
        }

        {/* MOYENS DE PAIEMENT */}
        {
          filters && filters.map((data) => {
            if(data.id == 3) {
              return(
              <View key = {data.id}>
                <View style={styles.filtreContainer}>
                  {/* HEADER */}
                  <Text style={styles.title}>{data.categoryName}</Text>
                  {/* FILTERS */}
                  <View style={styles.filtreCarre}>
                    {data.filtres && data.filtres.map((equipement, i) => {

                      return(
                        listFilter(i, equipement.name)
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
                        listFilter(i, equipement.name)
                        
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
                          listFilter(i, accessibilite.name)
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
          props.saveSearchResto(searchAddressResto, dateInfos, time.getHours() + ':' + time.getMinutes())

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
    // justifyContent: "space-between",
    alignItems: "center",
    flexWrap: 'wrap'
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
    saveSearchResto: function (adresse, date, heure) {
      dispatch({ type: "saveSearchResto", adresse: adresse, date: date, heure: heure });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);