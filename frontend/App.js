import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import RestoScreen from "./screens/RestoScreen";

import MyReservationScreen from "./screens/HistoScreen";
import AccountScreen from "./screens/AccountScreen";
import ReservationScreen from "./screens/ReservationScreen";

import RestaurantCard from "./Components/RestaurantCard";

import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import token from "./reducers/token";

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);

const reducer = combineReducers({ token });
const store = configureStore({ reducer });

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigatorTest = function () {
  // On sauvegarde une fonction StackNavigatorTest dans une const
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Resto" component={RestoScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Restaurant">
          <Tab.Screen name="Mon compte" component={AccountScreen} />
          <Tab.Screen name="Restaurant" component={StackNavigatorTest} />
          <Tab.Screen name="Mes réservations" component={MyReservationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
