import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardItem from "../components/CardItem";
import { useNavigation } from "@react-navigation/core";
import { hp } from "../utils/Responsive-screen";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Ionicons as Icon } from "@expo/vector-icons";

interface Props {
  title: string;
  body: string;
  id: number;
  userId: number;
}
const SavedPosts = () => {
  const [savedPost, setSavedPosts] = useState<Props[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    GetPosts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.headers}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
        </View>
      ),
    } as NativeStackNavigationOptions);
    return () => {
      navigation.setOptions({
        headerRight: null,
        headerLeft: null,
      });
    };
  }, [navigation]);

  const GetPosts = async () => {
    const storedData = await AsyncStorage.getItem("posts");
    if (storedData) {
      setSavedPosts(JSON.parse(storedData));
    }
    return [];
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPost}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: hp(2.5) }}>No Saved Posts</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return <CardItem item={item} index={index} />;
        }}
      />
    </View>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headers: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
