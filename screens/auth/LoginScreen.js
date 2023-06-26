import { ImageBackground, StyleSheet, View } from "react-native";
import BgImage from "../../assets/images/bg-img.jpg";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={BgImage} style={styles.bgImage} />
      <ImageBackground />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
