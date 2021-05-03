import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
export default function Step6(props) {
  const { navigation } = props;
  onChangeText = (name, text) => {
    console.log(name, text);
  };
  const totalSteps = 6;
  const currentIndex = 5;

  getHeaderStepsIndicators = () => {
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
  getHeader = () => {
    let indicators = getHeaderStepsIndicators();

    let Header = (
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>
            Step {currentIndex + 1}/{totalSteps}
          </Text>
          <AntDesign
            name="menu-unfold"
            size={20}
            color="#03b5f7"
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
          source={require("../../../assets/Background.png")}
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
                <Text style={styles.whatYouGetItemText}>
                  Up to 5 minutes video
                </Text>
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
            <Text style={styles.midCircleText}>Cost: $99</Text>
          </View>
        </View>

        <View style={{ ...styles.formContainer, marginTop: 25 }}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step6Tab}>
                <Text style={styles.Step6TabText}>Checkout</Text>
                <Text style={styles.Step6TabTextMini}>Powered by Stripe</Text>
              </View>
            </View>
          </View>
          <View style={styles.whatYouGet}>
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
                      onChangeText={(text) => {
                        onChangeText("cardholderName", text);
                      }}
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
                      onChangeText={(text) => {
                        onChangeText("creditCardNumber", text);
                      }}
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
                      onChangeText={(text) => {
                        onChangeText("expiryDate", text);
                      }}
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
                      onChangeText={(text) => {
                        onChangeText("cvv", text);
                      }}
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
                      onChangeText={(text) => {
                        onChangeText("billingZipCode", text);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

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
            style={styles.Step6Btn}
            onPress={() => {
              console.log("Submitted");
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
    borderBottomWidth: StyleSheet.hairlineWidth,
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
