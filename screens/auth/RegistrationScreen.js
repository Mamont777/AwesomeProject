import { ImageBackground, StyleSheet, TextInput, View } from "react-native";
import BgImage from "../../assets/images/bg-img.jpg";
import ContactImage from "../../assets/images/photo-girl.png";
import CrossSvg from "../../assets/images/CrossSvg";
import { useState } from "react";
import { Text } from "react-native-svg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={BgImage}>
        <View style={styles.layout}>
          <ImageBackground
            style={styles.contactImage}
            source={ContactImage}
            transform={[{ translateX: -60 }]}
          >
            <View style={styles.crossSvg}>
              <CrossSvg />
            </View>
          </ImageBackground>
          <Text style={styles.title}>Реєстрація</Text>

          <View style={{ marginTop: 32 }}>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              value={state.login}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              maxLength={20}
              value={password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
            />
            <Text style={styles.showPassword}>Показати</Text>
          </View>
        </View>
      </ImageBackground>
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
  contactImage: {
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
  },
  layout: {
    marginTop: "auto",
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  crossSvg: {
    position: "absolute",
    left: (120 - 25) / 2,
    top: 80,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "E8E8E8",
    borderRadius: 50,
    backgroundColor: "FFFFFF",
  },
  title: {
    marginTop: 92,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    padding: 16,
    paddingBottom: 15,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  showPassword: {
    position: "absolute",
    top: 16,
    right: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
