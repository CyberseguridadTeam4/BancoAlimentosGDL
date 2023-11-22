import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Path, Svg } from "react-native-svg";
import BAPallete from "../resources/BAPallete";
import BABadge from "./BABadge";
import BAIcons from "../resources/icons/BAIcons";
import BAButton, { ButtonState } from "./BAButton";
import BABadges from "../assets/badges/BABadges";
import { useUser } from "./BAUserContext";

type EggProps = {
  nextBadge: number;
  onClose: () => void;
};

type PartsEggProps = {
  positionYRef: Animated.AnimatedInterpolation<string | number>;
};

export default function BAEgg({ nextBadge, onClose }: EggProps) {
  const backgroundOpacity = useRef(new Animated.Value(1)).current;
  const rotationEggRef = useRef(new Animated.Value(0)).current;
  const scaleEggRef = useRef(new Animated.Value(0)).current;

  const positionYRef = useRef(new Animated.Value(0)).current;

  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const { userData } = useUser();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0.25,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(positionYRef, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleEggRef, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleEggRef, {
        toValue: 1,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.delay(500).start(() => {
        Animated.sequence([
          Animated.timing(rotationEggRef, {
            toValue: 0,
            duration: 0,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotationEggRef, {
            toValue: 1,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotationEggRef, {
            toValue: -1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotationEggRef, {
            toValue: 1,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotationEggRef, {
            toValue: -1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotationEggRef, {
            toValue: 0,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.delay(300).start(() => {
            Animated.sequence([
              Animated.timing(positionYRef, {
                toValue: 0,
                duration: 0,
                easing: Easing.ease,
                useNativeDriver: true,
              }),
              Animated.timing(positionYRef, {
                toValue: 1,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true,
              }),
              Animated.timing(positionYRef, {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
              }),
              Animated.timing(positionYRef, {
                toValue: 2,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
              }),
            ]).start(() => {
              setIsAnimationFinished(true);
            });
          });
        });
      });
    });
  }, []);

  const onCloseModal = () => {
    onClose();
  };

  const rotationEgg = rotationEggRef.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-20deg", "0deg", "20deg"],
    extrapolate: "identity",
  });

  return (
    <>
      <Animated.View
        style={[styles.background, { opacity: backgroundOpacity }]}
      />
      <View style={styles.viewWrapper}>
        <View style={styles.eggWrapper}>
          {!isAnimationFinished && (
            <Animated.View
              style={[
                styles.badgeWrapper,
                { transform: [{ scale: scaleEggRef }] },
              ]}
            >
              <BABadge
                badges={userData.badges}
                image={BABadges[nextBadge]}
                disableArrows={true}
              />
            </Animated.View>
          )}
          <Animated.View
            style={[
              styles.container,
              { transform: [{ rotate: rotationEgg }, { scale: scaleEggRef }] },
            ]}
          >
            <BAEggTop positionYRef={positionYRef} />
            <BAEggBottom positionYRef={positionYRef} />
          </Animated.View>
          {isAnimationFinished && (
            <View style={styles.badgeWrapper}>
              <BABadge
                image={BABadges[nextBadge]}
                badges={userData.badges}
                disableArrows={true}
              />
            </View>
          )}
        </View>

        <View style={styles.buttonWrapper}>
          {isAnimationFinished && (
            <BAButton
              text="¡Recolectar!"
              state={ButtonState.alert}
              onPress={() => {
                onCloseModal();
              }}
            />
          )}
        </View>
      </View>
    </>
  );
}

function BAEggTop({ positionYRef }: PartsEggProps) {
  const positionY = positionYRef.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -2, -70],
    extrapolate: "identity",
  });

  return (
    <Animated.View
      style={[styles.parts, { transform: [{ translateY: positionY }] }]}
    >
      <Svg viewBox="0 0 320 320">
        <Path
          d="m216.836 152.513-16.76 25.892-16.799-20.227-12.643 15.434-17.485-25.331-10.806 29.8-15.941-16.762-12.772 12.114-13.329-23.929-15.158 22.939c.157-35.658 26.048-113.414 74.208-113.535 41.884-.104 74.387 66.054 73.426 112.963"
          fill={"#fff"}
          transform="matrix(1.01568 0 0 1.06833 -2.493 -10.433)"
        />
      </Svg>
    </Animated.View>
  );
}

function BAEggBottom({ positionYRef }: PartsEggProps) {
  const positionY = positionYRef.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 2, 70],
    extrapolate: "identity",
  });

  return (
    <Animated.View
      style={[styles.parts, { transform: [{ translateY: positionY }] }]}
    >
      <Svg viewBox="0 0 320 320">
        <Path
          d="m85.115 172.102 15.186-22.598 13.329 23.929 12.772-12.114 15.941 16.762 10.806-29.8 17.485 25.331 12.643-15.434 16.799 20.227 16.76-25.892 15.811 19.25c-.706 34.476-32.331 75.15-73.296 74.342-42.037-.828-74.383-40.612-74.236-74.003 0 0 0 .942 0 0Z"
          fill={"#fff"}
          transform="matrix(1.01568 0 0 1.06833 -2.493 -10.433)"
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    flexDirection: "column",
    gap: 20,
    zIndex: 10,
  },
  container: {
    width: "100%",
    aspectRatio: 1 / 1,
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
  },
  eggWrapper: {
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
  },
  parts: {
    width: "100%",
    aspectRatio: 1 / 1,
    position: "absolute",
  },
  badgeWrapper: {
    width: 60,
    aspectRatio: 1 / 1,
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonWrapper: {
    height: "10%",
    marginTop: 20,
    marginHorizontal: 20,
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 9,
  },
});
