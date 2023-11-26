import { 
  Pressable,
  StyleSheet,
  View,
  Platform
} from "react-native";

import BAButton, { ButtonState } from "../components/BAButton";
import BAText, { TypeText } from "../components/BAText";
import BATextInput from "../components/BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import { useState } from "react";
import React from "react";
import { useModal } from "../components/Modal/BAModalContext";
import DateTimePicker from "@react-native-community/datetimepicker"; 

export default function SignUp({
  setIsInPasswordPage,
  setUserRoot,
  serEmailRoot,
  setBirthDateRoot,
}: any) {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState(""); 
  const [dateOfBirth, setDateOfBirth] = useState("");

  const {openModal} = useModal(); 

  const [date, setDate] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);

  const validAge = new Date();
  validAge.setFullYear(validAge.getFullYear() - 18);


  const calculateAge = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
   };   

  function missing () {
    return user === ""  || email === "" || date === null;
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; 
  };

  const dateString = formatDate(date);

  const toggleDatePicker = () => {
    setIsPickerShow(!isPickerShow);
  };

  const onChangeText = (text: string) => {
    const [day, month, year] = text.split('/').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    setDate(selectedDate);  
   }; 

    
   const onChangeValue = (event: any, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setIsPickerShow(Platform.OS === 'ios');
      setDate(currentDate);
      setDateOfBirth(currentDate.toLocaleDateString());
    }

    const showMode = () => {
      setIsPickerShow(true);
    };
   
    


    return (
    <>
      <View style={styles.container}>
        <BAText style={styles.center}>Usuario:</BAText>
        <BATextInput
          placeholder="Usuario"
          icon={BAIcons.PersonIcon}
          value={user}
          onChange={setUser}
        />

        <BAText type={TypeText.label1} style={styles.center}>
          Email:
        </BAText>

        <BATextInput
          placeholder="Email"
          icon={BAIcons.SMSIcon}
          value={email}
          onChange={setEmail}
        />
        <BAText style={styles.center}>Fecha de nacimimento:</BAText>


        {isPickerShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display="default"
            onChange={onChangeValue}
            maximumDate={validAge}
          />
        )}

        <Pressable style={styles.pressable}        
        onPress={() => {
          toggleDatePicker();
        }}
        >
          <BATextInput
            placeholder={dateOfBirth || "dd/mm/yyyy"}
            icon={BAIcons.BirdIcon}
            value={dateOfBirth}
            onChange={(text) => setDateOfBirth(text)}
            editable={false}
          />
        </Pressable>



          {missing() ? <BAButton
            text="Siguiente"
            state={ButtonState.alert}
            style={styles.centerSiguiente}
            onPress={() => {
              openModal(
                <BAText>Asegurate de escribir correctamente la informacion en todos los campos</BAText>,
                "Campos incompletos"
              )
            }}
          /> : <BAButton
          text="Siguiente"
          state={ButtonState.alert}
          style={styles.centerSiguiente}
          onPress={() => {
            setUserRoot(user);
            serEmailRoot(email);
            setBirthDateRoot(date);
            setIsInPasswordPage(true);
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
    height: "100%",
    gap: 20,
    paddingTop: 20,
  },
  center: {
    width: "100%",
    paddingHorizontal: 30,
  },
  centerSiguiente: {
    marginTop: 150,
  },
  pressable: {
    width: "100%",
    textAlignVertical: "center",
    borderColor: "transparent", // Set to your background color
    borderWidth: 1,
  }
});
