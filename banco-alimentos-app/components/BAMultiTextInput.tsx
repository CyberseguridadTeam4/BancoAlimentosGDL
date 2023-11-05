/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { ImageSourcePropType, StyleSheet, TextInput, View } from "react-native";
import BAIcon from "../resources/icons/BAIcon";
import BAPallete from "../resources/BAPallete";
import { styleText, TypeText } from "./BAText";

type Props = {
  icon?: ImageSourcePropType;
  placeholder?: string;
  value: string;
  onChange: (input: string) => void;
  isShadowed?: boolean;
};

function BATextInput({
  icon,
  placeholder,
  value,
  onChange,
  isShadowed = false,
}: Props): JSX.Element {
  const containerStyle = isShadowed
    ? [styles.wrapper, styles.shadow]
    : styles.wrapper;
  return (
    <View style={styles.wrapper}>
      {icon && <BAIcon icon={icon} color={BAPallete.Black} />}
      <TextInput
        multiline={true}
        placeholderTextColor={BAPallete.Gray03}
        style={[styles.textInput, styleText(TypeText.label3)]}
        placeholder={"Type something..."}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BAPallete.White,
    width: "100%",
    height: 300,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    borderRadius: 10,
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
    padding: 10,
    justifyContent: "flex-start",
  },
  textInput: {
    width: "100%",
    textAlignVertical: "center",
    borderColor: "transparent", // Set to your background color
    borderWidth: 1,
  },
  shadow: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default BATextInput;
