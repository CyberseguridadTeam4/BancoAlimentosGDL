import { View, StyleSheet } from "react-native";
import { Image } from "react-native";
import React, { Component, useState } from "react";
import BAView from "../components/BAView";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import { useSheet } from "../components/Sheet/BASheetContext";
import { useModal } from "../components/Modal/BAModalContext";
import BATextInput from "../components/BATextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emptyUser, useUser } from "../components/BAUserContext";
import BAPallete from "../resources/BAPallete";
import axios from "../axios";

export default function BASettingsView() {
  const { openSheet } = useSheet();
  const { openModal } = useModal();

  return (
    <BAView title="Configuración" style={styles.body}>
      <View style={styles.buttonsWrapper}>
        <BAButton
          text="Términos y Condiciones"
          onPress={() => openSheet(<></>, "Terminos y Condiciones")}
        />
        <BAButton
          text="Cerrar Sesión"
          onPress={() => openModal(<LogOutModal />, "Confirmar")}
        />
      </View>
      <BAButton
        text="Eliminar Cuenta"
        state={ButtonState.alert}
        onPress={() => openModal(<DeleteAccountModal />, "Eliminar cuenta")}
        style={{ marginVertical: 20 }}
      />
      <Image
        source={require("../assets/AppIcon.png")}
        style={styles.imageStyle}
      />
      <Image
        source={require("../assets/BALogo.png")}
        style={styles.imageStyle}
      />
      <View style={styles.membersWrapper}>
        <BAText style={{ marginBottom: 10 }}>Equipo:</BAText>
        <BAText>Mariana Esquivel Hernandez</BAText>
        <BAText>Javier Eric Garza Hernandez</BAText>
        <BAText>Mariana Bustos Hernandez</BAText>
        <BAText>Israel Vidal Paredes</BAText>
        <BAText>Iker Ochoa Villaseñor</BAText>
      </View>
      <Image
        source={require("../assets/TecIcon.png")}
        style={styles.imageStyle}
      />
    </BAView>
  );
}

const LogOutModal = () => {
  const { closeModal } = useModal();
  const { logOut } = useUser();

  return (
    <View>
      <BAText>¿Estas seguro que quieres cerrar sesión?</BAText>
      <BAButton
        text="Cerrar Sesión"
        onPress={() => {
          logOut();
          closeModal();
        }}
        state={ButtonState.alert}
        style={{ marginTop: 25 }}
      />
    </View>
  );
};

const DeleteAccountModal = () => {
  const { openModal, closeModal } = useModal();

  return (
    <View>
      <BAText style={{ textAlign: "center" }}>
        ¿Estas seguro que quieres eliminar tu cuenta?
      </BAText>
      <BAText
        type={TypeText.label3}
        style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}
      >
        Esta opción no se puede deshacer
      </BAText>
      <BAButton
        text="Confirmar"
        onPress={() => {
          closeModal();
          openModal(<ConfirmDeleteModal />, "Confirmar");
        }}
        state={ButtonState.alert}
        style={{ marginTop: 25 }}
      />
    </View>
  );
};

const ConfirmDeleteModal = () => {
  const { setUser, userData } = useUser();
  const { closeModal } = useModal();
  const [name, setName] = useState("");

  const [showWarning, setShowWarning] = useState(false);

  return (
    <View>
      <BAText style={{ textAlign: "center", marginBottom: 15 }}>
        Escribe tu nombre de usuario para confirmar esta acción
      </BAText>
      <BATextInput value={name} onChange={setName} />
      {showWarning && (
        <BAText
          type={TypeText.label3}
          style={{ color: BAPallete.Red01, textAlign: "center", marginTop: 15 }}
        >
          El texto no coincide con el nombre de usuario
        </BAText>
      )}
      <BAButton
        text="Eliminar"
        onPress={() => {
          if (name != userData.username) {
            setShowWarning(true);
            return;
          }
          (async () => {
            await AsyncStorage.removeItem("sessionToken");
            await axios.get("/deleteUser");
          })();

          setUser(emptyUser);
          closeModal();
        }}
        state={ButtonState.alert}
        style={{ marginTop: 25 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  buttonsWrapper: {
    marginTop: 5,
    marginBottom: 20,
    gap: 20,
  },
  membersWrapper: {
    alignItems: "center",
    marginVertical: 10,
  },
  imageStyle: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  deleteModalText: {
    textAlign: "center",
  },
});
