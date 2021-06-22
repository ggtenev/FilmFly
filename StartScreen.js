import "react-native-gesture-handler";
import firebase from "firebase";
import { StyleSheet, Text, View, ActivityIndicator,LogBox } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainSwitchNavigator from "./DrawerNavigator";
import { AuthStackNavigator } from "./MainStackNavigator";
import { useSelector } from "react-redux";
export default function StartScreen(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  // const isLoggedIn = useSelector(state=>state.isLoggedIn);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#152034",
        }}
      >
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }
  return (
    // <Login/>
    <NavigationContainer>
      {isLoggedIn ? <MainSwitchNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
