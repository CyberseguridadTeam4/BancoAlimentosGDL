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

export default function App() {
  const [loggedUser, setLoggedUser] = useState<UserProps | null>(null);
  const [viewIndex, setViewIndex] = useState(2);

  useEffect(() => {
    (async () => {
      const sessionToken = await AsyncStorage.getItem("sessionToken");

      if (sessionToken != null) {
        await axios
          .get(`/authSessionToken/${sessionToken}`)
          .then((res): any => {
            setLoggedUser(res.data);
            axios.defaults.headers.common["Authorization"] = sessionToken;
          })
          .catch((error): any => {
            console.log(error);
          });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <BAContextProviderWrapper>
        <StatusBar barStyle={"dark-content"} />
        {loggedUser ? (
          <BirdProvider birdPointer={loggedUser.user.pollo}>
            <ViewSwitch
              viewIndex={viewIndex}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
            <BALoading />
            <BABottomBar viewIndex={viewIndex} setViewIndex={setViewIndex} />
          </BirdProvider>
        ) : (
          <>
            <BALoading />
            <BAWelcomeView setLoggedUser={setLoggedUser} />
          </>
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
  loggedUser: UserProps;
  setLoggedUser: (data: any) => void;
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
      return (
        <BABirdView
          birdPointer={loggedUser.user.pollo}
          username={loggedUser.user.username}
        />
      );
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
