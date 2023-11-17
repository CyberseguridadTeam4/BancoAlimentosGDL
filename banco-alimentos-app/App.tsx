import { StyleSheet, View, StatusBar } from "react-native";
import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "./axios";
import BASettingsView from "./views/BASettingsView";
import BALoading from "./components/Loading/BALoading";
import { BirdProvider } from "./components/BABirdContext";
import { UserProvider, useUser } from "./components/BAUserContext";

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export function AppContent() {
  const [viewIndex, setViewIndex] = useState(2);

  const { getData, userData } = useUser();

  useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <BAContextProviderWrapper>
        <StatusBar barStyle={"dark-content"} />
        {userData.objectId != "" ? (
          <BirdProvider birdPointer={userData.pollo}>
            <ViewSwitch viewIndex={viewIndex} />
            <BALoading />
            <BABottomBar viewIndex={viewIndex} setViewIndex={setViewIndex} />
          </BirdProvider>
        ) : (
          <>
            <BALoading />
            <BAWelcomeView />
          </>
        )}
        <BASheetController />
        <BAModalController />
        <BAToastController />
      </BAContextProviderWrapper>
    </View>
  );
}

type ViewSwitchProps = {
  viewIndex: number;
};

type UserProps = {
  user: {
    username: string;
    badges: [];
    email: string;
    idProfilePicture: number;
    visBadge: number;
    pollo: any;
    createdAt: string;
    updatedAt: string;
    ACL: any;
    sessionToken: string;
    objectId: string;
  };
};

const ViewSwitch = ({ viewIndex }: ViewSwitchProps) => {
  switch (viewIndex) {
    case 0:
      return <BAPostsView />;
    case 1:
      return <BAMapView />;
    case 2:
      return <BABirdView />;
    case 3:
      return <BAAccountView />;
    case 4:
      return <BASettingsView />;
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
