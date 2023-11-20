import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import BAPallete from "../resources/BAPallete";
import { useModal } from "./Modal/BAModalContext";
import BAButton, { ButtonState } from "./BAButton";
import BABadges from "../assets/badges/BABadges";
import BAIcons from "../resources/icons/BAIcons";
import axios from "../axios";
import { useUser } from "./BAUserContext";

type BadgeProps = {
  image: ImageSourcePropType;
  badges: any[];
  disableArrows: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function BABadge({
  image,
  badges,
  disableArrows = false,
  style,
}: BadgeProps) {
  const { openModal } = useModal();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        openModal(
          <BABadgeModal
            index={badges.indexOf(BABadges.indexOf(image))}
            badges={badges}
            disableArrows={disableArrows}
          />,
          ""
        );
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

function BABadgeModal({ index, badges, disableArrows }: any) {
  const [badgeIndex, setBadgeIndex] = useState(index);

  const { closeModal } = useModal();
  const { setUser } = useUser();

  const handleButton = (value: number) => {
    setBadgeIndex(badgeIndex + value);
  };

  const handleProfileBadge = useCallback(async () => {
    await axios
      .patch(`/profileBadge/${badges[badgeIndex]}`)
      .then((res) => setUser(res.data.user));
    closeModal();
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.badgeContainer}>
        {!disableArrows && (
          <BAButton
            style={[styles.buttonStyle, { transform: [{ scaleX: -1 }] }]}
            icon={BAIcons.ArrowIcon}
            onPress={() => handleButton(-1)}
            state={badgeIndex > 0 ? ButtonState.enabled : ButtonState.disabled}
          />
        )}
        <View style={styles.badgeWrapper}>
          <Image
            source={BABadges[badges[badgeIndex]]}
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
        {!disableArrows && (
          <BAButton
            style={styles.buttonStyle}
            icon={BAIcons.ArrowIcon}
            onPress={() => handleButton(1)}
            state={
              badgeIndex < badges.length - 1
                ? ButtonState.enabled
                : ButtonState.disabled
            }
          />
        )}
      </View>
      <BAButton
        state={ButtonState.alert}
        text="Establecer en perfil"
        onPress={() => handleProfileBadge()}
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
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
  buttonStyle: {
    width: 50,
    aspectRatio: 1 / 1,
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
