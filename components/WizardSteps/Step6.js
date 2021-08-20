import React, { useState, useEffect } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import firebase from "firebase";
import functions from "firebase/functions";

import { WebView } from "react-native-webview";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_BILLING_ZIP_CODE,
  SET_CVV,
  SET_CARDHOLDER_NAME,
  SET_CREDIT_CARD_NUMBER,
  SET_EXPIRY_DATE,
  CLEAN_STORE,
} from "../../redux/InputFlow";

import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";

export default function Step6(props) {
  const [currentOrders, setCurentOrders] = useState([]);
  const [response, setResponse] = useState();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStauts, setPaymentStatus] = useState();
  const [web, setWeb] = useState(false);
  const [cardDetails, setCardDetails] = useState();
  //COMMENED
  const { confirmPayment, loading } = useConfirmPayment();
  const [stripeKey, setStripeKSey] = useState();

  //COMMENED
  // const { confirmPayment } = useStripe();

  // useEffect(() => {
  //   firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
  //       if(doc.data().orders){
  //         console.log('ORDER',doc.data().orders)
  //         setCurentOrders(doc.data().orders)
  //       }
  //   })
  //   return
  // }, [])

  let cardholderName = useSelector((state) => state.cardholderName);
  let creditCardNumber = useSelector((state) => state.creditCardNumber);
  let expiryDate = useSelector((state) => state.expiryDate);
  let cvv = useSelector((state) => state.cvv);
  let billingZipCode = useSelector((state) => state.billingZipCode);
  let videos = useSelector((state) => state.videos);
  let videoTitle = useSelector((state) => state.projectTitle);
  let about = useSelector((state) => state.aboutVideo);
  let length = useSelector((state) => state.videoLength);
  let orientation = useSelector((state) => state.videoOrientation);
  let videoText = useSelector((state) => state.videoText);

  let manual = useSelector((state) => state.manual);
  let previousOrders = useSelector((state) => state.previousOrders);
  let [email, setEmail] = useState("");

  let userEmail = firebase.auth().currentUser.email;

  const dispatch = useDispatch();
  let userID = firebase.auth().currentUser.uid;
  let user = firebase.auth().currentUser;

  const { navigation } = props;
  const onChangeCardHolderName = (text) => {
    dispatch({ type: SET_CARDHOLDER_NAME, payload: text });
  };
  const onChangeCreditCardNumber = (text) => {
    dispatch({ type: SET_CREDIT_CARD_NUMBER, payload: text });
  };
  const onChangeExpiryDate = (text) => {
    dispatch({ type: SET_EXPIRY_DATE, payload: text });
  };
  const onChangeCVV = (text) => {
    dispatch({ type: SET_CVV, payload: text });
  };
  const onChangeBillingZipCode = (text) => {
    dispatch({ type: SET_BILLING_ZIP_CODE, payload: text });
  };
  const checkIfConfiguredAllInputs = () => {
    if (
      cardholderName == "" ||
      cvv == "" ||
      creditCardNumber == "" ||
      expiryDate == "" ||
      billingZipCode == ""
    )
      return false;
    return true;
  };

  const API_URL = "http://localhost:3000/createIntent";

  const fetchClientIntentClientSecret = async () => {
    const response = await fetch(
      "https://us-central1-film-fly-app.cloudfunctions.net/intentFunction/createIntent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "usd",
        }),
      }
    );

    const { clientSecret, error } = await response.json();
    console.log(clientSecret, error);
    return { clientSecret, error };
  };

  useEffect(() => {
    fetch(
      "https://us-central1-film-fly-app.cloudfunctions.net/intentFunction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "usd",
        }),
      }
    ).then((res) => {
      res.json().then((res) => {
        console.log("INTENT", res);
        setStripeKSey(res.clientSecret);
      });
    });

    return;
  }, []);

  const uploadVideos = async () => {
    const urls = [];

    if (!cardDetails?.complete) {
      Alert.alert("Please enter your card details and email!");
      return;
    }

    const billingDetails = {
      email: userEmail,
    };

    try {
      const { clientSecret, error } = await fetchClientIntentClientSecret();
      if (error) {
        Alert.alert("Unable to process payment");
        return;
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: {
            email: userEmail,
          },
        });
        if (error) {
          Alert.alert(`Payment Confirmation Error: ${error.message}`);
          return;
        } else if (paymentIntent) {
          Alert.alert("Payment successful");
          console.log(paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }

    // const response = await confirmPayment(stripeKey, {
    //   type: "Card",
    //   billingDetails: {
    //     email: userEmail,
    //   },
    // });

    // console.log("RESPO", response);

    videos.forEach(async (v) => {
      const response = await fetch(v.videoURL);
      const blob = await response.blob();

      var ref = firebase
        .storage()
        .ref()
        .child(
          "users/" +
            user.uid +
            "/" +
            "videos/" +
            v.videoURL.toString().slice(-12)
        );

      return ref.put(blob).then(() => {
        ref.getDownloadURL().then((url) => {
          urls.push(url);
          firebase
            .firestore()
            .collection("users")
            .doc(`${userEmail}${user.uid}`)
            .set(
              {
                orders: [
                  ...previousOrders,
                  {
                    title: videoTitle,
                    orientation,
                    about,
                    url: urls,
                    length,
                    videoText,
                  },
                ],
                status: 1,
              },
              { merge: true }
            );
        });
      });
    });

    firebase
      .firestore()
      .collection("orders")
      .add({
        email: firebase.auth().currentUser.email,
      })
      .then(() => {
        dispatch({ type: CLEAN_STORE, payload: "" });
        props.navigation.navigate("ProjectProcess");
      });

    // if (response.error) {
    //   Alert.alert("Payment unsuccessfull");
    //   console.log(response.error);
    //   return;
    // } else {
    //   Alert.alert("Payment was successful");
    // }
  };
  const totalSteps = 6;
  const currentIndex = 5;

  const getHeaderStepsIndicators = () => {
    let counter = totalSteps - (currentIndex + 1);
    let brightcounter = totalSteps - counter;
    let indicators = [];
    let indicatorCount = 0;

    for (let i = 0; i < brightcounter; i++) {
      let ind = (
        <View key={indicatorCount} style={styles.brightIndicator}></View>
      );
      indicators.push(ind);
      indicatorCount++;
    }
    for (let i = 0; i < counter; i++) {
      let ind = <View key={indicatorCount} style={styles.dullIndicator}></View>;
      indicators.push(ind);
      indicatorCount++;
    }
    return indicators;
  };
  const getHeader = () => {
    let indicators = getHeaderStepsIndicators();

    let Header = (
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>
            Step {currentIndex + 1}/{totalSteps}
          </Text>
          <AntDesign
            name='menu-unfold'
            size={20}
            color='#03b5f7'
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </View>
        <View style={styles.indicatorGroup}>
          {indicators.map((ind, index) => {
            return ind;
          })}
        </View>
      </View>
    );

    return Header;
  };
  return (
    <View style={styles.root}>
      {getHeader()}
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.container}
      >
        <Image
          style={styles.image}
          source={require("../../assets/Background.png")}
        />

        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step6Tab}>
                <Text style={styles.Step6TabText}>What You'll Get</Text>
              </View>
            </View>
          </View>
          <View style={styles.whatYouGet}>
            <View style={styles.whatYouGetRow}>
              <View style={styles.whatYouGetItem}>
                <View style={styles.circle}></View>
                {manual ? (
                  <Text style={styles.whatYouGetItemText}>
                    Unlimited length of the video
                  </Text>
                ) : (
                  <Text style={styles.whatYouGetItemText}>
                    Up to 5 minutes video
                  </Text>
                )}
              </View>
              <View style={styles.whatYouGetItem}>
                <View style={styles.circle}></View>
                <Text style={styles.whatYouGetItemText}>2 Revision Cycles</Text>
              </View>
            </View>
            <View style={styles.whatYouGetRow}>
              <View style={styles.whatYouGetItem}>
                <View style={styles.circle}></View>
                <Text style={styles.whatYouGetItemText}>5 Text Animations</Text>
              </View>
            </View>
          </View>
          <View style={styles.midCircle}>
            <Text style={styles.midCircleText}>
              {!manual ? <Text>Cost: $99</Text> : <Text>Cost: $0</Text>}
            </Text>
          </View>
        </View>

        {manual ? null : (
          <View style={{ ...styles.formContainer, marginTop: 25 }}>
            <View style={styles.tabLine}>
              <View>
                <View style={styles.Step6Tab}>
                  <Text style={styles.Step6TabText}>Checkout</Text>
                  <Text style={styles.Step6TabTextMini}>Powered by Stripe</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputView}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                <AntDesign name='user' size={20} color='#03b5f7' />
                <TextInput
                  style={styles.TextInput}
                  placeholder='Cardholder Name'
                  placeholderTextColor='#898f9c'
                  value={cardholderName}
                  onChangeText={(t) => setEmail(t)}
                  value={email}
                />
              </View>
            </View>
            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "white",
                textColor: "black",
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                setCardDetails(cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log("focusField", focusedField);
              }}
            />

            {/* <View style={styles.whatYouGet}>
            <View style={styles.whatYouGetRow}>
              <View style={styles.whatYouGetItem}>
                <View style={styles.inputView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 15,
                    }}
                  >
                    <AntDesign name="user" size={20} color="#03b5f7" />
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Cardholder Name"
                      placeholderTextColor="#898f9c"
                      value={cardholderName}
                      onChangeText={onChangeCardHolderName}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.whatYouGetRow}>
              <View style={styles.whatYouGetItem}>
                <View style={styles.inputView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 15,
                    }}
                  >
                    <Entypo name="credit-card" size={20} color="#03b5f7" />
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Credit Card Number"
                      placeholderTextColor="#898f9c"
                      secureTextEntry={true}
                      keyboardType="phone-pad"
                      value={creditCardNumber}
                      onChangeText={onChangeCreditCardNumber}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.whatYouGetRow}>
              <View style={styles.whatYouGetItem2}>
                <View style={styles.inputView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 15,
                    }}
                  >
                    <AntDesign name="calendar" size={20} color="#03b5f7" />
                    <TextInput
                      style={styles.TextInput}
                      placeholder="MM/YYYY"
                      placeholderTextColor="#898f9c"
                      value={expiryDate}
                      onChangeText={onChangeExpiryDate}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.whatYouGetItem2}>
                <View style={styles.inputView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 15,
                    }}
                  >
                    <Entypo name="credit-card" size={20} color="#03b5f7" />
                    <TextInput
                      style={styles.TextInput}
                      placeholder="XXX"
                      placeholderTextColor="#898f9c"
                      secureTextEntry={true}
                      value={cvv}
                      onChangeText={onChangeCVV}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.whatYouGetRow}>
              <View style={styles.whatYouGetItem}>
                <View style={styles.inputView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 15,
                    }}
                  >
                    <Entypo name="box" size={20} color="#03b5f7" />
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Enter Billing Zip Code"
                      placeholderTextColor="#898f9c"
                      value={billingZipCode}
                      onChangeText={onChangeBillingZipCode}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View> */}
          </View>
        )}

        <View style={styles.bottomButtonGroup}>
          <TouchableOpacity
            style={styles.Step6BtnBack}
            onPress={() => {
              navigation.navigate("Step5");
            }}
          >
            <Text style={styles.Step6Text}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // disabled={loading}
            style={styles.Step6Btn}
            onPress={() => {
              uploadVideos();
              // if(checkIfConfiguredAllInputs())
              // Alert.alert(JSON.stringify(completeState))
              // else Alert.alert("Please Enter All Values")
            }}
          >
            <Text style={styles.Step6Text}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#152034",
  },
  header: {
    width: "100%",
    backgroundColor: "#252d42",
    height: 130,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerTextWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
  indicatorGroup: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
  dullIndicator: {
    width: "15%",
    backgroundColor: "gray",
    color: "white",
    borderColor: "gray",
    height: 8,
    marginLeft: 5,
  },
  brightIndicator: {
    width: "15%",
    backgroundColor: "#00bbff",
    color: "white",
    borderColor: "gray",
    height: 8,
    marginLeft: 5,
  },
  container: {
    backgroundColor: "#152034",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  bottomButtonGroup: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  bottomButtonGroupSingle: {
    width: "90%",
    marginTop: -20,
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
    width: "90%",
    borderRadius: 20,
  },
  image: {
    marginBottom: 30,
    marginTop: 30,
  },
  tabLine: {
    padding: 10,
    width: "98%",
  },
  inputView: {
    backgroundColor: "#313b54",
    borderRadius: 17,
    height: 50,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "flex-start",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    color: "white",
  },
  Step6Btn: {
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
  Step6BtnBack: {
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
  Step6Text: {
    color: "#FFFFFF",
  },
  Step6Tab: {
    borderBottomWidth: 1,
    padding: 5,
    paddingBottom: 15,
    borderColor: "#FFFFFF",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Step6TabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  Step6TabTextMini: {
    color: "#FFFFFF",
    fontSize: 13,
    alignSelf: "center",
  },
  whatYouGet: {
    flexDirection: "column",
    padding: 10,
    width: "92%",
    marginBottom: 10,
    alignSelf: "center",
  },
  whatYouGetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  whatYouGetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  whatYouGetItem2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "48%",
    marginRight: 10,
  },
  whatYouGetItemText: {
    color: "white",
    fontSize: 12,
    marginLeft: 10,
    alignSelf: "center",
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: "#00bbff",
    alignSelf: "center",
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
});
