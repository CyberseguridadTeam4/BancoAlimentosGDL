import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BAView from "../components/BAView";
import BAText, { TypeText } from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import axios from "axios";
import BASubView from "../components/BASubView";
import BAButton from "../components/BAButton";

type PostProps = {
  post: {
    text: string;
    title: string;
    userId: {
      __type: string;
      className: string;
      objectId: string;
    };
    nViews: number;
    nLikes: number;
    createdAt: string;
    updatedAt: string;
    reported: boolean;
    objectId: string;
  };
};

export default function BAPostsView() {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getPosts = async () => {
    await axios
      .get("https://banco-alimentos-cseo1rmbe-bojavs-svg.vercel.app/getPosts")
      .then((res: any) => {
        setPosts(res.data.posts);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts().then(() => {
      setRefreshing(false);
    });
  }, []);

  const AddButton = () => {
    return (
      <TouchableOpacity style={{ marginRight: 5 }}>
        <BAIcon icon={BAIcons.AddIcon} color={BAPallete.Red01} />
      </TouchableOpacity>
    );
  };

  return (
    <BAView
      title="Posts"
      rightButtons={AddButton()}
      style={styles.columnPosts}
      onRefresh={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {posts.length > 0 &&
        posts.map((item) => {
          return <Post post={item} key={item.objectId} />;
        })}
    </BAView>
  );
}

export const Post = ({ post }: PostProps) => {
  const [likedPost, setLiketPost] = useState(false);
  const [postData, setPostData] = useState(post);

  useEffect(() => {
    setPostData(post);
  }, [post]);

  const likePost = useCallback(async (isLike: boolean) => {
    const postData = post;
    isLike ? (postData.nLikes += 1) : (postData.nLikes -= 1);
    await axios.patch(
      `https://banco-alimentos-api.vercel.app/like/${post.objectId}/${
        isLike ? 1 : -1
      }`,
      post
    );
    setPostData({ ...postData });
  }, []);

  return (
    <TouchableOpacity style={styles.postBox}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic} />
          <BAText type={TypeText.label3} style={{ fontSize: 20 }}>
            {postData.title}
          </BAText>
        </View>
        <BAText type={TypeText.label3} style={{ fontSize: 14 }}>
          10m
        </BAText>
      </View>
      <BAText
        style={{ marginVertical: 20, fontSize: 22 }}
        type={TypeText.label1}
      >
        {postData.text}
      </BAText>
      <View style={styles.footer}>
        <View style={[styles.row, { gap: 20 }]}>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.ForoIcon}
              color={BAPallete.Red01}
              size={IconSize.medium}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.FlagIcon}
              color={BAPallete.Red01}
              size={IconSize.medium}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, { gap: 20 }]}>
          <TouchableOpacity
            onPress={() => {
              setLiketPost(!likedPost);
              likePost(!likedPost);
            }}
          >
            <View style={styles.likeContainer}>
              <BAText type={TypeText.label3}>{postData.nLikes}</BAText>
              <BAIcon
                icon={
                  likedPost ? BAIcons.HeartIconActivated : BAIcons.HeartIcon
                }
                color={BAPallete.Red01}
                size={IconSize.medium}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.ShareIcon}
              color={BAPallete.Red01}
              size={IconSize.medium}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 0,
    marginRight: 20,
  },
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
    flex: 1,
    gap: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
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
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
