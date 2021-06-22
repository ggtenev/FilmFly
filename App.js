// import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MainSwitchNavigator from "./DrawerNavigator";
import store from "./redux/store";
import { Provider as StoreProvider } from "react-redux";
import StartScreen from "./StartScreen";
import { StripeProvider } from "@stripe/stripe-react-native";

import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    // <Login/>
    <StripeProvider merchantIdentifier='merchant.identifier' publishableKey="pk_test_NrYGFq8O69eYxgIkI67lzp1m00G2cfXPCS">
      <StoreProvider store={store}>
        <StartScreen />
      </StoreProvider>
    </StripeProvider>
  );
}
