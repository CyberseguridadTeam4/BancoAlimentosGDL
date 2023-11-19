import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import BATextInput from "../components/BATextInput";
import axios from "../axios";
import BAReportView from "./BAReportView";
import { useSheet } from "../components/Sheet/BASheetContext";
import { useUser } from "../components/BAUserContext";
import { useBird } from "../components/BABirdContext";

type CommentProps = {
  comment: {
    text: string;
    username: string;
    postId: {
      __type: string;
      className: string;
      objectId: string;
    };
    nLikes: number;
    reported: boolean;
    createdAt: string;
    updatedAt: string;
    objectId: string;
  };
};

type CommentsViewProps = {
  post: PostProps;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isReportHide?: boolean;
  isLikeHide?: boolean;
  isShareHide?: boolean;
  updatePost?: (newPost: any) => void;
};

export type PostProps = {
  text: string;
  title: string;
  username: string;
  nViews: number;
  nLikes: number;
  createdAt: string;
  updatedAt: string;
  reported: boolean;
  objectId: string;
};

const calculateDate = (postCreation: string): string => {
  const currentDate = new Date();
  const postDate = new Date(postCreation);

  let diffInMilliseconds: number = currentDate.getTime() - postDate.getTime();
  let diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
  let diffInMinutes: number = Math.floor(diffInSeconds / 60);
  let diffInHours: number = Math.floor(diffInMinutes / 60);
  let diffInDays: number = Math.floor(diffInHours / 24);

  diffInMilliseconds %= 1000;
  diffInSeconds %= 60;
  diffInMinutes %= 60;
  diffInHours %= 24;

  let result: string = "";
  if (diffInDays > 0) {
    result += `${diffInDays} day(s), `;
  } else if (diffInHours > 0) {
    result += `${diffInHours} hour(s), `;
  } else if (diffInMinutes > 0) {
    result += `${diffInMinutes} minute(s), `;
  } else if (diffInSeconds > 0) {
    result += `${diffInSeconds} second(s), `;
  }

  return result.trim().replace(/,\s*$/, ""); // remove trailing comma
};

export default function BACommentsSubView({
  post,
  isOpen = false,
  setIsOpen,
  isReportHide = false,
  isLikeHide = false,
  isShareHide = false,
  updatePost,
}: CommentsViewProps) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  const { userData } = useUser();

  const publishComment = useCallback(async (textComment: string) => {
    await axios
      .post(`/comment`, {
        text: textComment,
        userId: userData.objectId,
        postId: post.objectId,
      })
      .then((res) => {
        console.log(res);
        setText("");
      })
      .catch((error) => console.log(error));
  }, []);

  const getComments = async () => {
    await axios.get(`/getComments/${post.objectId}`).then((res: any) => {
      const commentData = res.data.comments;
      commentData.reverse();
      setComments(commentData);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <BASubView
      title={post ? post.title : ""}
      isOpen={isOpen}
      onReturn={() => {
        setIsOpen(false);
      }}
      style={{
        flex: 1,
        height: "100%",
        justifyContent: "space-between",
      }}
      isScrolling={false}
    >
      <Post
        post={post}
        isReportHide={isReportHide}
        isLikeHide={isLikeHide}
        isShareHide={isShareHide}
        updatePost={updatePost}
      />
      <BAText type={TypeText.label1} style={{ marginTop: 20, height: 40 }}>
        Comments
      </BAText>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.columnComments}>
            {comments.length > 0 ? (
              comments.map((item) => {
                return <Comment comment={item} key={item.objectId} />;
              })
            ) : (
              <View style={styles.messageComments}>
                <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
                  No hay comentarios aún
                </BAText>
                <BAText type={TypeText.label3} style={{ textAlign: "center" }}>
                  ¡Se el primero!
                </BAText>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.input}>
        <View style={{ width: "88%", marginRight: 10 }}>
          <BATextInput
            placeholder="Type your comment"
            value={text}
            onChange={(e) => {
              setText(e);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            publishComment(text);
          }}
        >
          <BAIcon
            icon={BAIcons.SendIcon}
            color={BAPallete.Red01}
            size={"large"}
          />
        </TouchableOpacity>
      </View>
    </BASubView>
  );
}

const Comment = ({ comment }: CommentProps) => {
  const [likedComment, setLiketComment] = useState(false);
  const [commentData, setCommentData] = useState(comment);

  useEffect(() => {
    setCommentData(comment);
  }, [comment]);

  const { openSheet, closeSheet } = useSheet();

  const likeComment = useCallback(async (isLike: boolean) => {
    const commentData = comment;
    isLike ? (commentData.nLikes += 1) : (commentData.nLikes -= 1);
    setCommentData({ ...commentData });
    await axios.patch(
      `/likeComment/${comment.objectId}/${isLike ? 1 : -1}`,
      comment
    );
  }, []);

  return (
    <View style={styles.commentsBox}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic} />
          <BAText type={TypeText.label3} style={{ fontSize: 18 }}>
            {commentData.username}
          </BAText>
        </View>
        <View style={[styles.row, { gap: 15 }]}>
          <TouchableOpacity
            onPress={() =>
              openSheet(
                <BAReportView
                  closeSheet={closeSheet}
                  type={1}
                  objId={commentData.objectId}
                />,
                "Reportar"
              )
            }
          >
            <BAIcon
              icon={BAIcons.FlagIcon}
              color={BAPallete.Red01}
              size={"medium"}
            />
          </TouchableOpacity>
          <BAText type={TypeText.label3} style={{ fontSize: 12 }}>
            {calculateDate(commentData.createdAt)}
          </BAText>
        </View>
      </View>
      <BAText style={{ marginVertical: 20, fontSize: 16 }}>
        {commentData.text}
      </BAText>
      <View style={styles.footer}>
        <View style={[styles.row, { gap: 15 }]}>
          <TouchableOpacity
            onPress={() => {
              setLiketComment(!likedComment);
              likeComment(!likedComment);
            }}
          >
            <View style={styles.likeContainer}>
              <BAText type={TypeText.label3}>{commentData.nLikes}</BAText>
              <BAIcon
                icon={
                  likedComment ? BAIcons.HeartIconActivated : BAIcons.HeartIcon
                }
                color={BAPallete.Red01}
                size={"small"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const Post = ({
  post,
  isReportHide = false,
  isLikeHide = false,
  isShareHide = false,
  updatePost,
}: any) => {
  const [likedPost, setLiketPost] = useState(post.isliked);
  const [postData, setPostData] = useState(post);

  const { dispatchInteraction } = useBird();
  const { openSheet, closeSheet } = useSheet();

  const likePost = useCallback(async (isLike: boolean) => {
    const postData = post;
    isLike ? (postData.nLikes += 1) : (postData.nLikes -= 1);
    isLike && dispatchInteraction(postData.objectId);
    console.log(postData.isliked);
    postData.isliked = isLike;
    console.log(postData.isliked);
    setPostData({ ...postData });
    updatePost(postData);
    await axios.patch(`/likePost/${post.objectId}/${isLike ? 1 : -1}`, post);
  }, []);

  return (
    <View style={styles.postBox}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic} />
          <BAText type={TypeText.label3} style={{ fontSize: 20 }}>
            {postData.title}
          </BAText>
        </View>
        <BAText type={TypeText.label3} style={{ fontSize: 14 }}>
          {calculateDate(postData.createdAt)}
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
          {!isReportHide && (
            <TouchableOpacity
              onPress={() =>
                openSheet(
                  <BAReportView
                    closeSheet={closeSheet}
                    type={0}
                    objId={post.objectId}
                  />,
                  "Reportar"
                )
              }
            >
              <BAIcon
                icon={BAIcons.FlagIcon}
                color={BAPallete.Red01}
                size={"medium"}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.row, { gap: 20, marginRight: 10 }]}>
          {!isLikeHide && (
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
          )}
          {false && (
            <TouchableOpacity>
              <BAIcon
                icon={BAIcons.ShareIcon}
                color={BAPallete.Red01}
                size={"medium"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  commentsBox: {
    minheight: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowRadius: 10,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
  columnComments: {
    flex: 1,
    gap: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageComments: {
    textAlign: "center",
    marginTop: 75,
    width: "80%",
    alignSelf: "center",
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
  postContainer: {
    height: "25%",
  },
  input: {
    height: 50,
    marginBottom: 100,
    marginTop: 20,
    borderRadius: 10,
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
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
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
