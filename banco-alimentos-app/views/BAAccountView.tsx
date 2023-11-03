import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import BAView from "../components/BAView";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText";
import BAButton, { ButtonState } from "../components/BAButton";
import BAProfilePic from "../components/BAProfilePic";

export default function BAAcount() {
  const [subpage, setSubpage] = useState(false);
  const [user, setUser] = useState(null);

  // const fetchUser = async () => {
  //     try {
  //         const response = await fetch('/user');
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setUser(data);
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // };

  // useEffect(() => {
  //     fetchUser();
  // }, []);

  return (
    <>
      <BAView title={"Perfil"} style={styles.body} isScrolling={true}>
        <BAProfilePic />
        <BAText style={{ marginBottom: 20, width: "100%" }}>
          Nombre de usuario
        </BAText>
        <BAButton
          style={styles.button}
          text="Mis insignias"
          onPress={() => {}}
          state={ButtonState.alert}
        />
        <View style={styles.textContainer}>
          <BAText type={TypeText.label3}>Estas registrado como:</BAText>
          <BAText>email</BAText>
          <BAText type={TypeText.label3}>Fecha de registro:</BAText>
          <BAText>Fecha</BAText>
        </View>
      </BAView>
      <BASubView title="Editar perfil" isOpen={subpage} onReturn={setSubpage}>
        <BAText>Nombre de usuario</BAText>
      </BASubView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
  },
  textContainer: {
    marginVertical: 20,
    gap: 20,
    flexDirection: "column",
  },
});
