import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { FECTH_USER_STATUS } from "../redux/InputFlow";

export default function HowItWorks(props) {
  const { navigation } = props;
  const list = [
    { text: "Upload video clips, photos,  and logos" },
    { text: "Our Team will edit your video within 48 hours" },
    { text: "Review your video and request revisions" },
    { text: "Download your completed video" },
  ];

  const manual = useSelector((state) => state.manual);

  const dispatch = useDispatch();

  const userId = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(`${userEmail}${userId}`)
  //     .onSnapshot((doc) => {
  //       console.log(doc.data());
  //       dispatch({ type: FECTH_USER_STATUS, userData: doc.data() });
  //     });
  //   return;
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/Background.png")}
      />
      <StatusBar style='auto' />
      <View style={styles.helpBtnView}>
        <TouchableOpacity style={styles.helpBtn}>
          <AntDesign
            name='menu-unfold'
            size={20}
            color='#03b5f7'
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.tabLine}>
          <View>
            <View style={styles.Step1Tab}>
              <Text style={styles.Step1Text}>How it Works</Text>
            </View>
          </View>
        </View>
        <View style={styles.innerView}>
          {list.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", marginBottom: 10 }}
              >
                <View style={styles.indexView}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <Text style={{ color: "white", marginLeft: 10 }}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.midCircle}>
          {/* <Text style={styles.midCircleText}>
            {manual ? "Cost: $0" : "Cost: $99"}
          </Text> */}
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            navigation.navigate("Step1");
          }}
        >
          <Text style={styles.loginText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#152034",
    alignItems: "center",
    justifyContent: "center",
  },
  midCircle: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    //   backgroundColor:'tranparent'
  },
  midCircleText: {
    color: "white",
    alignSelf: "center",
    margin: "auto",
  },
  helpBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#152034",
  },

  helpText: {
    color: "#00bbff",
  },
  innerView: {
    padding: 15,
    width: "98%",
    marginBottom: 10,
  },
  indexView: {
    width: 18,
    borderRadius: 12.5,
    height: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00bbff",
  },
  indexText: {
    color: "#00bbff",
  },
  Step1Text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  Step1Tab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    paddingBottom: 15,
    borderColor: "#FFFFFF",
    margin: 10,
    flexDirection: "row",
  },
  formContainer: {
    backgroundColor: "#252d42",
    // backgroundColor: "red",
    width: "90%",
    // height: "50%",
    borderRadius: 20,
  },

  helpBtnView: {
    position: "absolute",
    top: 5,
    right: 15,
  },

  image: {
    marginBottom: 80,
  },
  tabLine: {
    padding: 10,
    width: "98%",
  },
  inputView: {
    backgroundColor: "#313b54",
    borderRadius: 10,
    width: "85%",
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    alignItems: "flex-start",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    width: "80%",
    // marginTop:'20%',
    marginBottom: 10,
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "flex-end",
    alignSelf: "center",
  },

  loginBtn: {
    width: "70%",
    borderRadius: 25,
    borderColor: "#252d42",
    borderWidth: 5,
    height: 50,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: -20,
    backgroundColor: "#00bbff",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#FFFFFF",
  },
  loginTab: {},
  signUpTab: {
    marginLeft: 5,

    padding: 5,
    borderColor: "#FFFFFF",
  },

  signUpTAbText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  loginTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
