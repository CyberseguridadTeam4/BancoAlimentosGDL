import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import BAPallete from "../resources/BAPallete";
import { useModal } from "./Modal/BAModalContext";
import BAButton, { ButtonState } from "./BAButton";

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
      <Image
        source={image}
        style={[
          { width: 70, height: 70, resizeMode: "contain", borderRadius: 10 },
        ]}
      />
    </TouchableOpacity>
  );
}

function BABadgeModal({ image }: BadgeProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.badgeWrapper}>
        <Image
          source={image}
          style={[
            {
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              borderRadius: 10,
            },
          ]}
        />
      </View>
      <BAButton
        state={ButtonState.alert}
        text="Establecer en perfil"
        onPress={() => {}}
      />
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
    margin: 5,
    shadowRadius: 10,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.1,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  badgeWrapper: {
    width: "50%",
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
