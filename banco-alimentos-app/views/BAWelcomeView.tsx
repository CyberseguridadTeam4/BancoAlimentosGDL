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

export default function LogIn({}) {
  const [isInRegisterPage, setIsInRegisterPage] = useState(false);
  const [isInPasswordPage, setIsInPasswordPage] = useState(false);
  const [email, setTextEmail] = useState("");
  const [contraseña, setTextContraseña] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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

        <BAButton text="Log in" state={ButtonState.alert} onPress={() => {}} />
      </BAView>
      <BASubView
        title="Registrate aqui!"
        isOpen={isInRegisterPage}
        isScrolling={false}
        onReturn={() => setIsInRegisterPage(false)}
      >
        <BASignUpView setIsInPasswordPage={setIsInPasswordPage} />
      </BASubView>
      <BASubView
        title="Contraseña"
        isOpen={isInPasswordPage}
        isScrolling={false}
        onReturn={() => setIsInPasswordPage(false)}
      >
        <BAPasswordCreationView setIsInBirdPage={() => {}} />
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
