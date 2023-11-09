import { View, StyleSheet } from "react-native";
import { Image } from "react-native";
import React, { Component } from "react";
import BAView from "../components/BAView";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText from "../components/BAText";

export default class BASettingsView extends Component {
  render() {
    return (
      <BAView title="Configuración" style={styles.body}>
        <View style={styles.buttonsWrapper}>
          <BAButton text="Términos y Condiciones" onPress={() => {}} />
          <BAButton text="Cerrar Sesión" onPress={() => {}} />
        </View>
        <BAButton
          text="Eliminar Cuenta"
          state={ButtonState.alert}
          onPress={() => {}}
          style={{ marginVertical: 20 }}
        />
        <Image
          source={require("../assets/AppIcon.png")}
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
        <Image
          source={require("../assets/BALogo.png")}
          style={styles.imageStyle}
        />
      </BAView>
    );
  }
}

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
});
