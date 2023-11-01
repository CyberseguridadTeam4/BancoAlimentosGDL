import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import BASubView from "../components/BASubView";
import BAText, { TypeText }from "../components/BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import BATextInput from "../components/BATextInput";

export default function BACommentsSubView(){
    const [comment, setComment] = useState("");

    return(
        <BASubView title="Posts" isOpen= {true} onReturn= {() => {true}} style={{flex: 1}} isScrolling= {false}>
            <BAText type={TypeText.label1}>Comments</BAText>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: "10%", width: "100%"}}
                contentContainerStyle={{
                flexGrow: 1,
                gap: 35,
                }}
            >
                <View style = {styles.columnComments}>
                    {Array.from({ length: 5 }).map(() => {
                        return   <Comments/>;
                    })}   
                </View>  
            </ScrollView>
            <View style = {styles.input}>
                <BATextInput placeholder="Type your comment" value ={comment} onChange={setComment} ></BATextInput>
            </View>
        </BASubView>
    );
}

const Comments = () => {
    const [likedPost, setLiketPost] = useState(false);

    return(
        <View style={styles.commentsBox}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <View style={styles.profilePic} />
                    <BAText>Name</BAText>
                </View>
                <View style={[styles.row, { gap: 20 }]}> 
                    <TouchableOpacity>
                        <BAIcon
                        icon={BAIcons.FlagIcon}
                        color={BAPallete.Red01}
                        size={IconSize.large}
                        />
                    </TouchableOpacity>
                    <BAText type={TypeText.label3}>10m</BAText>
                </View>
            </View>
            <BAText style={{ marginVertical: 20 }}>Hello World</BAText>
            <View style = {styles.footer}>
                <View style= {[styles.row, {gap: 20}]}>
                    <TouchableOpacity onPress={() => setLiketPost(!likedPost)}>
                        <BAIcon
                        icon={likedPost ? BAIcons.HeartIconActivated : BAIcons.HeartIcon}
                        color={BAPallete.Red01}
                        size={IconSize.large}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
    },
    commentsBox: {
        width: "100%",
        minHeight: 100,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        shadowRadius: 10,
        shadowColor: BAPallete.StrongBlue,
        shadowOpacity: 0.15,
    },
    columnComments: {
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

    },
    input: {
        borderRadius: 10,
        shadowRadius: 15,
        shadowColor: BAPallete.StrongBlue,
        shadowOpacity: 0.15,
        // marginTop: 20,
   
        // bottom: 600,
        //  left: 0,
        
    },
    scrollView: {
        flex: 1,
    }
});