import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { ProgressBar, Colors } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectProcess(props) {
  const { navigation } = props;
  let status = useSelector(state => state.status)

  const progress = 1;
  const widthProgressBar = (status / 3) * 100;
  const widthProgressBarEmpty = 100 - widthProgressBar;
  const isRecieved = true;
  const isInProgress = progress == 2 || progress == 3 ? true : false;
  const isSend = progress == 3 ? true : false;

  

  return (
    <View style={{ backgroundColor: "#152034", height: "100%" }}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.container}
      >
        <Image
          style={styles.image}
          source={require("../assets/Background.png")}
        />
        <Image
          style={styles.image2}
          source={require("../assets/projectprocess.png")}
        />
        <StatusBar style="auto" />
        <View style={styles.helpBtnView}>
          <TouchableOpacity style={styles.helpBtn}>
            <AntDesign
              name="menu-unfold"
              size={20}
              color="#03b5f7"
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          {status == 0 ? 'Not Received ' : status == 1 ? 'Project Recieved!' : status == 2 ? 'In Progress' : status == 3 ? 'Sent' : null }
          
        </Text>
        <View style={styles.container2}>
          <View
            style={{
              width: widthProgressBar + "%",
              height: 10,
              backgroundColor: "#03b5f7",
              borderRadius: 20,
            }}
          ></View>
          <View
            style={{
              width: widthProgressBarEmpty + "%",
              height: 10,
              borderRadius: 20,
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            padding: 0,
            marginBottom: 20,
          }}
        >
          <Text
            style={
              status == 1
                ? { ...styles.selectedText }
                : { ...styles.unSelectedText }
            }
          >
            Recieved
          </Text>
          <Text
            style={
              status == 2
                ? { ...styles.selectedText, textAlign: "center" }
                : { ...styles.unSelectedText, textAlign: "center" }
            }
          >
            In Progress
          </Text>
          <Text
            style={
              status == 3
                ? { ...styles.selectedText, textAlign: "right" }
                : { ...styles.unSelectedText, textAlign: "right" }
            }
          >
            Sent
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 22,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              You will receive an email if we need anything. You video will be
              sent 
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Thank You
            </Text>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate("HowItWorks");
            }}
          >
            <Text style={styles.loginText}>Back Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#152034",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    //  paddingBottom:100
  },
  selectedText: {
    fontWeight: "bold",
    color: "white",
    width: "33.33%",
  },
  unSelectedText: {
    color: "gray",
    width: "33.33%",
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
    marginBottom: 60,
  },
  container2: {
    backgroundColor: "#252d42",
    // backgroundColor: "red",
    width: "90%",
    // height: "50%",
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 20,
  },

  helpBtnView: {
    position: "absolute",
    top: 5,
    right: 15,
  },

  image: {
    marginTop: 80,
  },
  image2: {
    marginTop: 50,
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
