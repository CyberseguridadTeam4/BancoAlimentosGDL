/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAText, { TypeText } from "./BAText";
import BAPallete from "../resources/BAPallete";

export enum ButtonState {
  enabled,
  secondary,
  disabled,
  activate,
  alert,
}

type Props = {
  text?: string;
  onPress: () => void;
  state?: ButtonState;
  icon?: ImageSourcePropType;
  iconSize?: IconSize;
  style?: StyleProp<ViewStyle>;
  disableShadow?: boolean;
};

function BAButton({
  text,
  onPress,
  icon,
  iconSize = IconSize.medium,
  state = ButtonState.enabled,
  style,
  disableShadow = false,
}: Props): JSX.Element {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        !disableShadow && styles.shadow,
        { backgroundColor: getBackgroundColor(state) },
        style,
      ]}
      onPress={onPress}
      disabled={state == ButtonState.disabled}
    >
      {state == ButtonState.disabled && <View style={styles.disabledBg} />}
      <View style={styles.wrapper}>
        {icon && (
          <BAIcon icon={icon} size={iconSize} color={getIconColor(state)} />
        )}
        {text && <BAText type={getFontStyle(state)}>{text}</BAText>}
      </View>
    </TouchableOpacity>
  );
}

const getIconColor = (state: ButtonState) => {
  if (state === ButtonState.enabled || state === ButtonState.disabled) {
    return BAPallete.Black;
  } else {
    return BAPallete.White;
  }
};

const getFontStyle = (state: ButtonState) => {
  if (state === ButtonState.enabled || state === ButtonState.disabled) {
    return TypeText.label1;
  } else {
    return TypeText.label1_White;
  }
};

const getBackgroundColor = (state: ButtonState) => {
  switch (state) {
    case ButtonState.enabled:
      return BAPallete.White;
    case ButtonState.secondary:
      return BAPallete.Blue01;
    case ButtonState.disabled:
      return BAPallete.White;
    case ButtonState.activate:
      return BAPallete.Green01;
    case ButtonState.alert:
      return BAPallete.Red01;

    default:
      return BAPallete.Black;
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    color: "black",
    borderRadius: 10,
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 14,
  },
  shadow: {
    shadowRadius: 10,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
  disabledBg: {
    width: "100%",
    aspectRatio: 1 / 1,
    backgroundColor: "black",
    opacity: 0.05,
    position: "absolute",
    borderRadius: 10,
  },
});

export default BAButton;
