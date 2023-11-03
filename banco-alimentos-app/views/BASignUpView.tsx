import { StyleSheet, View } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import { useState } from "react";
import React from "react";

export default function SignUp({ setIsInPasswordPage }: any) {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  return (
    <>
      <View style={styles.container}>
        <BAText style={styles.center}>Usuario:</BAText>
        <BATextInput
          placeholder="Usuario"
          icon={BAIcons.PersonIcon}
          value={text}
          onChange={setText}
        />
        <BAText type={TypeText.label1} style={styles.center}>
          Email:
        </BAText>
        <BATextInput
          placeholder="Email"
          icon={BAIcons.SMSIcon}
          value={text2}
          onChange={setText2}
        />
        <BAText style={styles.center}>Fecha de nacimimento:</BAText>
        <BATextInput
          placeholder="00/00/0000"
          icon={BAIcons.BirdIcon}
          value={text3}
          onChange={setText3}
        />
        <BAButton
          text="Siguiente"
          state={ButtonState.alert}
          style={styles.centerSiguiente}
          onPress={() => {
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
