import { StyleSheet, Text, Linking, View, StatusBar, Alert, Dimensions, SafeAreaView, TextInput } from "react-native";
import BAButton, { ButtonState } from "./BAButton";
import BAText, { TypeText } from "./BAText";
import BATextInput from "./BATextInput";
import BAIcons from "../resources/icons/BAIcons";
import BADropdownMenu from "./BADropdown";
import { useState } from "react";
import BABottomBar from "./BABottomBar";
import BAView from "./BAView";
import userLogin from "../../banco-alimentos-api/source/controllers/posts";
import axios from 'axios';
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// import BAModal from '../components/Modal/BAModal'
// import BAModalController from '../components/Modal/BAModal'
// import { useModal } from '../components/Modal/BAModalContext'

// // Inside your component
// const { setModalContent, setModalTitle } = useModal();

// // When you want to show the modal:
// setModalTitle("Your Modal Title");
// setModalContent(
//   // Your modal content JSX
//   <View>
//     <Text>Modal Content Goes Here</Text>
//   </View>
// );

export default function LogIn({}) {
  const [selectedOption, setSelectedOption] = useState("1");
  const [email, setTextEmail] = useState("");
  const [contraseña, setTextContraseña] = useState("");
  const handleButtonPress = () => {
    Alert.alert('Button Pressed');
  };

    // State variable to hold the password 
    const [password, setPassword] = useState(''); 

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false); 

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 


  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />

      <BAText type={TypeText.label3}>Bienvenido! </BAText>
      <BAText type={TypeText.label4}>PioPio</BAText>
      <BAText type={TypeText.label1}style={styles.centerEmail}>Email:</BAText>
      <BATextInput
        placeholder="Email"
        icon={BAIcons.SMSIcon}
        value={email}
        onChange={setTextEmail}
        isShadowed={true}
        />
      <BAText style={styles.center}>Contraseña:</BAText>
      <BATextInput 
        placeholder="Contraseña"
        icon={BAIcons.LockIcon}
        value={contraseña}
        onChange={setTextContraseña}
        isPassword={true}
        isShadowed={true}
        />

        <View style = {styles.containerInline}>
            <BAText type={TypeText.label3}>Aun no tienes cuenta?</BAText>
            <BAText 
            type={TypeText.label5}
            isLink={true}
            onPress={() => {
                console.log("REGISTER VIEW")
            }}
            >
                Registrate aqui!
            </BAText>
        </View>

      <BAButton
        text="Log in"
        onPress={async () => {
          const obj = {email, contraseña}
          const res = await axios.get("https://parse-dashboard.back4app.com/apps/bc56963c-a392-4f24-ac57-f7e4e54ed418/browser/_Session/user");
          console.log(res)
          // Check the response for a successful login
        if (res.status === 200) {
          // Login was successful
          console.log("Login successful");
        //   navigation.navigate('BABird');
          // You can update your app's state here or navigate to another screen.
        } else {
          // Login failed
          console.log("Login failed");
        }
          // You can show an error message to the user.
            }}
        state={ButtonState.alert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    alignItems: "center",
    height: Dimensions.get('window').height,
    paddingVertical: 60,
    gap: 20,
    paddingHorizontal: 20,
  },
  containerInline: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  center: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 30,
  },
  centerEmail: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  icon: { 
    marginLeft: 10, 
    },

});
