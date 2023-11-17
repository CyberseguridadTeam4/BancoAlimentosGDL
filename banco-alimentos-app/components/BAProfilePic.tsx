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
            style={{ width: "90%", height: "90%", tintColor:BAPallete.SoftRed}}
            source={require("../assets/profilePictures/1.png")}
            resizeMode="contain"
          />
        </View>
        {user.visBadge != -1 && (
          <View style={styles.badge}>
            <Image style={styles.badgePic} source={BABadges[user.visBadge]} />
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
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 5,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
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
    shadowRadius: 5,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
  badgePic: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
    alignSelf: "center",
    transform: [{ rotate: "-45deg" }],
    // margin: 12
  },
});
