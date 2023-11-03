import { StyleSheet, Text, View, Dimensions } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import { useState } from "react";
import React from "react";

export default function SignUp({ setIsInBirdPage }: any) {
  const [nextPage, setNextPage] = useState(false);
  const [isInPasswordPage, setIsInPasswordPage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  return (
    <>
      <View style={styles.container}>
        <BAText style={styles.center}>Contraseña:</BAText>
        <BATextInput
          placeholder="Contraseña"
          icon={BAIcons.PersonIcon}
          value={text}
          onChange={setText}
          isPassword={true}
        />
        <BAText type={TypeText.label1} style={styles.center}>
          Confirmar contraseña:
        </BAText>
        <BATextInput
          placeholder="Contraseña"
          icon={BAIcons.SMSIcon}
          value={text2}
          onChange={setText2}
          isPassword={true}
        />

        <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          style={styles.centerConfirmar}
          onPress={() => setIsInBirdPage(true)}
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
    height: Dimensions.get("window").height,
    gap: 20,
    paddingTop: 20,
  },
  center: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 30,
  },
  centerConfirmar: {
    marginTop: 60,
  },
});
