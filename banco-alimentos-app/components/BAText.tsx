/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  Text,
  TextStyle,
  PixelRatio,
  StyleProp,
  ViewStyle,
  TouchableOpacity, 

} from "react-native";
import BAPallete from "../resources/BAPallete";

export enum TypeText {
  label0,
  label1,
  label1_White,
  label2,
  label3,
  label4,
  label5,
}

type Props = {
  type?: TypeText;
  style?: StyleProp<ViewStyle>;
  children: string;
  isLink?: boolean;
  onPress?: () => void; 
};

function BAText({
  type = TypeText.label1,
  children,
  style,
  isLink = false, 
  onPress,
}: Props): JSX.Element {
  if (isLink) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styleText(type), style]}>{children}</Text>
      </TouchableOpacity>
      
    );
  }
  return <Text style={[styleText(type), style]}>{children} </Text>;
}

export const styleText = (type: TypeText): TextStyle => {
  switch (type) {
    case TypeText.label3:
      return {
        fontSize: PixelRatio.get() > 2 ? 18 : 14,
        color: BAPallete.Gray02,
        fontWeight: "500",
      };
    case TypeText.label1:
      return {
        fontSize: PixelRatio.get() > 2 ? 24 : 20,
        color: "black",
        fontWeight: "500",
      };
    case TypeText.label0:
      return {
        fontSize: PixelRatio.get() > 2 ? 28 : 24,
        color: BAPallete.Gray03,
        fontWeight: "500",
      };
    case TypeText.label1_White:
      return {
        fontSize: PixelRatio.get() > 2 ? 24 : 20,
        color: "white",
        fontWeight: "500",
      };
    case TypeText.label4:
      return {
        fontSize: PixelRatio.get() > 2 ? 61 : 57,
        color: BAPallete.Red01, 
        fontWeight: "bold",
      }
    case TypeText.label5:
      return {
        fontSize: PixelRatio.get() > 2 ? 18 : 14,
        color: BAPallete.Red01, 
        fontWeight: "500",
        alignContent: "space-around",
        textDecorationLine: "underline"
      }

    default:
      return {
        fontSize: 24,
        color: "black",
      };
  }
};

export default BAText;
