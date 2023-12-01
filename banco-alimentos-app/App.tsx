import { StyleSheet, View, StatusBar, Platform, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import BABottomBar from "./components/BABottomBar";
import React from "react";
import BABirdView from "./views/BABirdView";
import BAContextProviderWrapper from "./components/BAContextProviderWrapper";
import BAModalController from "./components/Modal/BAModal";
import BASheetController from "./components/Sheet/BASheet";
import BAPostsView from "./views/BAPostsView";
import BAMapView from "./views/BAMapView";
import BAAccountView from "./views/BAAccountView";
import BAWelcomeView from "./views/BAWelcomeView";
import BASettingsView from "./views/BASettingsView";
import BALoading from "./components/Loading/BALoading";
import { BirdProvider } from "./components/BABirdContext";
import { UserProvider, useUser } from "./components/BAUserContext";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | string
  >();
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export function AppContent() {
  const [viewIndex, setViewIndex] = useState(2);

  const { userData } = useUser();
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
      </BAContextProviderWrapper>
    </View>
  );
}

type ViewSwitchProps = {
  viewIndex: number;
};

const ViewSwitch = ({ viewIndex }: ViewSwitchProps) => {
  switch (viewIndex) {
    case 0:
      return <BAPostsView />;
    case 1:
      return <BAMapView />;
    case 2:
      return <BABirdView schedulePushNotification={schedulePushNotification} />;
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

export async function schedulePushNotification(name: string) {
  const DAY_SECONDS = 10;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${name} te extraña :(`,
      body: "Interactua con usuarios para obtener comida y alimentar a tu pajarito",
    },
    trigger: { seconds: DAY_SECONDS },
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${name} te extraña :(`,
      body: "Interactua con usuarios para obtener comida y alimentar a tu pajarito",
    },
    trigger: { seconds: DAY_SECONDS * 2 },
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${name} te extraña :(`,
      body: "Interactua con usuarios para obtener comida y alimentar a tu pajarito",
    },
    trigger: { seconds: DAY_SECONDS * 3 },
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${name} te extraña :(`,
      body: "Interactua con usuarios para obtener comida y alimentar a tu pajarito",
    },
    trigger: { seconds: DAY_SECONDS * 4 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const { data: tokenId } = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });

    token = tokenId;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
