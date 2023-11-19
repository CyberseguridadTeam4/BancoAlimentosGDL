import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useLoading } from "../components/Loading/BALoadingContext";
import { Post } from "./BAPostsView";

export default function BAMisPosts({ setOnPostPress, setPostPressed }: any) {
  const [posts, setPosts] = useState([]);

  const { openLoading, closeLoading } = useLoading();

  useEffect(() => {
    openLoading();
    (async () => {
      axios.get("/getUserPosts").then((res) => {
        setPosts(res.data.userPosts);
        closeLoading();
      });
    })();
  }, []);

  return (
    <>
      <View style={styles.postsContainer}>
        {posts.length > 0 &&
          posts.map((post: any) => {
            return (
              <View key={post.objectId}>
                <Post
                  post={post}
                  onClickPost={() => {
                    setOnPostPress(true);
                    setPostPressed(post);
                  }}
                  isLikeHide={true}
                  isReportHide={true}
                />
              </View>
            );
          })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    gap: 30,
  },
});
