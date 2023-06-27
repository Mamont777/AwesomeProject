import { ImageBackground, StyleSheet, View, Text } from "react-native";
import ContactImage from "../../assets/images/photo-girl.png";

export default function PostsScreen() {
  return (
    <View style={StyleSheet.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ImageBackground
          style={styles.contactImage}
          source={ContactImage}
        ></ImageBackground>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.textEmail}>{}</Text>
        </View>
      </View>
    </View>
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
  contactImage: {
    width: 60,
    height: 60,
  },
  textName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  textEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
