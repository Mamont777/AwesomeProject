import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const BottomTabs = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [isFocused, setIsFocuced] = useState(true);

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 58 },
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveTintColor: "#FFFFFF",
      }}
    >
      <BottomTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={() => ({
          headerShown: false,
          tabBarStyle: () => {
            const routeName = getFocusedNameRouteFromRoute() ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
          },
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => {
                setIsFocuced(true), navigation.navigate("Posts");
              }}
            >
              <View style={styles.iconNav}>
                <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={() => ({
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <View
              style={
                isFocused
                  ? { ...styles.iconNav, backgroundColor: "#FF6C00" }
                  : styles.iconNav
              }
            >
              <Feather
                name="plus"
                size={24}
                color={isFocused ? "#ffffff" : color}
              />
            </View>
          ),
          headerTitle: "Створити публікацію",
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                setIsFocuced(true), navigation.navigate("Posts");
              }}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              style={
                !isFocused
                  ? { ...styles.iconNav, backgroundColor: "#FF6C0" }
                  : styles.iconNav
              }
              onPress={() => {
                setIsFocuced(false), navigation.navigate("Profile");
              }}
            >
              <View>
                <Feather
                  name="user"
                  size={24}
                  color={!isFocused ? "#ffffff" : color}
                />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  iconNav: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
