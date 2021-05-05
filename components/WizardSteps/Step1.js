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
  Alert,
} from "react-native";
import {useDispatch,useSelector} from 'react-redux';
import {SET_PROJECT_TITLE} from '../../redux/InputFlow';

export default function Step1(props) {

  let projectTitle = useSelector(state=>state.projectTitle)
  const [forbiddenMoveForward,setForbiddenMoveForward] = useState(false);

  const dispatch = useDispatch()

  const { navigation } = props;

  const _onChangeText = (text) => {
    if(text==""){
      setForbiddenMoveForward(true)
    }
    else{
      setForbiddenMoveForward(false)
    }
    dispatch({
      type: SET_PROJECT_TITLE,
      payload: text
    })
  };
  const totalSteps = 6;
  const currentIndex = 0;

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
          source={require("../../assets/Vector.png")}
        />

        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step1Tab}>
                <Text style={styles.Step1TabText}>Name Your Project</Text>
              </View>
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
              <AntDesign name="rocket1" size={20} color="#03b5f7" />
              <TextInput
                style={styles.TextInput}
                placeholder="Project Title"
                placeholderTextColor="#898f9c"
                onChangeText={_onChangeText}
                value={projectTitle}
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomButtonGroupSingle}>
          <TouchableOpacity
            style={styles.Step1BtnAlone}
            disabled={forbiddenMoveForward}
            onPress={() => {
              if(forbiddenMoveForward!=="")
                 navigation.navigate("Step2");
              else setForbiddenMoveForward(true)
            }}
          >
            <Text style={styles.Step1Text}>Continue</Text>
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
  buttonWrapper: {
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#152034",
  },
  stepsCount: {
    alignSelf: "center",
    margin: 50,
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
    justifyContent: "space-between",
    marginBottom: 80,
  },
  bottomButtonGroupSingle: {
    width: "90%",
    marginTop: -20,
    marginBottom: 80,
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

  formContainer: {
    backgroundColor: "#252d42",
    // backgroundColor: "red",
    width: "90%",
    // height: "50%",
    borderRadius: 20,
  },
  image: {
    marginBottom: 10,
  },
  tabLine: {
    padding: 10,
    width: "98%",
    marginBottom: 30,
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

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
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
  Step1BtnAlone: {
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
  Step1Text: {
    color: "#FFFFFF",
  },
  Step1Tab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    borderColor: "#FFFFFF",
  },
  signUpTab: {
    marginLeft: 5,

    padding: 5,
    borderColor: "#FFFFFF",
  },
  Step1TabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
