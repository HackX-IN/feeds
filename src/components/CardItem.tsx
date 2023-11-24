import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ViewToken } from "react-native";
import { hp, wp } from "../utils/Responsive-screen";
import { Colors } from "../constants/Colors";
import { Skeleton } from "moti/skeleton";
import Animated, {
  FadeIn,
  Layout,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface FeedItem {
  userId?: number | null;
  id?: number | null;
  title?: string;
  body?: string;
}

interface CardItemProps {
  item: FeedItem;
  index: number;
}

const SkeletonProps = {
  transition: {
    type: "timing",
    duration: 2000,
  },
  backgroundColor: "#d4d4d4",
  colorMode: "light",
} as const;

const CardItem: React.FC<CardItemProps> = React.memo(({ item, index }) => {
  const shouldShowSkeleton = item == null;

  return (
    <Animated.View
      style={[styles.cardContainer, { marginTop: index === 0 ? 10 : 0 }]}
    >
      <Skeleton.Group show={shouldShowSkeleton}>
        <Skeleton
          height={(shouldShowSkeleton && 50) || undefined}
          width={(shouldShowSkeleton && wp(75)) || undefined}
          radius={"square"}
          {...SkeletonProps}
        >
          {item?.title && (
            <Animated.Text
              layout={Layout}
              entering={FadeIn.duration(1000)}
              style={styles.title}
              numberOfLines={2}
            >{`Title: ${item?.title}`}</Animated.Text>
          )}
        </Skeleton>
        {shouldShowSkeleton && <Spacer height={8} />}
        <Skeleton
          height={(shouldShowSkeleton && hp(12)) || undefined}
          width={(shouldShowSkeleton && wp(88)) || undefined}
          radius={"square"}
          {...SkeletonProps}
        >
          {item?.body && (
            <Animated.Text
              layout={Layout}
              entering={FadeIn.duration(1000)}
              style={styles.subtitle}
              numberOfLines={5}
            >{`Body: ${item?.body.trim()}`}</Animated.Text>
          )}
        </Skeleton>
      </Skeleton.Group>

      {item?.id && (
        <Animated.Text
          layout={Layout}
          entering={FadeIn.duration(1000)}
          style={styles.id}
        >
          {item?.id}
        </Animated.Text>
      )}
    </Animated.View>
  );
});
const Spacer = ({ height = 16 }) => <View style={{ height }} />;
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
