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
import { Checkbox } from "react-native-paper";
import {useDispatch,useSelector} from 'react-redux';
import {SET_AGREED_TO_TERMS} from '../../redux/InputFlow';

export default function Step5(props) {

  let agreedToTerms = useSelector(state=>state.agreedToTerms)

  const dispatch = useDispatch()

  const { navigation } = props;

  const onChangeCheckBox = () => {
    dispatch({
      type:SET_AGREED_TO_TERMS,
      payload:!agreedToTerms
    })
  };
  const totalSteps = 6;
  const currentIndex = 4;

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
          source={require("../../assets/Background.png")}
        />
        <Image
          style={styles.image}
          source={require("../../assets/step5.png")}
        />

        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step5Tab}>
                <Text style={styles.Step5TabText}>Terms {"&"} Condition</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 8,
              width: "98%",
              marginBottom: 30,
            }}
          >
            <View style={{ marginTop: -5 }}>
              <Checkbox
                color="#00bbff"
                uncheckedColor="gray"
                status={agreedToTerms ? "checked" : "unchecked"}
                onPress={onChangeCheckBox}
              />
            </View>

            <View style={{ flexDirection: "column", width: "80%" }}>
              <Text style={{ color: "white", fontSize: 15 }}>
                I have duly sworn that I have read, understood and fully
                accepted the{" "}
                <Text style={{ color: "#00bbff" }}> terms and conditions</Text>{" "}
                and
                <Text style={{ color: "#00bbff" }}> private policy </Text>of
                Filmy Fly{" "}
              </Text>
              <Text style={{ color: "gray", fontSize: 15, marginTop: 10 }}>
                All stock footage, audio, and other content added by Film Fly is
                100% licensed for your use.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonGroup}>
          <TouchableOpacity
            style={styles.Step5BtnBack}
            onPress={() => {
              navigation.navigate("Step4");
            }}
          >
            <Text style={styles.Step5Text}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Step5Btn}
            disabled={!agreedToTerms}
            onPress={() => {
              if(agreedToTerms)
              navigation.navigate("Step6");
            }}
          >
            <Text style={styles.Step5Text}>Continue</Text>
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
    marginTop: 80,
    marginBottom: 30,
    justifyContent: "space-between",
  },
  formContainer: {
    backgroundColor: "#252d42",
    width: "90%",
    borderRadius: 20,
    marginBottom: 50,
  },
  image: {
    marginTop: 20,
    marginBottom: 30,
  },
  tabLine: {
    padding: 10,
    width: "98%",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
  },
  Step5Btn: {
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
  Step5BtnBack: {
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
  Step5Text: {
    color: "#FFFFFF",
  },
  Step5Tab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    paddingBottom: 15,
    borderColor: "#FFFFFF",
    margin: 10,
  },
  Step5TabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
