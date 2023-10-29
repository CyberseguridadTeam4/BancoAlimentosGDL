import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import BAButton, { ButtonState } from "./BAButton";
import BAText, { TypeText } from "./BAText";
import BATextInput from "./BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import BADropdownMenu from "./BADropdown";
import { useState } from "react";
import BABottomBar from "./BABottomBar";
import BAView from "./BAView";
import React from "react";

export default function SignUp() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <BAText type={TypeText.label1}> </BAText>
      <BAText type={TypeText.label1}> </BAText>
      <BAText style={styles.center}>Contraseña:</BAText>
      <BATextInput
        placeholder="Contraseña"
        icon={BAIcons.PersonIcon}
        value={text}
        onChange={setText}
        isShadowed={true}
        isPassword={true}
        />
      <BAText type={TypeText.label1}style={styles.center}>Confirmar contraseña:</BAText>
      <BATextInput
        placeholder="Contraseña"
        icon={BAIcons.SMSIcon}
        value={text2}
        onChange={setText2}
        isShadowed={true}
        isPassword={true}
        />
      <BAButton
        text="Confirmar"
        onPress={() => {}}
        state={ButtonState.alert}
        style={styles.centerConfirmar}
      />
    </View>
  );
}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5FF",
        alignItems: "center",
        height: Dimensions.get('window').height,
        gap: 20,
        paddingHorizontal: 20,
    },
    center: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 30,
    },
    centerConfirmar: {
        marginTop: 60,
    },
});
