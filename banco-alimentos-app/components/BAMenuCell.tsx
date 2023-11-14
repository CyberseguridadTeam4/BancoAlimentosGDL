/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import { ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAPallete from "../resources/BAPallete";
import BAText, { TypeText } from "./BAText";

type VoidOrSet = (option: any) => void | (() => void);

type Props = {
  icon?: ImageSourcePropType;
  text: string;
  onSelect?: VoidOrSet;
  selected?: boolean;
  value?: any;
};

function BAMenuCell({
  icon,
  text,
  onSelect,
  selected,
  value,
}: Props): JSX.Element {
  const [isHover, setIsHover] = useState(false);
  return (
    <Pressable
      onHoverIn={() => setIsHover(true)}
      onHoverOut={() => setIsHover(false)}
      style={[
        styles.wrapper,
        selected && styles.selected,
        isHover && styles.hover,
      ]}
      onPress={() => onSelect && onSelect(value)}
      disabled={onSelect == null}
    >
      {icon && <BAIcon size={"small"} icon={icon} color={BAPallete.Gray02} />}
      <View style={styles.textWrapper}>
        <BAText type={TypeText.label3}>{text}</BAText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BAPallete.White,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "white",
    paddingVertical: 5,
    paddingLeft: 10,
    borderWidth: 3,
  },
  selected: {
    borderColor: BAPallete.Blue01,
  },
  hover: {
    backgroundColor: BAPallete.Gray04,
  },
  textWrapper: {
    paddingLeft: 10,
  },
});

export default BAMenuCell;
