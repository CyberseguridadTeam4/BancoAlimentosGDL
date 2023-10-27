/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { Image, ImageSourcePropType, PixelRatio } from "react-native";

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
        width: PixelRatio.get() > 2 ? 18 : 14,
        height: PixelRatio.get() > 2 ? 18 : 14,
      };
    case IconSize.medium:
      return {
        width: PixelRatio.get() > 2 ? 20 : 16,
        height: PixelRatio.get() > 2 ? 20 : 16,
      };
    case IconSize.large:
      return {
        width: PixelRatio.get() > 2 ? 28 : 24,
        height: PixelRatio.get() > 2 ? 28 : 24,
      };

    default:
      return {};
  }
};

export default BAIcon;
