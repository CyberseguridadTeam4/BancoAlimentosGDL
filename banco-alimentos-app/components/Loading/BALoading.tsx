import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Image } from "react-native";
import { useLoading } from "./BALoadingContext";
import BAPallete from "../../resources/BAPallete";
import BAIcons from "../../resources/icons/BAIcons";

type BAModalProps = {
  title: string;
  content: any;
  onClose: () => void;
};

export default function BALoading() {
  const backgroundOpacity = useRef(new Animated.Value(1)).current;
  const loadingScale = new Animated.ValueXY({
    x: 0.3,
    y: 0.3,
  });
  const loadingPosition = new Animated.Value(0);

  const OPEN_CLOSE_ANIMATION_TIME = 50;

  const { showLoading } = useLoading();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(loadingScale, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(loadingScale, {
        toValue: 0.3,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingScale, {
          toValue: { x: 0.3, y: 0.3 },
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: { x: 0.4, y: 0.2 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: { x: 0.15, y: 0.35 },
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: { x: 0.4, y: 0.2 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: { x: 0.2, y: 0.35 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: { x: 0.3, y: 0.3 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingPosition, {
          toValue: 0,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingPosition, {
          toValue: 0,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingPosition, {
          toValue: -100,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingPosition, {
          toValue: 0,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingPosition, {
          toValue: 0,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loadingPosition, {
          toValue: 0,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [showLoading]);

  return (
    <>
      {showLoading && (
        <Animated.View
          style={[
            styles.container,
            styles.background,
            {
              opacity: backgroundOpacity,
              transform: [{ translateY: -100 }],
            },
          ]}
        >
          <Animated.View
            style={{
              transform: [
                { translateY: 100 },
                { scaleX: loadingScale.x },
                { scaleY: loadingScale.y },
                { translateY: loadingPosition },
                { translateY: -100 },
              ],
            }}
          >
            <Image source={BAIcons.BAIcon} width={60} height={60} />
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    justifyContent: "center",
    zIndex: 100,
    alignItems: "center",
  },
  header: {
    marginVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    zIndex: 101,
    opacity: 0,
  },
  content: {
    flex: 1,
    width: "85%",
    position: "absolute",
    alignSelf: "center",
    zIndex: 102,
    padding: 30,
    paddingTop: 10,
    backgroundColor: BAPallete.Background,
    borderRadius: 20,
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
});
