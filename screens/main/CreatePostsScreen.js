import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";

export default function CreatePosts({ navigation }) {
  const [setIsShowKeyboard] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [titlePhoto, setTitlePhoto] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const showKeyboard = () => {
    setIsShowKeyboard(true);
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    navigation.navigate("DefaultPosts");
    setPhoto("");
    setTitlePhoto("");
  };

  const deletePhoto = () => {
    setPhoto("");
    setTitlePhoto("");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} ref={setCameraRef}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: "100%", height: 240, borderRadius: 8 }}
                  />
                </View>
              )}
              <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          </View>
          <Text style={styles.photoText}>
            {" "}
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>

          <View style={{ marginTop: 32 }}>
            <TextInput
              style={styles.inputName}
              placeholder="Назва..."
              onFocus={showKeyboard}
              onBlur={hideKeyboard}
              value={titlePhoto}
              onChangeText={setTitlePhoto}
            />
          </View>
          <View style={styles.inputLocationView}>
            <EvilIcons name="location" size={24} color="#BDBDBD" />
            <TextInput
              style={styles.inputLocation}
              placeholder="Місцевість..."
              onFocus={showKeyboard}
              onBlur={hideKeyboard}
            />
          </View>

          <TouchableOpacity
            style={{ ...styles.btn }}
            activeOpacity={0.8}
            onPress={sendPhoto}
          >
            <Text style={styles.btnTitle}>Опубліковати</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDelete}
            activeOpacity={0.8}
            onPress={deletePhoto}
          >
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  cameraContainer: {
    position: "relative",
    marginTop: 32,
    marginBottom: 8,
    height: 240,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
  photoText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputName: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputLocationView: {
    marginTop: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  inputLocation: {
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#F6F6F6",
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  buttonDelete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    marginBottom: 34,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
