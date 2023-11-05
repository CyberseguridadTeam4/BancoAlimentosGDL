import {
  View,
  StyleSheet,
  ImageSourcePropType,
  SafeAreaView,
  Animated,
  Easing,
  Keyboard,
  Platform,
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

export default function BABottomBar({ setViewIndex }) {
  const [optionSelected, setOptionSelected] = useState(0);
  const [isKeyboardOnScreen, setIsKeyboardOnScreen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOnScreen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOnScreen(false);
      }
    );

    // Don't forget to remove the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          display:
            isKeyboardOnScreen && Platform.OS == "android" ? "none" : "flex",
        },
      ]}
    >
      <View style={styles.buttonContainer}>
        {BUTTONS_STYLES.map((item: ImageSourcePropType[], index: number) => {
          return index == 2 ? (
            <MiddleButton
              key={index}
              index={index}
              optionSelected={optionSelected}
              setOptionSelected={(index) => {
                setOptionSelected(index);
                setViewIndex(index);
              }}
            />
          ) : (
            <BAButton
              key={index}
              onPress={() => {
                setViewIndex(index);
                setOptionSelected(index);
              }}
              icon={optionSelected == index ? item[1] : item[0]}
              iconSize={IconSize.large}
              state={ButtonState.alert}
              style={[styles.buttons]}
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
      <View>
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
          style={styles.middleButton}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: "-5%",
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 1,
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.25,
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
    flex: 1,
    marginTop: 15,
    aspectRatio: 1 / 1,
  },
  middleButtonWrapper: {
    width: 65,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    top: -15,
    marginHorizontal: "5%",
    position: "relative",
  },
  middleButton: {
    width: 65,
    height: 65,
    padding: 20,
    marginBottom: 20,
  },
});
