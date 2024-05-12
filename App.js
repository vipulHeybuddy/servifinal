import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { Provider , useSelector } from "react-redux";
import store from "./src/redux/store";
import Mic from "./src/components/Mic";
import Navigate from "./Navigate";



export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />           
        <Navigate />
        <StatusBar style="auto" />
      </Provider>
    </NavigationContainer>
  );
}