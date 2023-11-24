import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/Responsive-screen";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

const AddPost: React.FC = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const GenerateRandomId = () => {
    return Math.floor(Math.random() * 1000);
  };

  useEffect(() => {
    GetPosts();
  }, []);

  const GetPosts = async () => {
    const storedData = await AsyncStorage.getItem("posts");
    if (storedData) {
      console.log(JSON.parse(storedData));
    }
    return [];
  };

  const handlePost = async () => {
    const id = GenerateRandomId();
    const postData = { id, title, body };

    try {
      setLoading(true);

      const storedData = await AsyncStorage.getItem("posts");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      const newData = [...parsedData, postData];
      await AsyncStorage.setItem("posts", JSON.stringify(newData));
      Alert.alert("Success", "Post Added Successfully");
      setTitle("");
      setBody("");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error saving data to AsyncStorage: ", error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => (
        <TouchableOpacity
          style={styles.headers}
          onPress={() => navigation.navigate("Saved")}
        >
          <Text>Saved Posts</Text>
          <Icon
            name="chevron-forward-outline"
            size={24}
            color={Colors.success}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={styles.headers}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={27} color="black" />
          </TouchableOpacity>

          {/* <Text
            style={{
              fontSize: hp(2),
              fontWeight: "600",
            }}
          >
            Add Posts
          </Text> */}
        </View>
      ),
    } as NativeStackNavigationOptions);
    return () => {
      navigation.setOptions({
        headerRight: null,
        headerLeft: null,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
    >
      <View style={styles.card}>
        <View style={{ position: "absolute", top: hp(4) }}>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "700",
            }}
          >
            Add Post
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Body"
          value={body}
          onChangeText={(text) => setBody(text)}
          multiline
        />
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                fontSize: hp(1.9),
                fontWeight: "700",
                color: Colors.background,
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: wp(70),
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault,
    marginBottom: 8,
    borderRadius: 10,
  },
  headers: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  card: {
    width: wp(85),
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",

    height: hp(40),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 5,
  },
  button: {
    padding: 8,
    width: wp(25),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginTop: 8,
  },
});
