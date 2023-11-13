import { StyleSheet, View, StatusBar, Alert, Dimensions, Image } from "react-native";
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

export default function LogIn({ setLoggedUser }) {
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
      .then( function (response) {
        console.log(response);
        if (response.status == 200) {
          setLoggedUser(response.data);
          console.log("Usuario logeado");
        } else {
          console.log("Usuario no logeado");
          openModal(
            <BAText>Asegurate de que tu contraseña o correo esten escritos correctamente. Y que tu correo ya este verificado en el email que se te envio.</BAText>,
            "Ops!!! Hubo un error"
          )
        }
      })
      .catch(function (error) {
        openModal(
            <BAText>Asegurate de que tu contraseña o correo esten escritos correctamente. Y que tu correo ya este verificado en el email que se te envio.</BAText>,
            "Ops!!! Hubo un error"
          )
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

        <Image source={require('../resources/icons/BAMXLogo.png')} style={styles.image} />

        
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

// const tamaño = window.Dimensions.height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    alignItems: "center",
    gap: 19,
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
    marginTop: 10,
  },
  icon: {
    marginLeft: 10,
  },
  image: {
    width:  Dimensions.get("window").width * 0.550,
    height: Dimensions.get("window").height * 0.106,
    marginTop: 10,
  },
});

function openModal(arg0: React.JSX.Element, arg1: string) {
  throw new Error("Function not implemented.");
}

