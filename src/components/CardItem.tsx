import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { hp, wp } from "../utils/Responsive-screen";
import { Colors } from "../constants/Colors";
import { Skeleton } from "moti/skeleton";

interface FeedItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CardItemProps {
  item: FeedItem;
  index: number;
}

const CardItem: React.FC<CardItemProps> = ({ item, index }) => {
  return (
    <View style={[styles.cardContainer, { marginTop: index === 0 ? 10 : 0 }]}>
      <Skeleton
        show
        height={70}
        width={70}
        radius={"square"}
        transition={{
          type: "timing",
          duration: 2000,
        }}
      >
        <Text
          style={styles.title}
          numberOfLines={2}
        >{`Title: ${item.title}`}</Text>
      </Skeleton>
      <Text
        style={styles.subtitle}
        numberOfLines={5}
      >{`Body: ${item.body.trim()}`}</Text>
      <Text style={styles.id}>{item.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: wp(95),
    marginBottom: 16,
    alignSelf: "center",
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: Colors.text,
  },
  subtitle: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: Colors.secondaryText,
    letterSpacing: 0.5,
    lineHeight: hp(2.7),
  },
  id: {
    textAlign: "right",
    fontSize: hp(1.5),
    fontWeight: "400",
    marginTop: 4,
  },
});

export default CardItem;
