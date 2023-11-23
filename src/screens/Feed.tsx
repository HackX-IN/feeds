import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/Responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../utils/Api";
import CardItem from "../components/CardItem";

interface Props {
  title: string;
  userId: number;
  body: string;
  id: number;
}

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Props[]>([]);
  const [filteredData, setFilteredData] = useState<Props[]>([]);
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearch = () => {
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search feed ..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchQuery.length > 0 ? filteredData : data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return <CardItem key={index} item={item} index={index} />;
        }}
      />
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    fontSize: hp(2),
    color: Colors.text,
    fontWeight: "400",
    padding: 0,
    width: wp(86),
  },
  inputContainer: {
    padding: 10,
    backgroundColor: Colors.lightGray,
    width: wp(95),
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: hp(2),
    alignItems: "center",
  },
});
