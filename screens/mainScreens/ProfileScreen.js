import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import BgImage from "../../assets/images/bg-img.jpg";
import { authSignOutUser } from "../../redux/auth/authOperations";

export default function Profile() {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={BgImage}>
        <View style={styles.wrapper}>
          <View style={styles.avatar}></View>
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
});
