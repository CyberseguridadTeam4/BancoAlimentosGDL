import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, PixelRatio, Modal } from "react-native";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import axios from "axios";
import PasswordMeter from "../components/BAPasswordMeter";
import { useModal } from "../components/Modal/BAModalContext";
import Parse from 'parse/react-native';
import BASubView from "../components/BASubView";
import BASignUpView from "./BASignUpView";
import BAWelcomeView from "./BAWelcomeView";
import BAModal from "../components/Modal/BAModal";

export default function SignUp({
  username,
  email,
  name,
  nextStage,
  setLoggedUser, // Fixed prop name
  setIsInRegisterPage,
  setIsInPasswordPage,
  
}: any) {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [seguridad, setSeguridad] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const { openModal } = useModal();

  useEffect(() => {
    // This effect will run when passwordsEntered changes to true
    const showModal = async () => {
      console.log("In useEffect");
      openModal(
        <View>
          <BAText>
            Usuario creado exitosamente.             Por favor confirma tu correo en el email enviado.
          </BAText>
          <BAButton
            text="OK"
            state={ButtonState.alert}
            style={styles.centerConfirmar}
            onPress={() => {
              console.log("IR A LOGIN");
              setIsInPasswordPage(false);
              setIsInRegisterPage(false);
              // closeModal();
            }}
          />
        </View>,
        "Cuenta creada!"
      );
    };

    // Call the function only when passwords have been entered
    if (userCreated) {
      showModal();
    }

  }, [userCreated]); // Dependency array updated


  const createUser = async () => {
    if (password !== passwordConf) {
      openModal(
        <BAText>Asegurate de que las contraseñas coincidan</BAText>,
        "Contraseñas no coinciden"
      )
      console.log("Las contraseñas no coinciden");
    } else {
      console.log("Crear usuario");
      try {
        const response = await axios.post("https://banco-alimentos-api.vercel.app/userSignUp", {
          username: username,
          password: password,
          email: email,
          name: name,
        });
        setUserCreated(true);
        // EMAIL VERIFICATION
        // Set the user as the current user
        const user = await Parse.User.currentAsync();
        if (user) {
          // Call Cloud Function to send email verification
          try {
            await Parse.Cloud.run('sendVerificationEmail');
            console.log('Email verification request sent successfully');
          } catch (error: any) {
            console.log('Error sending email verification request:', error.message);
          }
        }
        setLoggedUser(response.data);
        console.log("LoggedUser")
      } catch (error) {
        console.log(error);
        console.log("FFFFFFFFFFFFFFFFFFFFF");
      }
    }
  };


  return (
    <>
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
            onPress={() => {
              createUser();
            }}
          /> : <BAButton
          text="Confirmar"
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
  centerSiguiente: {
    marginTop: 150,
  },
});

function openSheet(arg0: React.JSX.Element, arg1: string) {
  throw new Error("Function not implemented.");
}


