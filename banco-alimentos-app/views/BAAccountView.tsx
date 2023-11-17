import { StyleSheet, View, Image , FlatList, Dimensions} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import BAView from "../components/BAView";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText";
import BAButton, { ButtonState } from "../components/BAButton";
import BAProfilePic from "../components/BAProfilePic";
import BABadgesView from "./BABadgesView";
import BAPallete from "../resources/BAPallete";
import BAProfilePictures from "../assets/profilePictures/BAProfilePictures";

type UserProps = {
  userData: {
    username: string;
    badges: [];
    email: string;
    idProfilePicture: number;
    visBadge: number;
    pollo: any;
    createdAt: string;
    updatedAt: string;
    ACL: any;
    sessionToken: string;
    objectId: string;
  };
  setUserData: (data: any) => void;
};

export default function BAAcount({ userData, setUserData }: UserProps) {
  const [subpage, setSubpage] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

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
          setUserData={setUserData}
          isOpen={isBadgesOpen}
          setIsOpen={setIsBadgesOpen}
          badges={userData.badges}
        />
      )}
      <BASubView title="Editar foto de perfil" isOpen={true} onReturn={setSubpage}>
        <BAText>Selecciona una foto de perfil</BAText>
        <ProfilePictures />
        <BAButton 
        onPress={() => {}}
        text = "Guardar"
        state={ButtonState.alert}
        />
      </BASubView>
    </>
  );
}

type ColorButtonProps = {
  color: string;
  colorSelected: string;
  onClick: () => void;
};

const ProfilePictures = () => {
  const [colorSelected, setColorSelected] = useState(BAPallete.SoftRed);
  const [color, setColor] = useState(0);
  const pictureColors = [
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

  const [picSelected, setPicSelected] = useState(BAProfilePictures[0]);
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  const handleViewableItemsChanged = useRef(({ viewableItems }:any) => {
    if (viewableItems.length > 0) {
    const selectedIndex = Math.floor(viewableItems.length / 2);
    setPicSelected(viewableItems[selectedIndex].item);
    }
    }).current;

  return (
    <>
    <FlatList
      ref={flatListRef}
      data={BAProfilePictures}
      renderItem={({ item }) => (
        <View
        style={{
          width: width / 3.5,
          justifyContent: 'center',
          alignItems: 'center', 
          paddingTop: 20,
          
        }}
        >
           <Image 
            source={ item }
            style={{ width: '100%', height: 100, tintColor: item === picSelected ? colorSelected : 'black' }} 
            resizeMode="contain"
            />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ width: width }}
      onViewableItemsChanged={handleViewableItemsChanged}
      />
    
     <View style={styles.colorColumn}>
     <BAText>Elige el color</BAText>
      { pictureColors.map((colorsRow, i) => {
        return(
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
    </>
  );
};

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
});
