import { StyleSheet, View, Image, Alert } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import { useEffect, useState } from "react";
import BAView from "../components/BAView";
import React from "react";
import BASubView from "../components/BASubView";
import BASignUpView from "./BASignUpView";
import BAPasswordCreationView from "./BAPasswordCreationView";
import { useUser } from "../components/BAUserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import { useModal } from "../components/Modal/BAModalContext";

export default function LogIn() {
  const [isInRegisterPage, setIsInRegisterPage] = useState(false);
  const [isInPasswordPage, setIsInPasswordPage] = useState(false);
  const [email, setTextEmail] = useState("");
  const [contraseña, setTextContraseña] = useState("");

  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");

  const { openModal } = useModal();
  const { setUser } = useUser();

  const userLogin = async () => {
    if (email == "" || contraseña == "") {
      openModal(
        <BAText>Asegurate de hayas escrito tu usuario y contraseña.</BAText>,
        "Campos vacios"
      );
    } else {
      axios
        .post("/userLogin", {
          username: email,
          password: contraseña,
        })
        .then(function (response) {
          if (response.status == 200) {
            setUser(response.data.user);
            AsyncStorage.setItem(
              "sessionToken",
              response.data.user.sessionToken
            );
            axios.defaults.headers.common["Authorization"] =
              response.data.user.sessionToken;
          } else {
            openModal(
              <BAText>
                Asegurate de que tu contraseña o correo esten escritos
                correctamente. Y que tu correo ya este verificado en el email
                que se te envio.
              </BAText>,
              "Ops!!! Hubo un error"
            );
          }
        })
        .catch(function (error) {
          openModal(
            <BAText>
              Asegurate de que tu contraseña o correo esten escritos
              correctamente. Y que tu correo ya este verificado en el email que
              se te envio.
            </BAText>,
            "Ops!!! Hubo un error"
          );
          console.log(error);
        });
    }
  };

  const resetPassword = async () => {
    axios
      .post("/resetPassword", {
        email: email,
      })
      .then(function (response) {
        if (response.status == 200) {
          openModal(<BAText>{email}</BAText>, "Se ha enviado un correo a:");
        } else {
          openModal(
            <BAText>Verifica que tu email este bien escrito.</BAText>,
            "Ops!!! Hubo un error"
          );
        }
      })
      .catch(function (error) {
        console.error(error);
        openModal(
          <BAText>Escribe el correo de tu cuenta!</BAText>,
          "Ops!!! Hubo un error"
        );
      });
  };

  return (
    <>
      <BAView isScrolling={false} title="" style={styles.container}>
        <BAText type={TypeText.label3}>Bienvenido! </BAText>
        <BAText type={TypeText.label4} style={{ marginBottom: 10 }}>
          PioPio
        </BAText>
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

        <View style={styles.containerInline}>
          <BAText type={TypeText.label3}>Olvidaste tu contraseña?</BAText>
          <BAText type={TypeText.label5} onPress={() => resetPassword()}>
            {" Recuperar"}
          </BAText>
        </View>

        <Image
          source={require("../resources/icons/BAMXLogo.png")}
          style={styles.image}
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
          setUserRoot={setUsername}
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
          username={username}
          email={email}
          name={username}
          setIsInBirdPage={() => {}}
          setIsInRegisterPage={setIsInRegisterPage}
          setIsInPasswordPage={setIsInPasswordPage}
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
    gap: 10,
    paddingHorizontal: 20,
  },
  containerInline: {
    flexDirection: "row",
    marginBottom: 20,
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
    width: 200,
    resizeMode: "contain",
  },
});

function openModal(arg0: React.JSX.Element, arg1: string) {
  throw new Error("Function not implemented.");
}
