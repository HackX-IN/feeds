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
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/Responsive-screen";
import { Ionicons as Icon } from "@expo/vector-icons";
import { API_URL } from "../utils/Api";
import CardItem from "../components/CardItem";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

interface Props {
  title: string;
  userId: number;
  body: string;
  id: number;
}

const Feed = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Props[]>([]);
  const [filteredData, setFilteredData] = useState<Props[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text
          style={{
            fontSize: hp(2.2),
            fontWeight: "900",
          }}
        >
          Feeds
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("AddPost")}>
          <Icon name="add" size={27} color={Colors.text} />
        </TouchableOpacity>
      ),
    } as NativeStackNavigationOptions);
    return () => {
      navigation.setOptions({
        headerRight: null,
        headerLeft: null,
      });
    };
  }, [navigation]);

  const SkeletonPlaceHolder = useMemo(() => {
    return Array.from({ length: 20 }).map((_, index) => null);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
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
          placeholderTextColor={Colors.text}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={
          filteredData.length > 0
            ? filteredData
            : data.length > 0
            ? data
            : SkeletonPlaceHolder
        }
        keyExtractor={(item) => item!?.id?.toString()}
        renderItem={({ item, index }) => {
          return <CardItem key={index} item={item!} index={index} />;
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
    // Uncomment the following line if needed:
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    width: wp(96),
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: hp(2),
    alignItems: "center",
  },
});
