import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MainSwitchNavigator from "./DrawerNavigator";
export default function App() {
  return (
    // <Login/>
    <NavigationContainer>
      <MainSwitchNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
