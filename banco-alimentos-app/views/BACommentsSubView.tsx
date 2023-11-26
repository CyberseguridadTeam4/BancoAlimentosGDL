import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import axios from "../axios";
import BAReportView from "./BAReportView";
import { useSheet } from "../components/Sheet/BASheetContext";
import { useUser } from "../components/BAUserContext";
import { useBird } from "../components/BABirdContext";
import { useModal } from "../components/Modal/BAModalContext";
import BAProfilePictures from "../assets/profilePictures/BAProfilePictures";
import BABadges from "../assets/badges/BABadges";
import BAProfilePic from "../components/BAProfilePic";
import { useLoading } from "../components/Loading/BALoadingContext";

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
    userData: [
      username: string,
      colorProfilePicture: number,
      idProfilePicture: number,
      visBadge: number
    ];
  };
  fetchComments?: () => {};
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
  userData: [
    username: string,
    colorProfilePicture: number,
    idProfilePicture: number,
    visBadge: number
  ];
  nViews: number;
  nLikes: number;
  createdAt: string;
  updatedAt: string;
  reported: boolean;
  objectId: string;
  isliked: boolean;
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
  const [refreshing, setRefreshing] = useState(false);

  const { openLoading, closeLoading } = useLoading();

  const getComments = async () => {
    openLoading();
    await axios.get(`/getComments/${post.objectId}`).then((res: any) => {
      const commentData = res.data.comments;
      commentData.reverse();
      setComments(commentData);
      closeLoading();
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getComments()
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
      });
  }, []);

  const publishComment = useCallback(async (text: string) => {
    const postId = post.objectId;
    await axios
      .post(`/comment`, {
        postId,
        text,
      })
      .then(() => {
        setText("");
        getComments();
      })
      .catch((error) => console.log(error));
  }, []);

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
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 15,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
        <View style={styles.columnComments}>
          {comments.length > 0 ? (
            comments.map((item) => {
              return (
                <Comment
                  comment={item}
                  key={item.objectId}
                  fetchComments={getComments}
                />
              );
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

const Comment = ({ comment, fetchComments }: CommentProps) => {
  const [likedComment, setLiketComment] = useState(false);
  const [commentData, setCommentData] = useState(comment);
  const [isUser, setIsUser] = useState(false);

  const { openModal } = useModal();
  const { userData } = useUser();

  useEffect(() => {
    setCommentData(comment);
  }, [comment]);

  useEffect(() => {
    setIsUser(commentData.userData[0] == userData.username);
  }, []);

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
          <ProfilePicture
            color={commentData.userData[1]}
            pic={commentData.userData[2]}
            badge={commentData.userData[3]}
            username={commentData.userData[0]}
          />
          <View style={[styles.row, { gap: 15 }]}>
            <BAText type={TypeText.label3} style={{ fontSize: 18 }}>
              {commentData.userData[0]}
            </BAText>
          </View>
        </View>
        <View style={[styles.row, { gap: 15 }]}>
          {isUser && (
            <TouchableOpacity
              onPress={() => {
                openModal(
                  <DeleteModal
                    objId={commentData.objectId}
                    type={1}
                    fetchData={fetchComments}
                  />,
                  "Confirmar"
                );
              }}
            >
              <BAIcon
                icon={BAIcons.TrashIcon}
                color={BAPallete.Red01}
                size={"medium"}
              />
            </TouchableOpacity>
          )}
          <BAText type={TypeText.label3} style={{ fontSize: 12 }}>
            {calculateDate(commentData.createdAt)}
          </BAText>
        </View>
      </View>
      <BAText style={{ marginVertical: 20, fontSize: 16 }}>
        {commentData.text}
      </BAText>
      <View style={styles.footer}>
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
        <View style={[styles.row, { gap: 20, marginRight: 10 }]}>
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
  const [isUser, setIsUser] = useState(false);

  const { dispatchInteraction } = useBird();
  const { openSheet, closeSheet } = useSheet();
  const { openModal } = useModal();
  const { userData } = useUser();

  const likePost = useCallback(async (isLike: boolean) => {
    const postData = post;
    isLike ? (postData.nLikes += 1) : (postData.nLikes -= 1);
    isLike && dispatchInteraction(postData.objectId);
    postData.isliked = isLike;
    setPostData({ ...postData });
    updatePost(postData);
    await axios.patch(`/likePost/${post.objectId}/${isLike ? 1 : -1}`, post);
  }, []);

  useEffect(() => {
    setIsUser(postData.userData[0] == userData.username);
  }, []);

  return (
    <View style={styles.postBox}>
      <View style={styles.header}>
        <View style={styles.row}>
          <ProfilePicture
            color={postData.userData[1]}
            pic={postData.userData[2]}
            badge={postData.userData[3]}
            username={postData.userData[0]}
          />
          <BAText type={TypeText.label3} style={{ fontSize: 20 }}>
            {postData.title}
          </BAText>
        </View>
        <View style={[styles.row, { gap: 20 }]}>
          <BAText type={TypeText.label3} style={{ fontSize: 14 }}>
            {calculateDate(postData.createdAt)}
          </BAText>
          {isUser && (
            <TouchableOpacity
              onPress={() => {
                openModal(
                  <DeleteModal objId={post.objectId} type={0} />,
                  "Confirmar"
                );
              }}
            >
              <BAIcon
                icon={BAIcons.TrashIcon}
                color={BAPallete.Red01}
                size={"medium"}
              />
            </TouchableOpacity>
          )}
        </View>
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

const DeleteModal = ({ objId, type, fetchData }: any) => {
  const { closeModal } = useModal();

  const deletePost = async () => {
    await axios.patch(`/deletePost/${objId}`);
  };

  const deleteComment = async () => {
    await axios.patch(`/deleteComment/${objId}`).then(() => {
      fetchData();
    });
  };

  return (
    <View>
      <BAText type={TypeText.label3} style={{ marginBottom: 20 }}>
        ¿Quieres eliminarlo? Esta acción no es reversible
      </BAText>
      <BAButton
        onPress={() => {
          if (type == 0) {
            deletePost();
          } else if (type == 1) {
            deleteComment();
          }
          closeModal();
        }}
        state={ButtonState.alert}
        text="Aceptar"
      />
    </View>
  );
};

export const ProfilePictureModal = ({ color, pic, badge }: any) => {
  return (
    <>
      <BAProfilePic
        colorProfilePicture={color}
        idProfilePicture={pic}
        visBadge={badge}
      />
    </>
  );
};

export const ProfilePicture = ({ color, pic, badge, username }: any) => {
  const { openModal } = useModal();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          openModal(
            <ProfilePictureModal color={color} pic={pic} badge={badge} />,
            username
          );
        }}
      >
        <View style={styles.profilePic}>
          <Image
            style={{
              width: "90%",
              height: "90%",
              tintColor: pictureColors[color],
            }}
            source={BAProfilePictures[pic]}
            resizeMode="contain"
          />
          {badge != -1 && (
            <View style={styles.badge}>
              <Image style={styles.badgePic} source={BABadges[badge]} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
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
    alignItems: "center",
    justifyContent: "center",
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
  badgePic: {
    width: "100%",
    height: "100%",
    borderRadius: 500,
    alignSelf: "center",
    transform: [{ rotate: "-45deg" }],
    // margin: 12
  },
  badge: {
    width: "60%",
    aspectRatio: 1 / 1,
    borderRadius: 10,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    right: -10,
    bottom: -10,
    justifyContent: "center",
    shadowRadius: 5,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
});
