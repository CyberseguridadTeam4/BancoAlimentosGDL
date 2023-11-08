import React, { useState , useCallback} from "react";
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
import { Post } from "../views/BAPostsView";
import axios from "axios";

type CommentProps = {
  comment: {
    text: string,
    userId: {
      __type: string;
      className: string;
      objectId: string;
    };
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
  }
}

export default function BACommentsSubView({userData, post}) {
  const [text, setText] = useState("");

  const publishComment  = useCallback(async (textComment: string)=> {
    await axios
    .post(`https://banco-alimentos-api.vercel.app/comment`, {
      text: textComment,
      userId: userData.user.objectId,
      postId: post.objectId,
    })
    .then((res) => {
      console.log(res);
      console.log(post.objectId);
      console.log(post);
      setText("");
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <BASubView
      title={post.title}
      isOpen={true}
      onReturn={() => {
        true;
      }}
      style={{
        flex: 1,
        height: "100%",
        justifyContent: "space-between",
      }}
      isScrolling={false}
    >
      <Post post={post} />
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
            {Array.from({ length: 2 }).map(() => {
              return <Comment />;
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.input}>
        <View style={{ width: "88%", marginRight: 10 }}>
          <BATextInput
            placeholder="Type your comment"
            value={text}
            onChange = {(e) => {
              setText(e);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
           publishComment(text)
          }}
        >
          <BAIcon
            icon={BAIcons.SendIcon}
            color={BAPallete.Red01}
            size={IconSize.large}
          />
        </TouchableOpacity>
      </View>
    </BASubView>
  );
}

const Comment = () => {
  const [likedPost, setLiketPost] = useState(false);

  return (
    <View style={styles.commentsBox}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.profilePic} />
          <BAText type={TypeText.label3} style={{ fontSize: 18 }}>
            Name
          </BAText>
        </View>
        <View style={[styles.row, { gap: 15 }]}>
          <TouchableOpacity>
            <BAIcon
              icon={BAIcons.FlagIcon}
              color={BAPallete.Red01}
              size={IconSize.medium}
            />
          </TouchableOpacity>
          <BAText type={TypeText.label3} style={{ fontSize: 12 }}>
            10m
          </BAText>
        </View>
      </View>
      <BAText
        style={{ marginVertical: 20, fontSize: 16  }}
      >
        Hello World
      </BAText>
      <View style={styles.footer}>
        <View style={[styles.row, { gap: 15 }]}>
          <TouchableOpacity>
            <BAIcon
              icon={likedPost ? BAIcons.HeartIconActivated : BAIcons.HeartIcon}
              color={BAPallete.Red01}
              size={IconSize.small}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  commentsBox: {
    // width: "100%",
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
});
