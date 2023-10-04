/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { Image, ImageSourcePropType } from "react-native";

type Props = {
  icon: ImageSourcePropType;
  color: string;
  size?: IconSize;
};

export enum IconSize {
  small,
  medium,
  large,
}

function BAIcon({ icon, color, size = IconSize.medium }: Props): JSX.Element {
  return (
    <Image
      source={icon}
      style={[getIconSize(size), { tintColor: color, resizeMode: "contain" }]}
    />
  );
}

const getIconSize = (size: IconSize) => {
  switch (size) {
    case IconSize.small:
      return {
        width: 18,
        height: 18,
      };
    case IconSize.medium:
      return { width: 20, height: 20 };
    case IconSize.large:
      return { width: 28, height: 28 };

    default:
      return {};
  }
};

export default BAIcon;
