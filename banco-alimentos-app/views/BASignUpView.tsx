import { StyleSheet, View } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import { useState } from "react";
import React from "react";

export default function SignUp({
  setIsInPasswordPage,
  setUserRoot,
  serEmailRoot,
  setBirthDateRoot,
}: any) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  return (
    <>
      <View style={styles.container}>
        <BAText style={styles.center}>Usuario:</BAText>
        <BATextInput
          placeholder="Usuario"
          icon={BAIcons.PersonIcon}
          value={user}
          onChange={setUser}
        />
        <BAText type={TypeText.label1} style={styles.center}>
          Email:
        </BAText>
        <BATextInput
          placeholder="Email"
          icon={BAIcons.SMSIcon}
          value={email}
          onChange={setEmail}
        />
        <BAText style={styles.center}>Fecha de nacimimento:</BAText>
        <BATextInput
          placeholder="00/00/0000"
          icon={BAIcons.BirdIcon}
          value={birthDate}
          onChange={setBirthDate}
        />
        <BAButton
          text="Siguiente"
          state={ButtonState.alert}
          style={styles.centerSiguiente}
          onPress={() => {
            setUserRoot(user);
            serEmailRoot(email);
            setBirthDateRoot(birthDate);
            setIsInPasswordPage(true);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    alignItems: "center",
    height: "100%",
    gap: 20,
    paddingTop: 20,
  },
  center: {
    width: "100%",
    paddingHorizontal: 30,
  },
  centerSiguiente: {
    marginTop: 150,
  },
});