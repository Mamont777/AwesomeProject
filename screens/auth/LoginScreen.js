import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import BgImage from "../../assets/images/bg-img.jpg";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  return (
    <View style={styles.container}>
      <ImageBackground source={BgImage} style={styles.bgImage} />
      <View style={styles.layout}>
        <Text style={styles.title}>Увійти</Text>

        <View style={{ marginTop: 33 }}>
          <TextInput
            style={styles.input}
            placeholder="Адреса електроної пошти"
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
            value={password}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
            maxLength={20}
          />
          <Text style={styles.showPassword}>Показати</Text>
        </View>
      </View>

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
  input: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    padding: 16,
    marginBottom: 15,
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
  layout: {
    marginTop: "auto",
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    marginTop: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
});
