import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator,AuthStackNavigator } from "./MainStackNavigator";
import CustomSidebarMenu from "./components/CustomSidebarMenu";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      edgeWidth={0}
      drawerContentOptions={{
        itemStyle: { marginVertical: 5, padding: 8 },
        labelStyle: { fontSize: 15, color: "#fff" },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <View>
              <AntDesign name="home" size={20} color="#03b5f7" />
            </View>
          ),
        }}
        name="Home"
        component={MainStackNavigator}
      />
    </Drawer.Navigator>
  );
};

// const MainSwitchNavigator = ({ navigation }) => {
//   return (
//     <Stack.Navigator initialRouteName="AuthStack">
//       <Stack.Screen
//         options={{ headerShown: false, gesturesEnabled: false }}
//         name="AuthStack"
//         component={AuthStackNavigator}
//       />
//       <Stack.Screen
//         options={{ headerShown: false, gesturesEnabled: false }}
//         name="HomeStack"
//         component={DrawerNavigator}
//       />
//     </Stack.Navigator>
//   );
// };
const styles = StyleSheet.create({
  helpText: {
    color: "#00bbff",
  },
  accountIcon: {
    width: 25,
    borderRadius: 20,
    height: 25,
    borderWidth: 1,
    borderColor: "#00bbff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#152034",
    alignSelf: "center",
  },
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 7,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  customItemText: {
    fontSize: 15,
    color: "#ffff",
  },
});
export default DrawerNavigator;
