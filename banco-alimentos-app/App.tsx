import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState } from "react";
import BABottomBar from "./components/BABottomBar";
import React from "react";
import BABirdView from "./views/BABirdView";
import BAContextProviderWrapper from "./components/BAContextProviderWrapper";
import BAModalController from "./components/Modal/BAModal";
import BASheetController from "./components/Sheet/BASheet";
import BAToastController from "./components/Toast/BAToast";
import BAPostsView from "./views/BAPostsView";
import BABird from "./components/BABird";
import BAAcount from "./components/BAAccountView";
import BAWelcomeView from "./components/BAWelcomeView";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [text, setText] = useState("Hello");
  return (
    <View style={styles.container}>
      <BAContextProviderWrapper>
        <StatusBar barStyle={"dark-content"} />
        <BAWelcomeView />
        <BABottomBar />
        <BAModalController />
        <BASheetController />
        <BAToastController />
      </BAContextProviderWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    paddingTop: 20,
  },
});
