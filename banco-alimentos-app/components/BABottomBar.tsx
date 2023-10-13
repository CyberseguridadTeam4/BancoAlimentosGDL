import {
  View,
  StyleSheet,
  ImageSourcePropType,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";
import Svg, { Path } from "react-native-svg";
import BAPallete from "../resources/BAPallete";
import BAButton, { ButtonState } from "./BAButton";
import BAIcons from "../resources/icons/BAIcons";
import { IconSize } from "../resources/icons/BAIcon";
import BAToastController from "./Toast/BAToast";
import { useToast } from "./Toast/BAToastContext";

const BUTTONS_STYLES: ImageSourcePropType[][] = [
  [BAIcons.ForoIcon, BAIcons.ForoActivatedIcon],
  [BAIcons.MapIcon, BAIcons.MapActivatedIcon],
  [BAIcons.BirdIcon, BAIcons.BirdActivatedIcon],
  [BAIcons.PersonIcon, BAIcons.PersonActivatedIcon],
  [BAIcons.SettingIcon, BAIcons.SettingActivatedIcon],
];

export default function BABottomBar() {
  const [optionSelected, setOptionSelected] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        {BUTTONS_STYLES.map((item: ImageSourcePropType[], index: number) => {
          return index == 2 ? (
            <MiddleButton
              key={index}
              index={index}
              optionSelected={optionSelected}
              setOptionSelected={setOptionSelected}
            />
          ) : (
            <BAButton
              key={index}
              onPress={() => {
                setOptionSelected(index);
              }}
              icon={optionSelected == index ? item[1] : item[0]}
              iconSize={IconSize.large}
              state={ButtonState.alert}
              style={[styles.buttons, index == 2 && styles.middleButton]}
              disableShadow={true}
            />
          );
        })}
      </View>
      <Svg height="100" width="500">
        <Path
          d="M0 0 L195 0 a10,10 0 0 1 10,10 L205 40 a10,10 0 0 0 10,10 L285 50  a10,10 0 0 0 10,-10 L295 10 a10,10 0 0 1 10,-10 L500 0 L500 100 L0 100 Z"
          fill={BAPallete.Red01}
        />
      </Svg>
    </SafeAreaView>
  );
}

const MiddleButton = ({ index, optionSelected, setOptionSelected }: any) => {
  const buttonScale = useRef(new Animated.ValueXY({ x: 1, y: 1 })).current;
  const [playAnimation, setPlayAnimation] = useState(true);

  const { showToast, openToast } = useToast();

  useEffect(() => {
    setPlayAnimation(!showToast);
    if (playAnimation) {
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: { x: 1, y: 1 },
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: { x: 0.8, y: 1.2 },
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: { x: 1.2, y: 0.8 },
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: { x: 1, y: 1 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [openToast]);

  return (
    <Animated.View
      style={[
        styles.middleButtonWrapper,
        { transform: [{ scaleX: buttonScale.x }, { scaleY: buttonScale.y }] },
      ]}
    >
      <BAToastController />
      <View style={styles.middleButton}>
        <BAButton
          onPress={() => {
            setOptionSelected(index);
          }}
          icon={
            optionSelected == index
              ? BAIcons.BirdActivatedIcon
              : BAIcons.BirdIcon
          }
          iconSize={IconSize.large}
          state={ButtonState.alert}
          disableShadow={true}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: "-4%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    alignContent: "center",
    top: "-15%",
    zIndex: 11,
    paddingHorizontal: "13%",
  },
  buttons: {
    marginTop: 15,
    aspectRatio: 1 / 1,
  },
  middleButtonWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    top: -15,
    marginHorizontal: "5%",
    position: "relative",
  },
  middleButton: {
    width: 65,
    marginBottom: 20,
    aspectRatio: 1 / 1,
  },
});
