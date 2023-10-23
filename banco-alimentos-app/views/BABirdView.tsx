import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BASubView from "../components/BASubView";
import BAPallete from "../resources/BAPallete";
import { useModal } from "../components/Modal/BAModalContext";

export default function BABirdView() {
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

  const adoptButtonHadler = () => {
    openModal(
      <View style={styles.modalConfirmText}>
        <BAText>
          ¿Deseas continuar?, no se podrá realizar ningun cambio después.
        </BAText>
        <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          onPress={() => {}}
        />
      </View>,
      "Confirmar Datos"
    );
  };

  return (
    <>
      <BAText style={styles.titleText}>
        ¡Escoge un color para tu mascota!
      </BAText>
      <View style={styles.colorColumn}>
        {BIRD_COLORS.map((colorsRow, i) => {
          return (
            <View style={styles.colorRow} key={i}>
              {colorsRow.map((color) => {
                return (
                  <ColorButton
                    key={color}
                    color={color}
                    colorSelected={colorSelected}
                    onClick={() => setColorSelected(color)}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
      <BAButton
        text="¡Adoptar!"
        state={ButtonState.alert}
        onPress={() => adoptButtonHadler()}
      />
    </>
  );
}

const ColorButton = ({ color, colorSelected, onClick }) => {
  return (
    <View style={{ aspectRatio: 1 / 1, width: 65 }}>
      <BAButton
        key={color}
        onPress={onClick}
        style={{
          backgroundColor: color,
          width: "100%",
          height: "100%",
        }}
      />
      {colorSelected == color && <View style={styles.buttonSelect} />}
    </View>
  );
};

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
  colorsView: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorColumn: {
    flexDirection: "column",
    gap: 30,
    marginVertical: 50,
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
});
