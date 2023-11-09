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
import BAMapView from "./views/BAMapView";
import BAAccountView from "./views/BAAccountView";
import BAWelcomeView from "./views/BAWelcomeView";

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [viewIndex, setViewIndex] = useState(1);

  return (
    <View style={styles.container}>
      <BAContextProviderWrapper>
        <StatusBar barStyle={"dark-content"} />
        {loggedUser ? (
          <>
            <ViewSwitch viewIndex={viewIndex} loggedUser={loggedUser} />
            <BABottomBar setViewIndex={setViewIndex} />
          </>
        ) : (
          <BAWelcomeView setLoggedUser={setLoggedUser} />
        )}
        <BAModalController />
        <BASheetController />
        <BAToastController />
      </BAContextProviderWrapper>
    </View>
  );
}

const ViewSwitch = ({ viewIndex, loggedUser }) => {
  switch (viewIndex) {
    case 0:
      return <BAPostsView userData={loggedUser} />;
    case 1:
      return <BAMapView />;
    case 2:
      return <BABirdView />;
    case 3:
      return <BAAccountView userData={loggedUser} />;
    default:
      return <BABirdView />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    paddingTop: 20,
  },
});
