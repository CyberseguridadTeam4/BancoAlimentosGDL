import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import BAButton, { ButtonState } from "./BAButton";
import BAText, { TypeText } from "./BAText";
import BATextInput from "./BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import BADropdownMenu from "./BADropdown";
import { useState } from "react";
import BABottomBar from "./BABottomBar";
import BAView from "./BAView";
import React from "react";
import BABird from "./BABird";
import BASubView from "./BASubView";
import BABirdView from "../views/BABirdView";
// import PassMeter from "react-native-passmeter";
// import zxcvbn from 'zxcvbn';

export default function SignUp({ setIsInBirdPage }: any) {
  const [nextPage, setNextPage] = useState(false);
  // const [isInBirdPage, setIsInBirdPage] = useState(false);
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
          isShadowed={true}
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
          isShadowed={true}
          isPassword={true}
        />
        {/* <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          style={styles.centerConfirmar}
          onPress={() => setNextPage(true)}
        /> */}

        <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          style={styles.centerConfirmar}
          onPress={() => setIsInBirdPage(true)}
          
        />

      </View>

      {/* <BASubView
        title="Bird!"
        isOpen={isInBirdPage}
        isScrolling={false}
        onReturn={() => isInPasswordPage(false)}
      >
        <BABirdView setIsInPasswordPage={setIsInPasswordPage} />
      </BASubView> */}
      
      {/* <BASubView
        title="Regresa"
        isOpen={nextPage}
        onReturn={() => setNextPage(false)}
      >
        <BABird />
      </BASubView> */}
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
    paddingHorizontal: 10,
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
