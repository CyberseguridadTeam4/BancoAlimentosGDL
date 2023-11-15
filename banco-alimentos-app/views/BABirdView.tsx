import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BASubView from "../components/BASubView";
import BAPallete from "../resources/BAPallete";
import { useModal } from "../components/Modal/BAModalContext";
import axios from "../axios";
import BABird from "../components/BABird";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoading } from "../components/Loading/BALoadingContext";
import { useBird } from "../components/BABirdContext";

type ColorButtonProps = {
  color: string;
  colorSelected: string;
  onClick: () => void;
};

type SetBirdProps = {
  setBirdData: (data: any) => void;
};

type BirdData = {
  pollo: {
    name: string;
    xp: number;
    level: number;
    nApple: number;
    nextStage: number;
    createdAt: string;
    updatedAt: string;
    objectId: string;
  };
};

export default function BABirdView({ birdPointer }: any) {
  const { birdData } = useBird();

  return !birdData ? <BABirdName /> : <BABird birdData={birdData} />;
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
        <BABirdColor name={name} />
      </BASubView>
    </>
  );
}

type ColorSelectionProps = {
  name: string;
};

function BABirdColor({ name }: ColorSelectionProps) {
  const [colorSelected, setColorSelected] = useState(BAPallete.SoftRed);
  const [color, setColor] = useState(0);
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

  const { openModal, closeModal } = useModal();
  const { setBird } = useBird();

  const createPollo = useCallback(async () => {
    console.log(color);
    const sessionToken = await AsyncStorage.getItem("sessionToken");
    await axios
      .post("/pollo", {
        sessionToken,
        name,
        color,
      })
      .then((res): any => {
        closeModal();
        setBird(res.data.pollo);
      });
  }, [color]);

  const adoptButtonHadler = () => {
    openModal(
      <View style={styles.modalConfirmText}>
        <BAText>
          ¿Deseas continuar?, no se podrá realizar ningun cambio después.
        </BAText>
        <BAButton
          text="Confirmar"
          state={ButtonState.alert}
          onPress={() => createPollo()}
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
              {colorsRow.map((color, j) => {
                return (
                  <ColorButton
                    key={color}
                    color={color}
                    colorSelected={colorSelected}
                    onClick={() => {
                      setColor(i > 0 ? j + 4 : j);
                      setColorSelected(color);
                    }}
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

const ColorButton = ({ color, colorSelected, onClick }: ColorButtonProps) => {
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
    paddingHorizontal: 20,
    paddingTop: 50,
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
    paddingBottom: 200,
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
