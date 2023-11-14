import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAPallete from "../resources/BAPallete";
import { useModal } from "./Modal/BAModalContext";

type BadgeProps = {
  image: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
};

export default function BABadge({ image, style }: BadgeProps) {
  const { openModal } = useModal();
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        openModal(<BABadgeModal image={image} />, "");
      }}
    >
      <BAIcon icon={image} color={BAPallete.Red01} />
    </TouchableOpacity>
  );
}

function BABadgeModal({ image }: BadgeProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.badgeWrapper}>
        <BAIcon icon={image} color={BAPallete.Red01} size={"large"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrapper: {
    width: "30%",
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
});
