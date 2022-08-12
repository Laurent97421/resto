import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Button, Overlay, Input } from "@rneui/themed";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import Authentification from "../Components/HomeScreen/Auth.overlays";
import filters from "../assets/files-JSON/filters.json";
import { acc } from "react-native-reanimated";
import { connect } from "react-redux";

import { AntDesign } from '@expo/vector-icons';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker'



function HomeScreen(props) {


  // SET UP DU CALENDRIER //
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
  // // // // // // // //

  // Pour la recherche du restaurant
  const [searchAddressResto, setSearchAddressResto] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateInfos, setDateInfos] = useState();
  const [filter, setFilter] = useState([])
  
  // Selection des filtres  
  const listFilter = (indice, element) => {
    const [color, setColor] = useState("#DEDEDE");
    const [active, setActive] = useState(false);
    const [logoColor, setLogoColor] = useState("#BDBDBD");

    //  Filtres
    const handleClick = () => {
      setActive(true);
      setColor("#D4F0F6")
      setLogoColor("#009ABC")
      setFilter([...filter, {element: element}])
      
      if(active === true){
        setActive(false)
        setColor("#DEDEDE")
        setLogoColor("#BDBDBD")
        var allFilter = filter.filter(e => e.element !== element)
        setFilter(allFilter)
      }
    };

    // filters && filters.map((data) => {

    //   if(data.id == 1){
    //     return(
    //       // touchable()
    //       <View key = {data.id}>
    //       <View style={styles.filtreContainer}>
    //         {/* HEADER */}
    //         <Text style={styles.title}>{data.categoryName}</Text>
    //         {/* FILTERS */}
    //         <View style={styles.filtreCarre}>
    //           {data.filtres && data.filtres.map((alimentation, i) => {
    //             return(
    //               listFilter(i, alimentation.name)
    //             )
    //           })}
    // console.log(filter)

    return (
      <TouchableOpacity
        key={indice}
        style={{
          backgroundColor: "#F9F9F9",
          width: 75,
          height: 75,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginRight: 10,
          marginVertical: 10,
          borderWidth: 0.5,
          borderColor: color
        }}
        onPress={() => {
          handleClick();
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            borderRadius: 90,
          }}
        >
          <AntDesign name="checkcircle" size={13} color={logoColor} />
        </View>
        <Text style={{ textAlign: "center", fontSize: 12 }}>{element}</Text>
        <View></View>
      </TouchableOpacity>
    );
  };

  // const searchResto = async () => {
  //   console.log("Search Resto");
  //   let privateAdressIP = "172.20.10.8";

  //   // On envoie nos informations de recherche au backend
  //   //// Requête

  //   const searchUser = await fetch("http://" + privateAdressIP + ":3000/result-screen", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `address=${searchAddressResto}&date=${dateInfos}&time=${time}`,
  //   });
  // }


  // SELECTION DE L'HEURE //
  const [heureVisible, setHeureVisible] = useState(false);

  const showHour = () => {
    setHeureVisible(!heureVisible)
  }
  const [time, setTime] = useState('');
  

  const timePicker = ()=> {
    
    return (
      <DatePicker
      mode="time"
      minuteInterval={3}
      onTimeChange={selectedTime => {setTime(selectedTime); showHour()}}
    />
    )
  }
  // // // // // // // //

  return (
    <View style={{flex:1, paddingTop: 60, backgroundColor: 'white'}}>
      <Text h4 style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Rechercher un restaurant</Text>

      {/* Authentification Overlays */}
      <Authentification/>

      {/* SEARCH INPUTS */}
      <View style = {styles.searchInputsContainer}>
        <TextInput 
        style = {styles.searchInput}
        placeholder="Adresse"
        onChangeText={(msg) => setSearchAddressResto(msg)}
        value = {searchAddressResto}
        />


        <TextInput 
        style = {styles.searchInput}
        onPressIn={() => {console.log('woula'); setCalendarVisible(true)}}
        editable = {false}
        placeholder="Date"
        onChangeText={(msg) => setSearchAddressResto(msg)}
        value = {dateInfos}
        />

        <TextInput 
            style = {styles.searchInput}
            onPressIn = {() => {showHour()}}
            editable = {false}
            placeholder="Heure"
            onChangeText={(msg) => setTime(msg)}
            value = {time}
        />
      </View>
        
      {/* CALENDAR OVERLAY */}
      <Overlay isVisible={calendarVisible} overlayStyle={{width: '90%'}}>
        <Calendar
         onDayPress={day => {
          setDateInfos(day.dateString);
          setCalendarVisible(false);
        }}
      />
    </Overlay>

        {/* TIME OVERLAY */}
      <Overlay isVisible = {heureVisible} onBackdropPress = {showHour} overlayStyle = {{width: '90%', height: 'auto', borderRadius: 20}} >
        {timePicker()}
      </Overlay>


    <ScrollView>
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
    </ScrollView>

    {/* BUTTON SEARCH */}
    <Button
      buttonStyle={styles.buttonSearch}
      titleStyle={{color:'black'}}
      title="Rechercher un restaurant"
      onPress={() => {
        props.navigation.navigate("Result");
        // searchResto();
        props.saveSearchResto(searchAddressResto, dateInfos, time, filter)

      }}
    />

  </View>

  );
}

const styles = StyleSheet.create({
  searchInputsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'space-between'
  },
  searchInput: {
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 44,
    width: '30%',
    borderRadius: 20,
    paddingLeft: 10
  },
  filtreContainer: {
    flexDirection: "column",
    marginVertical: 10,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 3,
    fontWeight: "bold",
    fontSize: 16
  },
  filtreCarre: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    flexWrap: "wrap",
  },
  filtre: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonSearch: {
    backgroundColor: '#FDCF08',
    marginHorizontal: 16,
    height: 44,
    borderRadius: 20,
    marginVertical: 16
  }
});

function mapDispatchToProps(dispatch) {
  return {
    saveSearchResto: function (adresse, date, heure, filter) {
      dispatch({
        type: "saveSearchResto",
        adresse: adresse,
        date: date,
        heure: heure,
        filter: filter,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
