import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./src/screens/Feed";
import AddPost from "./src/screens/AddPost";
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { hp } from "./src/utils/Responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./src/constants/Colors";

const Stack = createNativeStackNavigator();

export default () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" translucent />

      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={Feed}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen name="AddPost" component={AddPost} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
