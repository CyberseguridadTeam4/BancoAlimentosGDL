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
};

function BATextInput({
  icon,
  placeholder,
  value,
  onChange,
}: Props): JSX.Element {
  return (
    <View style={styles.wrapper}>
      {icon && <BAIcon icon={icon} color={BAPallete.Black} />}
      <TextInput
        placeholderTextColor={BAPallete.Gray03}
        style={[styles.textInput, styleText(TypeText.label1)]}
        placeholder={placeholder}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.15,
    padding: 10,
  },
  textInput: {
    textAlignVertical: "center",
    borderColor: "transparent", // Set to your background color
    borderWidth: 1,
  },
});

export default BATextInput;
