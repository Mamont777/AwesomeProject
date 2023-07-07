import { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { login, email, avatar } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createPost", "desc")
    );
    onSnapshot(postsQuery, (data) =>
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.userImage} source={{ uri: avatar }} />
        <View>
          <Text style={styles.userName}>{login}</Text>
          <Text
            style={{
              fontSize: 11,
              lineHeight: 12.89,
              color: "#212121",
              fontFamily: "Roboto-Regular",
            }}
          >
            {email}
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.itemPhoto} />
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
                  accessibilityLabel="View comments"
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color={item.commentsQuantity > 0 ? "#FF6C00" : "#BDBDBD"}
                    style={{ marginRight: 9 }}
                  />
                </TouchableOpacity>
                <Text style={styles.commentsAmount}>
                  {item.commentsQuantity ? item.commentsQuantity : "0"}
                </Text>
              </View>
              <View style={styles.location}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Map", {
                      location: item.location,
                      title: item.titlePhoto,
                      image: item.photo,
                    });
                  }}
                  accessibilityLabel="View location"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
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
  location: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DefaultScreenPosts;
