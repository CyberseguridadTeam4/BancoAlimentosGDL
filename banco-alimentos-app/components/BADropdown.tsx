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
  TouchableOpacity,
  View,
} from "react-native";
import BAPallete from "../resources/BAPallete";
import BAText, { TypeText } from "./BAText";
import BAMenuCell from "./BAMenuCell";

type VoidOrSet = (option: any) => void | (() => void);

type Option = {
  text: string;
  value: any | undefined;
  icon?: ImageSourcePropType;
};

type Props = {
  isVisible: boolean;
  optionSelected: any;
  options: Option[];
  onSelect: VoidOrSet;
};

function BADropdownMenu({
  isVisible,
  optionSelected,
  onSelect,
  options,
}: Props): JSX.Element {
  return (
    <View style={[{ display: isVisible ? "flex" : "none" }, styles.container]}>
      {options.map((item) => {
        return (
          <BAMenuCell
            key={item.value}
            icon={item.icon}
            onSelect={onSelect}
            text={item.text}
            selected={optionSelected === item.value}
            value={item.value}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.15,
  },
});

export default BADropdownMenu;
