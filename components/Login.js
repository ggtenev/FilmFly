import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import firebase from '../constants/config'
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  CheckBox,
  Image,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import {useDispatch} from 'react-redux';
import {SET_LOGGED_IN} from '../redux/InputFlow';
export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [resetEmail, setresetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

  const dispatch = useDispatch();
  const confirmLogIn = ()=>{
    dispatch({
      type:SET_LOGGED_IN,
      payload:true
    })
  }

   //SIGN IN METHOD
   const signIn = async () => { 
    // dispatch(() => authActions.signIn())
    setIsLoading(true);
    if (!email || !password) {
      setError("Fill in all fields");
      setIsLoading(false);
      return;
    }

    // dispatch(authActions.signIn(email, password));
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async ({ user }) => {});
      })

      .catch((err) => {
        setError(err.message);
        // console.log(err);
        setIsLoading(false);
      });
  };

  const resetPass = () => {
    const user = firebase.auth().currentUser;
    var auth = firebase.auth();

    if (!resetEmail.includes("@")) {
      Alert.alert("Enter valid email address");
      return;
    }
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // setMessage("An email with the your password was sent your email");
        Alert.alert('An email has been sent to you.')
      })
      .catch(function (error) {
        setMessage(error.message);
        return;
      });
  
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View opacity={1} style={styles.modalView}>
            {/* <View style={styles.warning}>
              <AntDesign
                syule={{ alignSelf: "center" }}
                name="warning"
                color="white"
                size={40}
              />
            </View> */}
            <Text style={styles.modalText}>
              Please enter you email address below
            </Text>
            <View style={{...styles.inputView,marginTop:10}}>
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
              onChangeText={(email) => setresetEmail(email)}
            />
          </View>
        </View>

            <View style={styles.bottomButtonGroup}>
              <TouchableOpacity
                style={styles.Step1BtnBack}
                onPress={() => setModalOpen(false)}
              >
                <Text style={styles.Step1Text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Step1Btn} onPress={resetPass}>
                <Text style={styles.Step1Text}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Image
        style={styles.image}
        source={require("../assets/Background.png")}
      />
      <StatusBar style="auto" />
      {/* <View style={styles.helpBtnView}>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpText}>?</Text>
        </TouchableOpacity>
      </View> */}

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
            setModalOpen(true)
          }}
        >
          <Text style={styles.loginText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={{ color: "red", marginTop: 15,textAlign:'center' }}>{error}</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={signIn}
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
  Step1Btn: {
    width: "49.3%",
    borderRadius: 100,
    borderColor: "#252d42",
    borderWidth: 1,
    height: 50,
    alignSelf: "center",
    backgroundColor: "#00bbff",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  Step1BtnBack: {
    width: "49.3%",
    borderRadius: 100,
    borderColor: "#00bbff",
    borderWidth: 1,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  Step1Text: {
    color: "#FFFFFF",
  },
  modalText: {
    textAlign: "center",
    color: "white",
    fontSize:16,
    fontWeight:'bold',
    marginBottom:15
  },
  bottomButtonGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginTop: 20,
    height: "20%",
    justifyContent: "space-between",
    backgroundColor: "#252d42",
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
    color:'white'
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'#152034'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: '#FFFFFF50',
    // height:'100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#252d42",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
