import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import BgImage from "../../assets/images/bg-img.jpg";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const showKeyboard = () => {
    setIsShowKeyboard(true);
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const { email, password } = state;

  const onSubmit = () => {
    hideKeyboard();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground source={BgImage} style={styles.bgImage} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.layout}>
            <Text style={styles.title}>Увійти</Text>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyBoard ? 32 : 78,
                width: dimensions,
              }}
            >
              <View style={{ marginTop: 32 }}>
                <TextInput
                  onBlur={hideKeyboard}
                  onFocus={showKeyboard}
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
                  onBlur={hideKeyboard}
                  secureTextEntry={!showPassword}
                  onFocus={showKeyboard}
                  style={styles.input}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  maxLength={20}
                />
                <TouchableOpacity
                  style={styles.showPasswordContainer}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  ...styles.btn,
                  display: isShowKeyBoard ? "none" : "flex",
                }}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 16, alignSelf: "center" }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text>
                  Немає акаунту?
                  <Text
                    style={{
                      ...styles.toRegisterLink,

                      display: isShowKeyBoard ? "none" : "flex",
                    }}
                  >
                    {" "}
                    Зареєструватися
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <ImageBackground />
      </View>
    </TouchableWithoutFeedback>
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

  btn: {
    backgroundColor: "#FF6C00",
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
    color: "#FFFFFF",
  },
  toRegisterLink: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  form: {
    marginHorizontal: 16,
  },
  showPasswordContainer: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
