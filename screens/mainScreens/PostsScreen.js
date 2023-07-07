import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPosts"
        component={DefaultScreenPosts}
        options={{
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFFFFF",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontStyle: "normal",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTintColor: "#212121",
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 19 }} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Коментарі",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFFFFF",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontStyle: "normal",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTintColor: "#212121",
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: "Карта",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFFFFF",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontStyle: "normal",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTintColor: "#212121",
        }}
      />
    </NestedScreen.Navigator>
  );
}
