import React,{useState} from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {useDispatch,useSelector} from 'react-redux';
import {SET_ABOUT_VIDEO,SET_VIDEO_TEXT} from '../../redux/InputFlow';

export default function Step4(props) {

  let videoText = useSelector(state=>state.videoText);
  let aboutVideo = useSelector(state=>state.aboutVideo);

  
  const [forbiddenMoveForward,setForbiddenMoveForward] = useState(false);

  const dispatch = useDispatch()

  const { navigation } = props;

  const onChangeVideoText = (text) => {
    dispatch({
      type:SET_VIDEO_TEXT,
      payload:text
    })
    if(text==""){
      setForbiddenMoveForward(true)
    }else if(text!=="" && aboutVideo!==""){
      setForbiddenMoveForward(false)
    }
  };
  const onChangeAboutVideo = (text) => {
    dispatch({
      type:SET_ABOUT_VIDEO,
      payload:text
    })
    if(text==""){
      setForbiddenMoveForward(true)
    }else if(text!=="" && videoText!==""){
      setForbiddenMoveForward(false)
    }
  };
  const totalSteps = 6;
  const currentIndex = 3;

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

        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <TouchableOpacity style={styles.Step4Tab}>
                <Text style={styles.Step4TabText}>Add text</Text>
                <Text
                  style={{ color: "white", fontSize: 13, alignSelf: "center" }}
                >
                  {" "}
                  (upto 5 lines max){" "}
                </Text>
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
              <Text
                style={{ fontFamily: "serif", fontSize: 21, color: "white" }}
              >
                T
              </Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Type here"
                placeholderTextColor="#898f9c"
                numberOfLines={5}
                multiline={true}
                value={videoText}
                onChangeText={onChangeVideoText}
              />
            </View>
          </View>
        </View>
        <View style={{ ...styles.formContainer, marginTop: 20 }}>
          <View style={styles.tabLine}>
            <View>
              <TouchableOpacity style={styles.Step4Tab}>
                <Text style={styles.Step4TabText}>
                  Have anything else to tell us about your video?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputViewLarge}>
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                marginTop: 10,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "serif",
                  fontSize: 21,
                  color: "white",
                  marginTop: 4,
                }}
              >
                T
              </Text>
              <TextInput
                style={styles.TextInputLarge}
                placeholder="Type here"
                placeholderTextColor="#898f9c"
                multiline={true}
                value={aboutVideo}
                onChangeText={onChangeAboutVideo}
                textAlign="left"
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonGroup}>
          <TouchableOpacity
            style={styles.Step4BtnBack}
            onPress={() => {
              navigation.navigate("Step3");
            }}
          >
            <Text style={styles.Step4Text}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Step4Btn}
            disabled={forbiddenMoveForward}
            onPress={() => {
              if(aboutVideo =="" || videoText ==""){
                setForbiddenMoveForward(true)
              }
              else{
                navigation.navigate("Step5");
              }
            }}
          >
            <Text style={styles.Step4Text}>Continue</Text>
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
    justifyContent: "space-between",
    marginBottom: 40,
  },
  formContainer: {
    backgroundColor: "#252d42",
    width: "90%",
    borderRadius: 20,
  },
  image: {
    marginBottom: 50,
    marginTop: 20,
  },
  tabLine: {
    padding: 10,
    width: "98%",
    marginBottom: 10,
  },
  inputView: {
    backgroundColor: "#313b54",
    borderRadius: 10,
    width: "85%",
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
    alignItems: "flex-start",
  },
  inputViewLarge: {
    backgroundColor: "#313b54",
    borderRadius: 10,
    width: "85%",
    height: 160,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
    alignItems: "flex-start",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    color: "white",
  },
  TextInputLarge: {
    height: 140,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    color: "white",
    textAlignVertical: "top",
  },
  Step4Btn: {
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
  Step4BtnBack: {
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
  Step4Text: {
    color: "#FFFFFF",
  },
  Step4Tab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    paddingBottom: 15,
    borderColor: "#FFFFFF",
    margin: 10,
    flexDirection: "row",
  },
  Step4TabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
