import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Button, Overlay } from "@rneui/themed";
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

import Authentification from "../Components/HomeScreen/Auth.overlays";

    
export default function HomeScreen(props) {

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
            setDateInfos(day.dateString)
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
        <View>
          <View style={styles.filtreContainer}>
            
            {/* HEADER */}
            <Text style={styles.title}>Alimentation</Text>
            
            {/* FILTERS */}
            <View style={styles.filtreCarre}>
              <TouchableOpacity 
                style={{backgroundColor: colorFilterHallal, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
                onPress={()=> {selectHallal()}}
              >
                <Text>Hallal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{backgroundColor: colorFilterVeggie, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
                onPress={()=> {selectVeggie()}}
              >
                <Text>Veggie</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{backgroundColor: colorFilterOther, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
                onPress={()=> {selectOther()}}
              >
                <Text>Je ne mange que de l'air bio</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* EQUIPEMENTS FILTERS */}
        <View>
          <View style={styles.filtreContainer}>

            {/* HEADER */}
            <Text style={styles.title}>Equipements</Text>
            
            {/* FILTERS */}
            <View style={styles.filtreCarre}>
              <TouchableOpacity
                style={{backgroundColor: colorFilterHallal, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
                onPress={()=> {selectHallal()}}
              >
                <Text>Image jolie</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* ACCESS FILTERS */}
        <View>
          <View style={styles.filtreContainer}>

            {/* HEADER */}
            <Text style={styles.title}>Accessibilité</Text>
            
            {/* FILTERS */}
            <View style={styles.filtreCarre}>
              <TouchableOpacity
                style={{backgroundColor: colorFilterHallal, width: 70, height: 70, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
                onPress={()=> {selectHallal()}}
              >
                <Text>Image jolie</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      {/* BUTTON SEARCH */}
      <Button
      style = {{justifyContent: 'flex-end'}}
      title = "Rechercher un restaurant"
      onPress={() => {props.navigation.navigate('Result'); searchResto()}}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
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