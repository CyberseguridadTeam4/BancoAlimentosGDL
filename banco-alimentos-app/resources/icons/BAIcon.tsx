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
  size?: IconSize | number;
};

export type IconSize = "small" | "medium" | "large";

function BAIcon({ icon, color, size = "medium" }: Props): JSX.Element {
  return (
    <Image
      source={icon}
      style={[getIconSize(size), { tintColor: color, resizeMode: "contain" }]}
    />
  );
}

const getIconSize = (size: IconSize | number) => {
  if (typeof size == "number") {
    return {
      width: size,
      height: size,
    };
  }
  switch (size) {
    case "small":
      return {
        width: PixelRatio.get() > 2 ? 18 : 14,
        height: PixelRatio.get() > 2 ? 18 : 14,
      };
    case "medium":
      return {
        width: PixelRatio.get() > 2 ? 20 : 16,
        height: PixelRatio.get() > 2 ? 20 : 16,
      };
    case "large":
      return {
        width: PixelRatio.get() > 2 ? 28 : 24,
        height: PixelRatio.get() > 2 ? 28 : 24,
      };

    default:
      return {};
  }
};

export default BAIcon;
