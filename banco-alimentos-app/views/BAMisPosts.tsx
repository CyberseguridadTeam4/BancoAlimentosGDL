import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useLoading } from "../components/Loading/BALoadingContext";
import { Post } from "./BAPostsView";
import BAText, { TypeText } from "../components/BAText";

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
        {posts.length > 0 ? (
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
          })
        ) : (
          <>
            <BAText
              type={TypeText.label3}
              style={{ textAlign: "center", marginTop: 150 }}
            >
              No tienes posts publicados aún.
            </BAText>
            <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
              Intenta presionando "+" en la sección Posts.
            </BAText>
            <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
              Puede que obtengas alguna recompenza interesante.
            </BAText>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    gap: 30,
  },
});
