import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  TurboModuleRegistry,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BAView from "../components/BAView";
import BAText, { TypeText } from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import axios from "axios";
import BASubView from "../components/BASubView";
import BAButton, { ButtonState } from "../components/BAButton";
import { useSheet } from "../components/Sheet/BASheetContext";
import BAMultiTextInput from "../components/BAMultiTextInput";
import BACommentsSubView from "./BACommentsSubView";

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

interface OtherProps {
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenPost: React.Dispatch<React.SetStateAction<any>>;

}

export default function BAPostsView({ userData }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [chosenPost, setChosenPost] = useState<any>(null);

  const getPosts = async () => {
    await axios
      .get("https://banco-alimentos-api.vercel.app/getPosts")
      .then((res: any) => {
        const postsData = res.data.posts;
        postsData.reverse();
        setPosts(postsData);
      });
  };

  const { openSheet, closeSheet } = useSheet();

  useEffect(() => {
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
          return <Post post={item} key={item.objectId} setShowComment = {setShowComment} setChosenPost = {setChosenPost}/>;
        })}
    </BAView>
     {showComment && <BACommentsSubView userData = {userData} post = {chosenPost}/>}
    </>
  );
}

export const Post = ({ post, setShowComment, setChosenPost }: PostProps  & OtherProps) => {
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
    <TouchableOpacity style={styles.postBox} onPress = {() => {setShowComment(true); setChosenPost(post)}}>
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

const CreatePostView = ({ userData, closeSheet }) => {
  const [text, setText] = useState("");

  const publishPost = useCallback(async (textPost: string) => {
    await axios
      .post(`https://banco-alimentos-api.vercel.app/post`, {
        text: textPost,
        title: userData.username,
        userId: userData,
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
    paddingHorizontal: 20,
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
