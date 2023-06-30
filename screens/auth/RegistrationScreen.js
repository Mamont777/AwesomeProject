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
import { useNavigation } from "@react-navigation/native";
import BgImage from "../../assets/images/bg-img.jpg";
import ContactImage from "../../assets/images/photo-girl.png";
import AddContact from "../../assets/images/add.png";
import AddedContact from "../../assets/images/added.png";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showAddContact, setShowAddContact] = useState(true);
  const [showAddedContact, setShowAddedContact] = useState(false);

  const navigation = useNavigation();

  const addImage = () => {
    setShowAddContact(false);
    setShowAddedContact(true);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const showKeyboard = () => {
    setIsShowKeyBoard(true);
  };

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const { login, email, password } = state;

  const onSubmit = () => {
    hideKeyboard();
    navigation.navigate("Home", {
      login,
      email,
      password,
    });
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
              {showAddContact ? (
                <TouchableOpacity style={styles.buttonAdd} onPress={addImage}>
                  <Image style={styles.buttonAddIcon} source={AddContact} />
                </TouchableOpacity>
              ) : (
                <ImageBackground
                  style={styles.contactImage}
                  source={ContactImage}
                  transform={[{ translateX: -60 }]}
                >
                  {showAddedContact && (
                    <Image
                      source={AddedContact}
                      style={styles.addedContactIcon}
                    />
                  )}
                </ImageBackground>
              )}
              <Text style={styles.title}>Реєстрація</Text>

              <View
                style={{
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
                    value={state.login}
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
                    value={state.email}
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
                    value={state.password}
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
                  <Text style={styles.btnTitle}>Зареєстуватися</Text>
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
  contactImage: {
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
  },
  buttonAdd: {
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
  },
  buttonAddIcon: {
    position: "absolute",
    top: -1,
    left: -50,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addedContactIcon: {
    position: "absolute",
    top: 80,
    right: 48,
    width: 25,
    height: 25,
  },
  placeholder: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
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
