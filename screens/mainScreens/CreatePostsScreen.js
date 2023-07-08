import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase/config";

const CreatePostsScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [titlePhoto, setTitlePhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState("");

  const { userId, login, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    };
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    };
    requestPermissions();
    requestLocationPermission();
  }, []);

  const takePhoto = async () => {
    let locationData = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    };
    setLocation(coords);
    const photo = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    uploadPostToServer();
    navigation.navigate("DefaultPosts");
    setPhoto("");
    setTitlePhoto("");
    setLocation("");
    setPlace("");
  };

  const deletePhoto = () => {
    setPhoto("");
    setTitlePhoto("");
    setLocation("");
    setPlace("");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createdDate = Date.now();

    await addDoc(collection(db, `posts`), {
      photo,
      titlePhoto,
      location,
      userId,
      login,
      avatar,
      createdDate,
      likes: 0,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const imageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(imageRef, file);

    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };

  return (
    <View style={styles.container}>
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
        {photo ? "Редагувати фото" : "Завантажте фото"}
      </Text>

      <TextInput
        style={{ ...styles.input, marginBottom: 16 }}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        value={titlePhoto}
        onChangeText={setTitlePhoto}
      />

      <View style={{ marginBottom: 32, position: "relative" }}>
        <TextInput
          style={{ ...styles.input, paddingLeft: 24 }}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
          value={place}
          onChangeText={setPlace}
        />
        <Feather
          name="map-pin"
          size={20}
          color="#BDBDBD"
          style={{ position: "absolute", bottom: 13 }}
        />
      </View>

      <View>
        <TouchableOpacity
          style={
            photo
              ? { ...styles.sendBtn, backgroundColor: "#FF6C00" }
              : styles.sendBtn
          }
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text
            style={
              photo ? { ...styles.btnTitle, color: "#FFFFFF" } : styles.btnTitle
            }
          >
            Опубліковати
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={deletePhoto}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
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
    marginBottom: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    height: 49,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
  },

  sendBtn: {
    backgroundColor: "#F6F6F6",
    height: 51,
    borderRadius: 100,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  deleteBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
