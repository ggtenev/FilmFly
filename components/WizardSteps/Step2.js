import React, { useEffect, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import {useDispatch,useSelector} from 'react-redux';
import {ADD_TO_VIDEOS,REMOVE_FROM_VIDEOS,RESET_PROJECT_DETAILS} from '../../redux/InputFlow';

export default function Step2(props) {

  let videos = useSelector(state=>state.videos)
  const [forbiddenMoveForward,setForbiddenMoveForward] = useState(false);
  const dispatch = useDispatch()
  const [modalOpen,setModalOpen] = useState(false);
  const { navigation } = props;

  const [counter, setCounter] = useState(0);

  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          setPermissionGranted(false);
        } else {
          setPermissionGranted(true);
        }
      }
    })();
  }, []);
 const _modalConfirm  = ()=>{ 
    setModalOpen(false);
    dispatch({type:RESET_PROJECT_DETAILS,payload:true})
    navigation.navigate('Step1');
  }

 const  _modalClose = ()=>{
  setModalOpen(false)
}
  const generateThumbnail = async (videoURI) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoURI, {
        time: 15000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds + " min";
  };

  const pickImage = async () => {
    if (!permissionGranted) {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        let duration = millisToMinutesAndSeconds(result.duration);
        let videoUri = result.uri;
        let thumbnail = await generateThumbnail(videoUri);
        let title = videoUri.replace(/^.*[\\\/]/, "");
        let videoData = {
          id: counter,
          thumbnail: thumbnail,
          title: title,
          duration: duration,
          videoURL: videoUri,
        };
        setCounter(counter + 1);
        dispatch({
          type: ADD_TO_VIDEOS,
          payload:videoData
        })
        setForbiddenMoveForward(false);
      }
    }
  };

  const totalSteps = 6;
  const currentIndex = 1;

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
  const deleteFromArray = (id) => {
    dispatch({
      type: REMOVE_FROM_VIDEOS,
      payload: {id}
    })
    if(videos.length==0){
      setForbiddenMoveForward(true);
    }
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
  const Item = ({ item, onPress }) => {
    let titleTrimmed = item.title;
    if (item.title.length > 8)
      titleTrimmed = item.title.substring(0, 8) + "...";
    return (
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
        <View style={{ flexDirection: "column", marginTop: 5, marginLeft: 5 }}>
          <Text style={styles.Step2TabText}>{titleTrimmed}</Text>
          <Text style={{ color: "gray" }}>{item.duration}</Text>
        </View>
        <View
          style={{ flexDirection: "column", marginRight: 10, marginTop: 10 }}
        >
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
            onPress={() => {
              deleteFromArray(item.id);
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
  };
  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => {}} />;
  };
  return (
    <View style={styles.root}>
      {getHeader()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View  style={styles.centeredView}>
          <View opacity={1}style={styles.modalView}>
            <View style={styles.warning}><AntDesign syule={{alignSelf:'center'}} name="warning" color="white" size={40}/></View>
            <Text style={styles.modalText}>If you go back to home, your project will be deleted.</Text>

            <View style={styles.bottomButtonGroup}>
               <TouchableOpacity style={styles.Step1BtnBack} onPress={_modalClose}><Text style={styles.Step1Text}>Cancel</Text></TouchableOpacity>
               <TouchableOpacity  style={styles.Step1Btn} onPress={_modalConfirm}><Text style={styles.Step1Text}>Continue</Text></TouchableOpacity>
         
          </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/Background.png")}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.tabLine}>
            <View>
              <View style={styles.Step2Tab}>
                <Text style={styles.Step2TabText}>Videos {"&"} Photos</Text>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{ alignSelf: "center" }}
                >
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
              setModalOpen(true);
            }}
          >
            <Text style={styles.Step1Text}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Step1Btn}
            disabled={forbiddenMoveForward}
            onPress={() => {
              if(videos.length==0){
                setForbiddenMoveForward(true);
              }
              else{
              navigation.navigate("Step3");
              }
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor: '#FFFFFF50',
    // height:'100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#252d42",
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color:'white'
  }
});
