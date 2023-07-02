import { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BgImage from "../../assets/images/bg-img.jpg";
import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

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

  const { login, email, password } = state;

  const onSubmit = async () => {
    hideKeyboard();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground style={styles.bgImage} source={BgImage}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.layout}>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} />
                {/* {!avatar ? (
                  <TouchableOpacity
                    style={styles.buttonAddAvatar}
                    onPress={pickAvatar}
                    activeOpacity={0.9}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color="#FF6C00"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.buttonRemoveAvatar}
                    activeOpacity={0.9}
                    onPress={removeAvatar}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color="#E8E8E8"
                    />
                  </TouchableOpacity>
                )} */}
              </View>
              <Text style={styles.title}>Реєстрація</Text>

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
                    placeholder="Логін"
                    value={login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                </View>

                <View style={{ marginTop: 16 }}>
                  <TextInput
                    onBlur={hideKeyboard}
                    onFocus={showKeyboard}
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
                    onBlur={hideKeyboard}
                    secureTextEntry={!showPassword}
                    onFocus={showKeyboard}
                    style={styles.input}
                    placeholder="Пароль"
                    maxLength={20}
                    value={password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
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
                  <Text style={styles.btnTitle} onPress={onSubmit}>
                    Зареєстуватися
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: 16, alignSelf: "center" }}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text>
                    Вже є акаунт?
                    <Text
                      style={{
                        ...styles.toLoginLink,
                        display: isShowKeyBoard ? "none" : "flex",
                      }}
                    >
                      {" "}
                      Увійти
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
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
  buttonAddAvatar: {
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
  buttonRemoveAvatar: {
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
    borderColor: "#E8E8E8",
  },
  form: {
    marginHorizontal: 16,
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
  toLoginLink: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
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
