import { StyleSheet, View, StatusBar, Alert, Dimensions } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import { useState } from "react";
import BAView from "../components/BAView";
import axios from "axios";
import React from "react";
import BASubView from "../components/BASubView";
import BASignUpView from "./BASignUpView";
import BAPasswordCreationView from "./BAPasswordCreationView";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WelcomeProps = {
  setLoggedUser: (data: any) => void;
};

export default function LogIn({ setLoggedUser }: WelcomeProps) {
  const [isInRegisterPage, setIsInRegisterPage] = useState(false);
  const [isInPasswordPage, setIsInPasswordPage] = useState(false);
  const [email, setTextEmail] = useState("");
  const [contraseña, setTextContraseña] = useState("");

  const [user, setUser] = useState("");
  const [birthday, setBirthday] = useState("");

  const userLogin = async () => {
    axios
      .post("https://banco-alimentos-api.vercel.app/userLogin", {
        username: email,
        password: contraseña,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.status == 200) {
          setLoggedUser(response.data);
          AsyncStorage.setItem("sessionToken", response.data.user.sessionToken);
          console.log("Usuario logeado");
        } else {
          console.log("Usuario no logeado");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <BAView isScrolling={false} title="" style={styles.container}>
        <BAText type={TypeText.label3}>Bienvenido! </BAText>
        <BAText type={TypeText.label4}>PioPio</BAText>
        <BAText type={TypeText.label1} style={styles.centerEmail}>
          Email:
        </BAText>
        <BATextInput
          placeholder="Email"
          icon={BAIcons.SMSIcon}
          value={email}
          onChange={setTextEmail}
        />
        <BAText style={styles.center}>Contraseña:</BAText>
        <BATextInput
          placeholder="Contraseña"
          icon={BAIcons.LockIcon}
          value={contraseña}
          onChange={setTextContraseña}
          isPassword={true}
        />

        <View style={styles.containerInline}>
          <BAText type={TypeText.label3}>Aun no tienes cuenta?</BAText>
          <BAText
            type={TypeText.label5}
            onPress={() => setIsInRegisterPage(true)}
          >
            {" Registrate aqui!"}
          </BAText>
        </View>

        <BAButton
          text="Log in"
          state={ButtonState.alert}
          onPress={() => userLogin()}
        />
      </BAView>
      <BASubView
        title="Registrate aqui!"
        isOpen={isInRegisterPage}
        isScrolling={false}
        onReturn={() => setIsInRegisterPage(false)}
      >
        <BASignUpView
          setIsInPasswordPage={setIsInPasswordPage}
          setUserRoot={setUser}
          serEmailRoot={setTextEmail}
          setBirthDateRoot={setBirthday}
        />
      </BASubView>
      <BASubView
        title="Contraseña"
        isOpen={isInPasswordPage}
        isScrolling={false}
        onReturn={() => setIsInPasswordPage(false)}
      >
        <BAPasswordCreationView
          username={user}
          email={email}
          name={user}
          setIsInBirdPage={() => {}}
          setLoggedUser={setLoggedUser}
        />
      </BASubView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    alignItems: "center",
    height: Dimensions.get("window").height,
    paddingVertical: 60,
    gap: 20,
    paddingHorizontal: 20,
  },
  containerInline: {
    flexDirection: "row",
    marginBottom: 30,
  },
  center: {
    width: "100%",
  },
  centerEmail: {
    width: "100%",
    marginTop: 30,
  },
  icon: {
    marginLeft: 10,
  },
});
