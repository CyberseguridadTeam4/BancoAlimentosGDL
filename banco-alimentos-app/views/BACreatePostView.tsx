import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BASubView from "../components/BASubView";
import BAPallete from "../resources/BAPallete";
import { useModal } from "../components/Modal/BAModalContext";
import BAIcons from "../resources/icons/BAIcons";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";


export default function BACreatePostView() {
  const birdData = null;

  return <BABirdName />;
}

function BABirdName() {
  const [name, setName] = useState("");
  const [nextPage, setNextPage] = useState(false);

  const { openModal } = useModal();

  const nextButtonHandler = () => {
    if (name.length == 0) {
      openModal(
        <BAText>¡No olvides ponerle nombre a tu mascota!</BAText>,
        "Datos faltantes"
      );
      return;
    }
    setNextPage(true);
  };

  return (
    <>
      <BAView title="" style={styles.nameViewContainer}>
        <BAText style={styles.titleText}>¡Nombra a tu nueva mascota!</BAText>
        <BATextInput value={name} onChange={setName} placeholder="Nombre" />
        <BAButton
          text="Siguiente"
          state={ButtonState.alert}
          onPress={() => nextButtonHandler()}
        />
      </BAView>
      <BASubView
        title=""
        isOpen={nextPage}
        onReturn={() => setNextPage(false)}
        style={styles.colorsView}
        isScrolling={false}
      >
        <BABirdColor />
      </BASubView>
    </>
  );
}

function BABirdColor() {
  const [colorSelected, setColorSelected] = useState(BAPallete.SoftRed);
  const BIRD_COLORS = [
    [
      BAPallete.SoftRed,
      BAPallete.SoftOrange,
      BAPallete.SoftYellow,
      BAPallete.SoftGreen,
    ],
    [
      BAPallete.SoftSky,
      BAPallete.SoftBlue,
      BAPallete.SoftPurple,
      BAPallete.SoftPink,
    ],
  ];

  const { openModal } = useModal();

  const postButtonHadler = () => {
    openModal(
      <View style={styles.modalConfirmText}>
        <BAText>
          ¿Deseas continuar?, no se podrá realizar ningun cambio después.
        </BAText>
        <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          onPress={() => {}} //Endpoint call
        />
      </View>,
      "Confirmar Datos"
    );
  };

  return (
    <>
        <BAButton
            icon={BAIcons.LockIcon} // SendIcon
            text="Send"
            state={ButtonState.alert}
            onPress={() => postButtonHadler()}
        />
    </>
  );
}



const styles = StyleSheet.create({
  nameViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 75,
  },
  titleText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },

  buttonSelect: {
    position: "absolute",
    borderColor: BAPallete.Blue01,
    borderWidth: 5,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  modalConfirmText: {
    gap: 25,
    justifyContent: "space-between",
  },
  columnPosts: {
    flex: 1,
    gap: 35,
  },
  
});
