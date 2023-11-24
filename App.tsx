import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./src/screens/Feed";
import AddPost from "./src/screens/AddPost";
import SavedPosts from "./src/screens/SavedPosts";
import { LogBox, StatusBar, useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export default () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  LogBox.ignoreAllLogs();

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
          <Stack.Screen
            name="AddPost"
            component={AddPost}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Saved"
            component={SavedPosts}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
