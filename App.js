import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Mic from "./src/components/Mic";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
        <Mic />
        <StatusBar style="auto" />
      </Provider>
    </NavigationContainer>
  );
}
