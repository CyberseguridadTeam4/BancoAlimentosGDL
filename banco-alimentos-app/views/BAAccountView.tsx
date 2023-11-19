import { StyleSheet, View, Image , FlatList, Dimensions, TouchableOpacity} from "react-native";
import React, { useState, useRef } from "react";
import BAView from "../components/BAView";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText";
import BAButton, { ButtonState } from "../components/BAButton";
import BAProfilePic from "../components/BAProfilePic";
import BABadgesView from "./BABadgesView";
import BAPallete from "../resources/BAPallete";
import BAProfilePictures from "../assets/profilePictures/BAProfilePictures";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isProfilePicOpen, setIsProfilePicOpen] = useState(false);

  const date = new Date(userData.createdAt);
  const EditProfileButton = () => {
    return (
      <TouchableOpacity
          style={{ marginRight: 5 }}
          onPress={() =>
            {setIsProfilePicOpen(true)}
          }
        >
        <BAIcon icon={BAIcons.EditIcon} color={BAPallete.Red01} size={"large"} />
        </TouchableOpacity>
    );
  };

  return (
    <>
      <BAView 
        title={"Perfil"} 
        style={styles.body} 
        isScrolling={true}
        rightButtons={EditProfileButton()}
        >
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
      {isProfilePicOpen && (
        <ProfilePictures 
          isOpen={isProfilePicOpen}
          setIsOpen={setIsProfilePicOpen}
        />
      )}
      
    </>
  );
}

type ColorButtonProps = {
  color: string;
  colorSelected: string;
  onClick: () => void;
};

const ProfilePictures = ({isOpen = false,
  setIsOpen}: {isOpen: boolean;
    setIsOpen: (value: boolean) => void;}) => {
  const [colorSelected, setColorSelected] = useState(BAPallete.SoftRed);
  const [color, setColor] = useState(0);
  const [picture, setPicture] = useState(0);
  const pictureColors = [
      BAPallete.SoftRed,
      BAPallete.SoftOrange,
      BAPallete.SoftYellow,
      BAPallete.SoftGreen,
      BAPallete.SoftSky,
      BAPallete.SoftBlue,
      BAPallete.SoftPurple,
      BAPallete.SoftPink,
  ];

  const [picSelected, setPicSelected] = useState(BAProfilePictures[0]);
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  const changeProfile = async () => {
    await axios
    .patch(`/changeProfile/`,{
      colorProfilePicture: color.toString,
      idProfilePicture: picture,
    })
    .then((res) => {
    })
  }
  return (
    <>
    <BASubView title="Editar foto de perfil" isOpen={isOpen} onReturn={setIsOpen}>
    <BAText style = {{paddingBottom: 20}}> Selecciona una foto de perfil</BAText>
    <FlatList
      ref={flatListRef}
      data={BAProfilePictures}
      renderItem={({ item, index }) => (
        <TouchableOpacity
        onPress={() => {
          setPicSelected(item);
          setPicture(index);
        }}
        style={{
          width: width / 3.5,
          justifyContent: 'center',
          alignItems: 'center', 
          paddingTop: 5,
          paddingBottom:5,
          marginRight: item === BAProfilePictures[15] ? 40 : 0, 
          borderColor: BAPallete.Blue01,
          borderRadius: 10,
          borderWidth: item === picSelected ? 5: 0, 
        }}
        >
           <Image 
            source={ item }
            style={{ 
              width: '100%', 
              height: 100, 
              tintColor: item === picSelected ? colorSelected : BAPallete.Gray01,
            }} 
            resizeMode="contain"
            />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ width: width }}
      />
    
     <View style={styles.colorColumn}>
     <BAText>Elige el color</BAText>
     <FlatList
        data={pictureColors.flat()}
        renderItem={({ item, index }) => (
          <View style = {{marginBottom: 20, paddingRight:20}}>
          <ColorButton
            key={item}
            color={item}
            colorSelected={colorSelected}
            onClick={() => {
              setColor(index > 0 ? index + 3 : index);
              setColorSelected(item);
            }}
          />
          </View>
        )}
        keyExtractor={(item) => item}
        numColumns={4} 
        contentContainerStyle={{marginLeft: 10}}
        scrollEnabled={false} 
      />
     </View>
     <BAButton 
        onPress={() => {
          changeProfile();
          setIsOpen(false);
        }}
        text = "Guardar"
        state={ButtonState.alert}
        />
    </BASubView>
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
  colorColumn: {
    flexDirection: "column",
    gap: 30,
    marginVertical: 30,
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
