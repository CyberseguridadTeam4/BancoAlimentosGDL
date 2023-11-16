import { StyleSheet, View, Image } from "react-native";
import React from "react";
import BAPallete from "../resources/BAPallete";
import BABadges from "../assets/badges/BABadges";

export default function BAProfilePic({ user }: any) {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.profile}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../resources/icons/PersonIcon.png")}
          />
        </View>
        {user.profileBadge != -1 && (
          <View style={styles.badge}>
            <Image
              style={styles.badgePic}
              source={BABadges[user.profileBadge]}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profile: {
    width: "60%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "pink",
  },
  badge: {
    width: "25%",
    height: "25%",
    borderRadius: 10,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 30,
    justifyContent: "center",
  },
  badgePic: {
    width: "70%",
    height: "70%",
    alignSelf: "center",
    transform: [{ rotate: "-45deg" }],
    // margin: 12
  },
});
