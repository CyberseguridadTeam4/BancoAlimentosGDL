import {
  View,
  StyleSheet,
  ImageSourcePropType,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";
import Svg, { Path } from "react-native-svg";
import BAPallete from "../resources/BAPallete";
import BAButton, { ButtonState } from "./BAButton";
import BAIcons from "../resources/icons/BAIcons";
import { IconSize } from "../resources/icons/BAIcon";

const BUTTONS_STYLES: ImageSourcePropType[] = [
  BAIcons.ForoIcon,
  BAIcons.MapIcon,
  BAIcons.BirdIcon,
  BAIcons.PersonIcon,
  BAIcons.SettingIcon,
];

export default class BABottomBar extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          {BUTTONS_STYLES.map((item, index) => {
            return (
              <BAButton
                key={index}
                onPress={() => {}}
                icon={item}
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
}

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
  middleButton: {
    top: -30,
    marginHorizontal: "5%",
  },
});
