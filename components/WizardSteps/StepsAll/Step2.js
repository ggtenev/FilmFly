import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

export default function Step2(props) {
  const { navigation } = props;
  const videos = [
    {
      id: 1,
      thumbnail:
        "https://p1.pxfuel.com/preview/118/231/659/people-hands-achievement-group-royalty-free-thumbnail.jpg",
      duration: "02:00 min",
      title: "Video Title",
    },
    {
      id: 2,
      thumbnail:
        "https://p1.pxfuel.com/preview/118/231/659/people-hands-achievement-group-royalty-free-thumbnail.jpg",
      duration: "02:00 min",
      title: "Video Title",
    },
    {
      id: 3,
      thumbnail:
        "https://p1.pxfuel.com/preview/118/231/659/people-hands-achievement-group-royalty-free-thumbnail.jpg",
      duration: "02:00 min",
      title: "Video Title",
    },
    {
      id: 4,
      thumbnail:
        "https://p1.pxfuel.com/preview/118/231/659/people-hands-achievement-group-royalty-free-thumbnail.jpg",
      duration: "02:00 min",
      title: "Video Title",
    },
    {
      id: 5,
      thumbnail:
        "https://p1.pxfuel.com/preview/118/231/659/people-hands-achievement-group-royalty-free-thumbnail.jpg",
      duration: "02:00 min",
      title: "Video Title",
    },
  ];
  _onChangeText = (text) => {
    console.log(text);
  };
  const totalSteps = 6;
  const currentIndex = 1;

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
  const Item = ({ item, onPress }) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 30,
        backgroundColor: "#3A4254",
        borderRadius: 15,
      }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, borderRadius: 15 }}
          source={{ uri: item.thumbnail }}
        />
        <TouchableOpacity
          style={{ marginTop: 30, alignSelf: "center", position: "absolute" }}
        >
          <AntDesign color="white" name="playcircleo" size={35} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column", marginTop: 5 }}>
        <Text style={styles.Step2TabText}>{item.title}</Text>
        <Text style={{ color: "gray" }}>{item.duration}</Text>
      </View>
      <View style={{ flexDirection: "column", marginRight: 10, marginTop: 10 }}>
        <TouchableOpacity
          style={{
            height: 24,
            width: 24,
            backgroundColor: "#03b5f7",
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
          <Feather
            style={{ alignSelf: "center" }}
            name="edit"
            color="white"
            size={15}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 24,
            width: 24,
            borderColor: "#03b5f7",
            borderWidth: 1,
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
          <AntDesign
            style={{ alignSelf: "center" }}
            name="delete"
            color="#03b5f7"
            size={15}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => {}} />;
  };
  return (
    <View style={styles.root}>
      {getHeader()}
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/Background.png")}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step2Tab}>
                <Text style={styles.Step2TabText}>Videos {"&"} Photos</Text>
                <TouchableOpacity style={{ alignSelf: "center" }}>
                  <AntDesign name="pluscircleo" size={24} color="#03b5f7" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <SafeAreaView style={{ flex: 1, height: "98%", padding: 20 }}>
            <FlatList
              data={videos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </SafeAreaView>
        </View>
        <View style={styles.bottomButtonGroup}>
          <TouchableOpacity
            style={styles.Step1BtnBack}
            onPress={() => {
              navigation.navigate("Step1");
            }}
          >
            <Text style={styles.Step1Text}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Step1Btn}
            onPress={() => {
              navigation.navigate("Step3");
            }}
          >
            <Text style={styles.Step1Text}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "#152034",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  imageContainer: {
    height: "15%",
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
    width: "90%",
    borderRadius: 20,
    height: "50%",
  },
  image: {
    marginBottom: 50,
    marginTop: 20,
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
  Step2Tab: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
    paddingBottom: 15,
    borderColor: "#FFFFFF",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpTab: {
    marginLeft: 5,
    padding: 5,
    borderColor: "#FFFFFF",
  },
  Step2TabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
});
