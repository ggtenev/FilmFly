import React from "react";
import firebase from 'firebase'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";
import { AntDesign, Entypo, Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#152034" }}>
      {/*Top Large Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/Background.png")}
        />
        <Text
          style={styles.close}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        >
          X
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          style={styles.customItem}
          labelStyle={styles.customItemText}
          label="Account"
          onPress={() => props.navigation.navigate('EditAccount')}
          icon={({ focused, color, size }) => (
            <View style={styles.accountIcon}>
              <AntDesign name="user" size={20} color="#03b5f7" />
            </View>
          )}
        />
        <DrawerItem
          style={styles.customItem}
          labelStyle={styles.customItemText}
          label="Help"
          onPress={() => props.navigation.navigate('ProjectProcess')}
          icon={({ focused, color, size }) => (
            <View style={styles.accountIcon}>
              <Text style={styles.helpText}>?</Text>
            </View>
          )}
        />
        <DrawerItem
          style={styles.customItem}
          labelStyle={styles.customItemText}
          label="Video"
          onPress={() => props.navigation.navigate('HowItWorks')}
          icon={({ focused, color, size }) => (
            <AntDesign name="videocamera" size={20} color="#03b5f7" />
          )}
        />
        <DrawerItem
          style={styles.customItem}
          labelStyle={styles.customItemText}
          label="Sign Out"
          onPress={() => firebase.auth().signOut() }
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons name="logout" size={24} color="#03b5f7" />
          )}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  helpText: {
    color: "#00bbff",
  },
  imageContainer: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginLeft: 10,
    marginBottom: 10,
  },
  close: {
    color: "white",
    fontSize: 27,
    alignSelf: "center",
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

export default CustomSidebarMenu;
