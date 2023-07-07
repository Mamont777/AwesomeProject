import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import BgImage from "../../assets/images/bg-img.jpg";
import {
  authSignOutUser,
  updateUserAvatar,
} from "../../redux/auth/authOperations";
import { db, storage } from "../../firebase/config";
import { FlatList } from "react-native";

export default function Profile({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const userQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdDate", "desc")
    );
    onSnapshot(userQuery, (data) =>
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  const updateUserComments = async (avatar) => {
    const userQuery = query(
      collectionGroup(db, "comments"),
      where("authorCommentId", "==", userId)
    );

    const querySnapshot = await getDocs(userQuery);

    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, { avatar });
    });
  };

  const uploadPhotoToServer = async (avatar) => {
    if (avatar) {
      const response = await fetch(avatar);
      const file = await response.blob();

      const uniqueAvatarId = Date.now().toString();

      const imageRef = ref(storage, `userAvatars/${uniqueAvatarId}`);
      await uploadBytes(imageRef, file);

      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    }
  };

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const photo = uploadPhotoToServer(result.assets[0].uri);
      if (photo) {
        await updateUserComments(photo);
        dispatch(updateUserAvatar(photo));
      }
    }
  };

  const removeAvatar = async () => {
    const photo = uploadPhotoToServer();
    await updateUserComments(photo);
    dispatch(updateUserAvatar(photo));
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const updateLikes = async (itemId, likes) => {
    try {
      const likeRef = doc(db, "posts", itemId);
      await updateDoc(likeRef, {
        likes: likes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={BgImage}>
        <View style={styles.wrapper}>
          <View style={styles.avatar}>
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
            {!avatar || avatar.includes("default") ? (
              <TouchableOpacity
                style={styles.btnAddAvatar}
                activeOpacity={0.9}
                onPress={pickAvatar}
              >
                <Ionicons name="add-circle-outline" size={20} color="#FF6C00" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.removeAvatar}
                activeOpacity={0.9}
                onPress={removeAvatar}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color="#E8E8E8"
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.btnSignOut}
            activeOpacity={0.6}
            onPress={signOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>{login}</Text>
          {userPosts.length > 0 && (
            <View style={styles.postContainer}>
              <FlatList
                style={{ marginBottom: 90 }}
                data={userPosts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Image
                      source={{ uri: item.photo }}
                      style={styles.itemPhoto}
                    />
                    <Text style={styles.itemTitle}>{item.titlePhoto}</Text>
                    <View style={styles.description}>
                      <View style={styles.comments}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Comments", {
                              postId: item.id,
                              postPhoto: item.photo,
                              autorPostId: item.userId,
                            })
                          }
                        >
                          <Feather
                            name="message-circle"
                            size={24}
                            color={
                              item.commentsQuantity > 0 ? "#FF6C00" : "#BDBDBD"
                            }
                            style={{ marginRight: 9 }}
                          />
                        </TouchableOpacity>
                        <Text style={styles.commentsAmount}>
                          {item.commentsQuantity ? item.commentsQuantity : "0"}
                        </Text>
                      </View>
                      <View style={styles.likes}>
                        <TouchableOpacity
                          onPress={() => {
                            updateLikes(item.likes + 1, item.id);
                          }}
                        >
                          <Feather
                            name="thumbs-up"
                            size={24}
                            color={item.likes > 0 ? "#FF6C00" : "#BDBDBD"}
                            style={{ marginRight: 10 }}
                          />
                        </TouchableOpacity>
                        <Text style={styles.commentsAmount}>{item.likes}</Text>
                      </View>
                      <View style={styles.location}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Map", {
                              location: item.location,
                              title: item.titlePhoto,
                              image: item.photo,
                            })
                          }
                        >
                          <Feather
                            name="map-pin"
                            size={24}
                            color="#BDBDBD"
                            style={{ marginRight: 8 }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            ...styles.commentsAmount,
                            textDecorationLine: "underline",
                          }}
                        >
                          {item.place}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    position: "relative",
    width: "100%",
    marginTop: 147,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    alignSelf: "center",
    marginHorizontal: "auto",
    width: 120,
    height: 120,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
  },
  btnRemoveAvatar: {
    position: "absolute",
    bottom: 14,
    right: 25,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  btnSignOut: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  title: {
    marginBottom: 33,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
  },
  postContainer: {
    paddingHorizontal: 16,
  },
  itemPhoto: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    marginBottom: 11,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  description: {
    paddingBottom: 34,
    flexDirection: "row",
  },
  comments: {
    marginRight: 31,
    flexDirection: "row",
    alignItems: "center",
  },
  commentsAmount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  likes: {
    marginRight: 31,
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
});
