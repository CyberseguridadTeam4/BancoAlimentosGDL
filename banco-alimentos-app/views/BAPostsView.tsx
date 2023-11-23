import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
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
import BAReportView from "./BAReportView";
import { useUser } from "../components/BAUserContext";
import BAProfilePictures from "../assets/profilePictures/BAProfilePictures";
import { useModal } from "../components/Modal/BAModalContext";


type PostType = {
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

type PostProps = {
  post: {
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
  onClickPost: () => void;
  isReportHide?: boolean;
  isLikeHide?: boolean;
  isShareHide?: boolean;
  updatePost: (newPost: PostType) => void;
};

export default function BAPostsView() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [chosenPost, setChosenPost] = useState<any>(null);

  const { openLoading, closeLoading } = useLoading();
  const { userData } = useUser();
  const index = 0;

  const getPosts = async () => {
    await axios.get(`/getPosts/${index}`).then((res: any) => {
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

  const updatePost = (newPost: PostType) => {
    const postsCopy = posts;
    const postIndex = posts.findIndex(
      (post) => post.objectId == newPost.objectId
    );

    postsCopy[postIndex] = newPost;

    setPosts(postsCopy);
  };

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
              <View key={item.objectId}>
                {!item.reported && (
                  <Post
                    post={item}
                    key={item.objectId}
                    onClickPost={() => {
                      setIsCommentsOpen(true);
                      setChosenPost(item);
                    }}
                    updatePost={updatePost}
                  />
                )}
              </View>
            );
          })}
      </BAView>
      {isCommentsOpen && (
        <BACommentsSubView
          isOpen={isCommentsOpen}
          setIsOpen={setIsCommentsOpen}
          post={chosenPost}
          updatePost={updatePost}
        />
      )}
    </>
  );
}

export const Post = ({
  post,
  onClickPost,
  isReportHide = false,
  isLikeHide = false,
  isShareHide = false,
  updatePost,
}: PostProps) => {
  const [likedPost, setLiketPost] = useState(post.isliked);
  const [postData, setPostData] = useState(post);
  const [isUser, setIsUser] = useState(false);

  const { dispatchInteraction } = useBird();
  const { openSheet, closeSheet } = useSheet();
  const { userData } = useUser();
  const { openModal } = useModal();

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

  useEffect(() => {
    setIsUser(postData.userData[0]== userData.username);
  }, []);

  useEffect(() => {
    setPostData(post);
    setLiketPost(post.isliked);
  }, [post, post.isliked]);

  const likePost = useCallback(async (isLike: boolean) => {
    const postData = post;
    isLike ? (postData.nLikes += 1) : (postData.nLikes -= 1);
    isLike && dispatchInteraction(postData.objectId);
    postData.isliked = isLike;
    updatePost(postData);
    setPostData({ ...postData });
    await axios.patch(`/likePost/${post.objectId}/${isLike ? 1 : -1}`, post);
  }, []);

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

  return (
    <TouchableOpacity style={styles.postBox} onPress={onClickPost}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic}>
            <Image 
            style={{ width: "90%", height: "90%", tintColor:pictureColors[postData.userData[1]]}}
            source={BAProfilePictures[postData.userData[2]]}
            resizeMode="contain"
            />
          </View>
          <BAText type={TypeText.label3} style={{ fontSize: 16 }}>
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
                <DeleteModal objId={post.objectId}/>, 
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
        style={{ marginVertical: 20, fontSize: 18 }}
        type={TypeText.label1}
      >
        {postData.text}
      </BAText>
      <View style={styles.footer}>
        <View style={[styles.row, { gap: 20 }]}>
          <TouchableOpacity onPress={onClickPost}>
            <BAIcon
              icon={BAIcons.ForoIcon}
              color={BAPallete.Red01}
              size={"medium"}
            />
          </TouchableOpacity>

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
    </TouchableOpacity>
  );
};

const CreatePostView = ({ closeSheet }: any) => {
  const [text, setText] = useState("");

  const { userData } = useUser();
  const publishPost = useCallback(async (textPost: string) => {
    
    await axios
      .post(`/post`, {
        text: textPost,
        title: userData.username,
      })
      .then((res) => {
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

const DeleteModal =  ({objId} : any) => {
  const { closeModal } = useModal();
  
  const deletePost = async () => {
    await axios
    .patch(`/deletePost/${objId}`);
  }
  return (
    <View>
      <BAText type={TypeText.label3} style={{ marginBottom: 20 }}>
        ¿Quieres eliminar este post? 
        Esta acción no es reversible
      </BAText>
      <BAButton
        onPress={() => {
          deletePost();
          closeModal();
        }}
        state={ButtonState.alert}
        text="Aceptar"
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
    alignItems: "center",
    justifyContent: "center",
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
