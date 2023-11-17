import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import BAView from "../components/BAView";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText";
import BAButton, { ButtonState } from "../components/BAButton";
import BAProfilePic from "../components/BAProfilePic";
import BABadgesView from "./BABadgesView";
import { useUser } from "../components/BAUserContext";

export default function BAAcount() {
  const [subpage, setSubpage] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  const { userData, setUserData } = useUser();

  const date = new Date(userData.createdAt);

  return (
    <>
      <BAView title={"Perfil"} style={styles.body} isScrolling={true}>
        <BAProfilePic user={userData} />
        <BAText style={{ marginBottom: 20, width: "100%" }}>
          {userData.username}
        </BAText>
        <BAButton
          style={styles.button}
          text="Mis insignias"
          onPress={() => {
            setIsBadgesOpen(true);
          }}
          state={ButtonState.alert}
        />
        <View style={styles.textContainer}>
          <BAText type={TypeText.label3}>Estas registrado como:</BAText>
          <BAText>{userData.email}</BAText>
          <BAText type={TypeText.label3}>Fecha de registro:</BAText>
          <BAText>{date.toLocaleDateString("es-ES")}</BAText>
        </View>
      </BAView>
      {isBadgesOpen && (
        <BABadgesView
          isOpen={isBadgesOpen}
          setIsOpen={setIsBadgesOpen}
          badges={userData.badges}
        />
      )}
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
    paddingHorizontal: 20,
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
