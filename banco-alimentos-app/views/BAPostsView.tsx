import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BAView from "../components/BAView";
import BAText, { TypeText } from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";

export default function BAPostsView() {
  return (
    <BAView title="Posts" isScrolling={true} style={styles.columnPosts}>
      {Array.from({ length: 10 }).map(() => {
        return <Post />;
      })}
    </BAView>
  );
}

const Post = () => {
  const [likedPost, setLiketPost] = useState(false);
  return (
    <TouchableOpacity style={styles.postBox}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic} />
          <BAText>Name</BAText>
        </View>
        <BAText type={TypeText.label3}>10m</BAText>
      </View>
      <BAText style={{ marginVertical: 20 }}>Hello World</BAText>
      <View style={styles.footer}>
        <View style={[styles.row, { gap: 20 }]}>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.ForoIcon}
              color={BAPallete.Red01}
              size={IconSize.large}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.FlagIcon}
              color={BAPallete.Red01}
              size={IconSize.large}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, { gap: 20 }]}>
          <TouchableOpacity onPress={() => setLiketPost(!likedPost)}>
            <BAIcon
              icon={likedPost ? BAIcons.HeartIconActivated : BAIcons.HeartIcon}
              color={BAPallete.Red01}
              size={IconSize.large}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.ShareIcon}
              color={BAPallete.Red01}
              size={IconSize.large}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postBox: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowRadius: 10,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnPosts: {
    gap: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    backgroundColor: "white",
    shadowRadius: 5,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
    marginRight: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
