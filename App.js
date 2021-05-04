import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainSwitchNavigator from "./DrawerNavigator";
import { AuthStackNavigator } from "./MainStackNavigator";
export default function App() {
  const isLoggedIn = true;
  return (
    // <Login/>
    <NavigationContainer>
      {isLoggedIn ? <MainSwitchNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
