import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./Loading/BALoadingContext";
import axios from "../axios";
import { useToast } from "./Toast/BAToastContext";
import BAText, { TypeText } from "./BAText";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserType = {
  username: string;
  badges: number[];
  email: string;
  idProfilePicture: number;
  colorProfilePicture: number;
  visBadge: number;
  pollo: any;
  createdAt: string;
  updatedAt: string;
  ACL: any;
  sessionToken: string;
  objectId: string;
};

type LogInData = {
  username: string;
  password: string;
};

type SignUpData = {
  username: string;
  password: string;
  email: string;
  name: string;
};

export const emptyUser = {
  username: "",
  badges: [-1],
  email: "",
  idProfilePicture: 0,
  colorProfilePicture: 0,
  visBadge: 0,
  pollo: {},
  createdAt: "",
  updatedAt: "",
  ACL: {},
  sessionToken: "",
  objectId: "",
};

const UserContext = createContext({
  userData: emptyUser,
  setUser: (data: UserType) => {},
  getData: async () => {},
  signUp: (data: SignUpData) => {},
  logIn: (data: LogInData) => {},
  logOut: () => {},
  setBadge: (badgeIndex: number) => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<UserType>(emptyUser);

  const { openLoading, closeLoading } = useLoading();

  var interactions = 0;

  const setUser = (data: UserType) => {
    setUserData(data);
  };

  const getData = async () => {
    const sessionToken = await AsyncStorage.getItem("sessionToken");

    if (sessionToken != null) {
      await axios
        .get(`/authSessionToken/${sessionToken}`)
        .then((res): any => {
          setUser(res.data.user);
          axios.defaults.headers.common["Authorization"] = sessionToken;
        })
        .catch((error): any => {
          console.log(error);
        });
    } else {
      setUser(emptyUser);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const signUp = async (data: SignUpData) => {
    await axios
      .post("/userSignUp", {
        username: data.username,
        password: data.password,
        email: data.email,
        name: data.name,
      })
      .then(function (response) {
        setUser(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logIn = async (data: LogInData) => {
    await axios
      .post("/userLogin", {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        if (response.status == 200) {
          setUser(response.data.user);
          AsyncStorage.setItem("sessionToken", response.data.user.sessionToken);
          axios.defaults.headers.common["Authorization"] =
            response.data.user.sessionToken;
          getData().then((res) => {});
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("sessionToken");
    setUser(emptyUser);
  };

  const setBadge = async (badgeIndex: number) => {
    await axios.patch(`/profileBadge/${badgeIndex}`);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUser,
        getData,
        logIn,
        logOut,
        signUp,
        setBadge,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
