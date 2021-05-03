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

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          <View>
            <TouchableOpacity style={styles.loginTab}>
              <Text style={styles.loginTabText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "80%",
              borderBottomWidth: 1,
              borderColor: "#152034",
            }}
          >
            <TouchableOpacity
              style={styles.signUpTab}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.signUpTAbText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputView}>
          <View
            style={{
              flex: 3,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <AntDesign name="mail" size={20} color="#03b5f7" />
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
              flex: 3,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <AntDesign name="lock1" size={20} color="#03b5f7" />
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#898f9c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.forgot_button}
          onPress={() => {
            
          }}
        >
          <Text style={styles.loginText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            navigation.navigate('HomeStack');
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
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
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 30,
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
  loginTab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    borderColor: "#FFFFFF",
    borderBottomWidth: 1,
  },
  signUpTab: {
    marginLeft: 5,
    padding: 5,
    borderColor: "#FFFFFF",
    width: "100%",
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
