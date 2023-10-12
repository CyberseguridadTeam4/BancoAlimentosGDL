import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BAPallete from "../../resources/BAPallete";
import { Polygon, Svg } from "react-native-svg";
import BAText from "../BAText";
import { useToast } from "./BAToastContext";

type ToastProps = {
  toastContent: any;
  toastTime: number;
  closeToast: () => void;
  openToast: (content: any, toastTime: number) => void;
};

export default function BAToastController() {
  const { toastContent, toastTime, closeToast, openToast } = useToast();

  return (
    <>
      {toastContent && (
        <BAToast
          toastContent={toastContent}
          toastTime={toastTime}
          closeToast={closeToast}
          openToast={openToast}
        />
      )}
    </>
  );
}

export function BAToast({
  toastContent,
  toastTime,
  closeToast,
  openToast,
}: ToastProps) {
  const transitionRef = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const [clickBeforeEnd, setClickBeforeEnd] = useState(false);
  const OPEN_CLOSE_ANIMATION_TIME = 300;

  useEffect(() => {
    if (!openToast) return;
    Animated.sequence([
      Animated.timing(transitionRef, {
        toValue: 0,
        duration: 0,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.timing(transitionRef, {
        toValue: 1,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0,
        duration: 0,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.delay(toastTime).start(() => {
      Animated.sequence([
        Animated.timing(transitionRef, {
          toValue: 1,
          duration: 0,
          easing: Easing.quad,
          useNativeDriver: true,
        }),
        Animated.timing(transitionRef, {
          toValue: 0,
          duration: OPEN_CLOSE_ANIMATION_TIME,
          easing: Easing.quad,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 0,
          easing: Easing.quad,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: OPEN_CLOSE_ANIMATION_TIME,
          easing: Easing.quad,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!clickBeforeEnd) return;
        closeToast();
      });
    });
  }, [openToast]);

  const transition = transitionRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -90],
    extrapolate: "identity",
  });

  const onClickToClose = () => {
    setClickBeforeEnd(true);
    Animated.sequence([
      Animated.timing(transitionRef, {
        toValue: 1,
        duration: 0,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.timing(transitionRef, {
        toValue: 0,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 0,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
    ]).start(() => {
      closeToast();
    });
  };

  return (
    <>
      {toastContent && (
        <Animated.View
          style={[
            styles.block,
            { transform: [{ translateY: transition }, { scale: scale }] },
          ]}
        >
          <TouchableOpacity onPress={() => onClickToClose()}>
            <View style={styles.container}>{toastContent}</View>
            <View style={styles.triangle}>
              <Svg height="20" width="20" viewBox="0 0 40 40">
                <Polygon
                  stroke={BAPallete.White}
                  fill={BAPallete.White}
                  points="40,0 20,35 0,0 "
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    width: 250,
    position: "absolute",
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    backgroundColor: BAPallete.White,
    padding: 15,
    borderRadius: 10,
  },
  triangle: {
    alignSelf: "center",
  },
  test: {
    backgroundColor: BAPallete.Red01,
    width: "100%",
    height: 2,
    padding: 10,
  },
});
