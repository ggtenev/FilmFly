import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import firebase from "../constants/config";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export default function SignUp(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { navigation } = props;

  //SIGN UP METHOD
  const signUpMethod = async () => {
    setIsLoading(true);
    if (!username || !phone || !email || !password || !password2) {
      setError("Fill in all fields");
      setIsLoading(false);
      return;
    } else if (password !== password2) {
      setError("Password doesn't match");
      setIsLoading(false);
      return;
    }
    //  else if (!thought) {
    //       setError("You have to accept the Terms and Conditions");
    //       setIsLoading(false);
    //       return;
    //     }
    //DISPATCHING SIGNUP ACTION TO FIREBASE
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (usercredentials) => {
        // console.log(usercredentials);
        // await AsyncStorage.setItem("userToken", usercredentials.user.uid);
        await usercredentials.user.updateProfile({
          displayName: `${username}`,
        });

        await usercredentials.user
          .sendEmailVerification()

          .then(function () {
            firebase
              .firestore()
              .collection("users")
              .doc(`${email}${usercredentials.user.uid}`)
              .set({
                name: `${username}`,
                email: email,
                phone: phone,
                company,
                manual: false,
                status: 0,
                orders: [],
              })
              .then(() => {
                setIsLoading(false);
              });
          })
          .catch(function (error) {
            // An error happened.
          });

        // dispatch(authActions.signUp(email, password, firstName, lastName));
        setEmail("");
        setPassword("");
        // navigation.navigate("DrawerNav");
        //CHECK IF THE SIGNUP WAS SUCCESSFUL AND FETCHING ERRORS
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        setIsLoading(false);
      });
  };

  //LOADING SPINNER WHILE SENDING REQUEST TO THE SERVER
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#152034", height: "100%" }}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.container}
      >
        {/* <View style={styles.helpBtnView}>
          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpText}>?</Text>
          </TouchableOpacity>
        </View> */}
        <Image
          style={styles.image}
          source={require("../assets/Background.png")}
        />

        <View style={styles.formContainer}>
          <View style={styles.Tab}>
            <TouchableOpacity
              style={styles.loginTab}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginTabText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpTab}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.signUpTAbText}>SIGN UP</Text>
            </TouchableOpacity>
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
              <FontAwesome name='user-o' size={20} color='#03b5f7' />
              <TextInput
                style={styles.TextInput}
                placeholder='Name'
                placeholderTextColor='#898f9c'
                onChangeText={(username) => setUsername(username)}
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
              <Feather name='phone-call' size={20} color='#03b5f7' />
              <TextInput
                style={styles.TextInput}
                placeholder='Phone Number'
                placeholderTextColor='#898f9c'
                // secureTextEntry={true}
                onChangeText={(phone) => setPhone(phone)}
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
              <AntDesign name='mail' size={20} color='#03b5f7' />
              <TextInput
                style={styles.TextInput}
                placeholder='Email'
                placeholderTextColor='#898f9c'
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
              <SimpleLineIcons name='organization' size={20} color='#03b5f7' />
              <TextInput
                style={styles.TextInput}
                placeholder='Company Name (optional)'
                placeholderTextColor='#898f9c'
                // secureTextEntry={true}
                onChangeText={(company) => setCompany(company)}
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
              <AntDesign name='lock1' size={20} color='#03b5f7' />
              <TextInput
                style={styles.TextInput}
                placeholder='Password'
                placeholderTextColor='#898f9c'
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
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
              <AntDesign name='lock1' size={20} color='#03b5f7' />
              <TextInput
                style={styles.TextInput}
                placeholder='Re enter Password'
                placeholderTextColor='#898f9c'
                secureTextEntry={true}
                onChangeText={(password2) => setPassword2(password2)}
              />
            </View>
          </View>
          <Text style={{ color: "red", marginTop: 15, textAlign: "center" }}>
            {error}
          </Text>
          {/* Terms & Privacy policy */}
          <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
            <Text style={styles.terms}>
              By signing up you agree to our{" "}
              <Text
                onPress={() => Linking.openURL("https://gofilmfly.com/terms")}
                style={styles.underline}
              >
                Terms
              </Text>{" "}
              and{" "}
              <Text
                onPress={() => Linking.openURL("https://gofilmfly.com/privacy")}
                style={styles.underline}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>

          {/* </View> */}
          <TouchableOpacity style={styles.signUpBtn} onPress={signUpMethod}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#152034",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  underline: {
    textDecorationLine: "underline",
    color: "#03b5f7",
  },
  helpText: {
    color: "#00bbff",
  },

  formContainer: {
    backgroundColor: "#252d42",
    width: "90%",
    // height: "70%",
    borderRadius: 20,
    marginTop: 80,
    marginBottom: 80,
  },

  helpBtnView: {
    position: "absolute",
    top: 5,
    right: 30,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#152034",
  },
  image: {
    marginTop: 90,
  },
  terms: {
    textAlign: "center",
    color: "white",
  },
  inputView: {
    backgroundColor: "#313b54",
    borderRadius: 15,
    width: "90%",
    height: 45,
    marginBottom: 20,
    left: "5%",
    top: "5%",

    alignItems: "flex-start",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  signUpBtn: {
    width: "70%",
    borderRadius: 25,
    borderColor: "#252d42",
    borderWidth: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: -20,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#00bbff",
  },

  Tab: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  signUpText: {
    color: "#FFFFFF",
  },
  loginTab: {
    padding: 5,
    borderColor: "#FFFFFF",
  },
  signUpTab: {
    marginLeft: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
