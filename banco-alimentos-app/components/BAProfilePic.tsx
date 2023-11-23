import { StyleSheet, View, Image } from "react-native";
import React from "react";
import BAPallete from "../resources/BAPallete";
import BABadges from "../assets/badges/BABadges";
import profilePictures from "../assets/profilePictures/BAProfilePictures";

export default function BAProfilePic({ user }: any) {
const pictureColors = [
    BAPallete.SoftRed,
    BAPallete.SoftOrange,
    BAPallete.SoftYellow,
    BAPallete.SoftGreen,
    BAPallete.SoftSky,
    BAPallete.SoftBlue,
    BAPallete.SoftPurple,
    BAPallete.SoftPink,
];

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.profile}>
          <Image
            style={{ width: "90%", height: "90%", tintColor:pictureColors[user.colorProfilePicture]}}
            source={profilePictures[user.idProfilePicture]}
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
     aspectRatio: 1 / 0.8,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    position: "relative",
    // backgroundColor: "red"
  },
  profile: {
    width: "60%",
    aspectRatio: 1 / 1,
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
    aspectRatio: 1 / 1,
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
