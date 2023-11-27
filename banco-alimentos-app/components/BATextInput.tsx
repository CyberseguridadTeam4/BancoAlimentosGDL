/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BAIcon from "../resources/icons/BAIcon";
import BAPallete from "../resources/BAPallete";
import { styleText, TypeText } from "./BAText";
import BAIcons from "../resources/icons/BAIcons";

type Props = {
  icon?: ImageSourcePropType;
  placeholder?: string;
  value: string;
  onChange: (input: string) => void;
  isPassword?: boolean; // New prop to indicate if it's a password input
};

function BATextInput({
  icon,
  placeholder,
  value,
  onChange,
  isPassword = false,
}: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      {icon && <BAIcon icon={icon} color={BAPallete.Black} />}
      <TextInput
        placeholderTextColor={BAPallete.Gray03}
        style={[styles.textInput, styleText(TypeText.label1)]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword}
        autoCorrect={false}
        spellCheck={false}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <BAIcon
            icon={showPassword ? BAIcons.EyeIcon : BAIcons.EyeIcon}
            color={BAPallete.Gray03}
          />
        </TouchableOpacity>
      )}
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
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
    padding: 10,
  },
  textInput: {
<<<<<<< HEAD
    width: "80%",
=======
    flex: 1,
>>>>>>> 293b05e43fd1d01d84540a4bab0f72939bf17f96
    textAlignVertical: "center",
    borderColor: "transparent",
    borderWidth: 1,
  },
  shadow: {
    elevation: 10,
    backgroundColor: "#0000",
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
