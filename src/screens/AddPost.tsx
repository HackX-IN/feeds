import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { hp } from "../utils/Responsive-screen";

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

      setTitle("");
      setBody("");
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
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={Colors.success}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={styles.headers}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "600",
            }}
          >
            Add Posts
          </Text>
        </View>
      ),
    });
    return () => {
      navigation.setOptions({
        headerRight: null,
        headerLeft: null,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: hp(1.9), fontWeight: "700", margin: 8 }}>
        Add Post
      </Text>
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
        <Button title="Post" onPress={handlePost} />
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "80%",
  },
  headers: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
