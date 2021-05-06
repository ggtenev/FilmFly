import "react-native-gesture-handler";

import React, { useState,useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MainSwitchNavigator from "./DrawerNavigator";
export default function App() {
  const [loading,setLoading] = useState(false)
  const [loggedIn,setLoggedIn] = useState(false)
  return (
    // <Login/>
    <NavigationContainer>
      <MainSwitchNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
