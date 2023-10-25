import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import BAIcons from "../resources/icons/BAIcons";
import { IconSize,  } from "../resources/icons/BAIcon";

export default function BAMapView(){
    const [place, setPlace] = useState("");
    return (
        <BAView title="Map" isScrolling={true}>
            <View style={styles.buttonContainer}>
                <View style={styles.inputContainer}>
                    <BATextInput value={place} onChange={setPlace} placeholder="Find place..."/> 
                </View> 
                <BAButton onPress={() =>{}} icon={BAIcons.SearchIcon} iconSize={IconSize.large} style={styles.buttons} />
            </View>
        </BAView>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        marginLeft:  20,
        aspectRatio: 1 / 1,
      },
      buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      inputContainer: {
        width: "80%",
        height: "100%",
      }
});