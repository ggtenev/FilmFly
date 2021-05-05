import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainSwitchNavigator from "./DrawerNavigator";
import { AuthStackNavigator } from "./MainStackNavigator";
import {useSelector} from 'react-redux';
export default function StartScreen(props) {
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  return (
    // <Login/>
    <NavigationContainer>
      {isLoggedIn ? <MainSwitchNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
