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

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [viewIndex, setViewIndex] = useState(2);

  useEffect(() => {
    (async () => {
      const sessionToken = await AsyncStorage.getItem("sessionToken");

      if (sessionToken != null) {
        await axios
          .get(
            `https://banco-alimentos-api.vercel.app/authSessionToken/${sessionToken}`
          )
          .then((res): any => {
            setLoggedUser(res.data);
          });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <BAContextProviderWrapper>
        <StatusBar barStyle={"dark-content"} />
        {loggedUser ? (
          <>
            <ViewSwitch
              viewIndex={viewIndex}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
            <BABottomBar viewIndex={viewIndex} setViewIndex={setViewIndex} />
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

type ViewSwitchProps = {
  viewIndex: number;
  loggedUser: {};
  setLoggedUser: (data: any) => void;
};

const ViewSwitch = ({
  viewIndex,
  loggedUser,
  setLoggedUser,
}: ViewSwitchProps) => {
  switch (viewIndex) {
    case 0:
      return <BAPostsView userData={loggedUser} />;
    case 1:
      return <BAMapView />;
    case 2:
      return <BABirdView />;
    case 3:
      return <BAAccountView />;
    case 4:
      return (
        <BASettingsView userData={loggedUser} setUserData={setLoggedUser} />
      );
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
