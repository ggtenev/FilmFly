import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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

export default function EditAc(props) {
  const [email, setEmail] = useState("");
  const [companyName, setcompanyName] = useState("");
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/Background.png")}
      />
      <StatusBar style="auto" />
      <View style={styles.helpBtnView}>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpText}>?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.tabLine}>
          <View style={styles.loginTab}>
            <Text style={styles.headingText}>Edit My Account</Text>
          </View>
        </View>
        <View style={styles.inputView}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <Entypo name="user" size={20} color="#03b5f7" />
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#898f9c"
              onChangeText={(name) => setName(name)}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <Entypo name="mail" size={20} color="#03b5f7" />
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#898f9c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <AntDesign name="phone" size={20} color="#03b5f7" />
            <TextInput
              style={styles.TextInput}
              placeholder="Phone Number"
              placeholderTextColor="#898f9c"
              secureTextEntry={true}
              onChangeText={(companyName) => setcompanyName(companyName)}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <AntDesign name="home" size={20} color="#03b5f7" />
            <TextInput
              style={styles.TextInput}
              placeholder="Company Name"
              placeholderTextColor="#898f9c"
              secureTextEntry={true}
              onChangeText={(companyName) => setcompanyName(companyName)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Save</Text>
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

  helpBtn: {
    width: 25,
    borderRadius: 12.5,
    height: 25,
    borderWidth: 1,
    borderColor: "#00bbff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#152034",
  },

  helpText: {
    color: "#00bbff",
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
    right: 30,
  },

  image: {
    marginBottom: 20,
  },
  tabLine: {
    padding: 10,
    width: "98%",
    marginBottom: 30,
  },
  inputView: {
    backgroundColor: "#313b54",
    borderRadius: 10,
    width: "90%",
    height: 45,
    alignSelf: "center",
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
    marginTop: "20%",
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
    marginTop: 50,
    marginBottom: -20,
    backgroundColor: "#00bbff",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#FFFFFF",
  },
  loginTab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20,
    borderColor: "#FFFFFF",
  },
  signUpTab: {
    marginLeft: 5,

    padding: 5,
    borderColor: "#FFFFFF",
  },

  signUpTAbText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  headingText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
