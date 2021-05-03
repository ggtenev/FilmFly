import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Slider from "@react-native-community/slider";

export default function Step3(props) {
  const [videoOrientation, setVideoOrientation] = useState("first");
  const [sliderValue, setSliderValue] = useState(0);
  const [position, setPosition] = useState(3);
  const { navigation } = props;
  onChangeText = (text) => {
    console.log(text);
  };
  onChangeSlider = (value) => {
    setPosition(value * 19);
    setSliderValue(value);
    console.log(value);
  };
  onRadioClicked = (value) => {
    setVideoOrientation(value);
    console.log(value);
  };
  const totalSteps = 6;
  const currentIndex = 2;

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
        <View>
          <Image
            style={styles.image}
            source={require("../../assets/Background.png")}
          />
        </View>
        <View>
          <Image
            style={styles.image}
            source={require("../../assets/step3.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step3Tab}>
                <Text style={styles.Step3TabText}>
                  How long do you want your video?
                </Text>
                <Text style={styles.Step3TabSubText}>5 miutes max</Text>
              </View>

              <Slider
                style={{
                  width: "100%",
                  alignSelf: "center",
                  height: 20,
                  marginTop: 20,
                  marginLeft: 5,
                  transform: [{ scaleX: 1 }, { scaleY: 1 }],
                }}
                minimumValue={0}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#00bbff"
                maximumTrackTintColor="gray"
                thumbTintColor="#00bbff"
                onValueChange={onChangeSlider}
              />
              <View
                style={{
                  width: 0,
                  height: 0,
                  marginLeft: position + "%",
                  marginBottom: 10,
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderBottomWidth: 10,
                  borderStyle: "solid",
                  backgroundColor: "transparent",
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "#00bbff",
                }}
              >
                <View
                  style={{
                    height: 25,
                    width: 50,
                    borderRadius: 5,
                    marginTop: 10,
                    backgroundColor: "#00bbff",
                    alignSelf: "center",
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                      fontSize: 10,
                    }}
                  >
                    {sliderValue} mins
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step3Tab}>
                <Text style={styles.Step3TabText}>
                  Choose Your Video Orientation
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={onRadioClicked}
                value={videoOrientation}
              >
                <RadioButton.Item
                  style={{ flexDirection: "row-reverse" }}
                  color="#00bbff"
                  labelStyle={{ color: "white" }}
                  label="Horizontal Orientation"
                  value="horizontal"
                />
                <RadioButton.Item
                  style={{ flexDirection: "row-reverse" }}
                  color="#00bbff"
                  labelStyle={{ color: "white" }}
                  label="Vertical Orientation"
                  value="vertical"
                />
              </RadioButton.Group>
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonGroup}>
          <TouchableOpacity
            style={styles.Step3BtnBack}
            onPress={() => {
              navigation.navigate("Step2");
            }}
          >
            <Text style={styles.Step3Text}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Step3Btn}
            onPress={() => {
              navigation.navigate("Step4");
            }}
          >
            <Text style={styles.Step3Text}>Continue</Text>
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
    // flex: 1,
    backgroundColor: "#152034",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // height:'100%'
  },
  bottomButtonGroup: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  formContainer: {
    backgroundColor: "#252d42",
    // backgroundColor: "red",
    width: "90%",
    // height: "50%",
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
  },
  tabLine: {
    padding: 10,
    width: "98%",
    marginBottom: 30,
  },
  Step3Btn: {
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
  Step3BtnBack: {
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
  Step3Text: {
    color: "#FFFFFF",
  },
  Step3Tab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    paddingBottom: 15,
    borderColor: "#FFFFFF",
    margin: 10,
  },
  signUpTab: {
    marginLeft: 5,
    padding: 5,
    borderColor: "#FFFFFF",
  },
  Step3TabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  Step3TabSubText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 5,
  },
});
