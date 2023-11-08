import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, Dimensions, PixelRatio } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import axios from "axios";
import PasswordMeter from "../components/BAPasswordMeter";
import { useModal } from "../components/Modal/BAModalContext";

export default function SignUp({
  username,
  email,
  name,
  nextStage,
  setLoggedUser,
}: any) {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [seguridad, setSeguridad] = useState(false)

  const { openModal } = useModal();
  const createUser = async () => {
    if (password !== passwordConf) {
      openModal(
        <BAText>Asegurate de que las contraseñas coincidan</BAText>,
        "Contraseñas no coinciden"
      )
      console.log("Las contraseñas no coinciden");
    } else {
      console.log("Crear usuario");
      axios
        .post("https://banco-alimentos-api.vercel.app/userSignUp", {
          username: username,
          password: password,
          email: email,
          name: name,
        })
        .then(function (response) {
          console.log(response);
          setLoggedUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };


  if(seguridad){
    console.log('bien')
  } 
  else{
    console.log("fake")
  }

  return (
    <View style={styles.container}>
      <BAText style={styles.center}>Contraseña:</BAText>
      { <BATextInput
        placeholder="Contraseña"
        icon={BAIcons.PersonIcon}
        value={password}
        onChange={setPassword}
        isPassword={true} // Use secureTextEntry for password input
      /> }
      { <BAText type={TypeText.label1} style={styles.center}>
        Confirmar contraseña:
      </BAText> }
      { <BATextInput
        placeholder="Contraseña"
        icon={BAIcons.SMSIcon}
        value={passwordConf}
        onChange={setPasswordConf}
        isPassword={true} // Use secureTextEntry for password input
      /> }
      <PasswordMeter password={password} confidence={0} setSeguridad={setSeguridad} updatePassword={function (text: string): void {
        throw new Error("Function not implemented.");
      } } />

      {seguridad ? <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          style={styles.centerConfirmar}
          onPress={() => createUser()}
        /> : <BAButton
        text="Siguiente"
        state={ButtonState.alert}
        style={styles.centerSiguiente}
        onPress={() => {
          openModal(
              <BAText>Asegurate de que tu contraseña cumpla con los puntos de seguridad</BAText>,
              "Contraseña insegura"
            )
        }}
      />}

    </View>
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
  centerSiguiente: {
    marginTop: 150,
  },
});
function openSheet(arg0: React.JSX.Element, arg1: string) {
  throw new Error("Function not implemented.");
}

