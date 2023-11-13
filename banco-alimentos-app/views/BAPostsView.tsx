import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BAView from "../components/BAView";
import BAText, { TypeText } from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import axios from "../axios";
import BASubView from "../components/BASubView";
import BAButton, { ButtonState } from "../components/BAButton";
import { useSheet } from "../components/Sheet/BASheetContext";
import BAMultiTextInput from "../components/BAMultiTextInput";
import BACommentsSubView from "./BACommentsSubView";
import { useLoading } from "../components/Loading/BALoadingContext";
import { useBird } from "../components/BABirdContext";

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
  onClickPost: () => void;
};

type PostsProps = {
  userData: any;
};

export default function BAPostsView({ userData }: PostsProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const { openLoading, closeLoading } = useLoading();

  const getPosts = async () => {
    await axios.get("/getPosts").then((res: any) => {
      const postsData = res.data.posts;
      postsData.reverse();
      setPosts(postsData);
      closeLoading();
    });
  };

  const { openSheet, closeSheet } = useSheet();

  useEffect(() => {
    openLoading();
    getPosts();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts()
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
      });
  }, []);

  const AddButton = () => {
    return (
      <TouchableOpacity
        style={{ marginRight: 5 }}
        onPress={() =>
          openSheet(
            <CreatePostView userData={userData} closeSheet={closeSheet} />,
            "Create Post"
          )
        }
      >
        <BAIcon icon={BAIcons.AddIcon} color={BAPallete.Red01} />
      </TouchableOpacity>
    );
  };

  return (
    <>
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
            return (
              <Post
                post={item}
                key={item.objectId}
                onClickPost={() => setIsCommentsOpen(true)}
              />
            );
          })}
      </BAView>
      <BACommentsSubView isOpen={isCommentsOpen} onReturn={setIsCommentsOpen} />
    </>
  );
}

export const Post = ({ post, onClickPost }: PostProps) => {
  const [likedPost, setLiketPost] = useState(false);
  const [postData, setPostData] = useState(post);

  const { dispatchInteraction } = useBird();

  useEffect(() => {
    setPostData(post);
  }, [post]);

  const likePost = useCallback(async (isLike: boolean) => {
    const postData = post;
    isLike ? (postData.nLikes += 1) : (postData.nLikes -= 1);
    dispatchInteraction(postData.objectId);
    await axios.patch(`/likePost/${post.objectId}/${isLike ? 1 : -1}`, post);
    setPostData({ ...postData });
  }, []);

  return (
    <TouchableOpacity style={styles.postBox} onPress={onClickPost}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic} />
          <BAText type={TypeText.label3} style={{ fontSize: 16 }}>
            {postData.title}
          </BAText>
        </View>
        <BAText type={TypeText.label3} style={{ fontSize: 14 }}>
          10m
        </BAText>
      </View>
      <BAText
        style={{ marginVertical: 20, fontSize: 18 }}
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
              size={"medium"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.FlagIcon}
              color={BAPallete.Red01}
              size={"medium"}
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
                size={"medium"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.ShareIcon}
              color={BAPallete.Red01}
              size={"medium"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CreatePostView = ({ userData, closeSheet }: any) => {
  const [text, setText] = useState("");

  const publishPost = useCallback(async (textPost: string) => {
    await axios
      .post(`/post`, {
        text: textPost,
        title: userData.user.username,
        userId: userData.user,
      })
      .then((res) => {
        console.log(res);
        closeSheet();
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1, gap: 40, marginTop: 10 }}>
      <BAMultiTextInput
        value={text}
        onChange={(e) => {
          setText(e);
        }}
      />
      <BAButton
        state={ButtonState.alert}
        onPress={() => publishPost(text)}
        text="Send"
      />
    </View>
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
    borderRadius: 15,
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
  },
  profilePic: {
    width: 40,
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
