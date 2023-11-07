// PasswordMeter.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, PixelRatio } from 'react-native';
import BAPallete from '../resources/BAPallete';
import BAText, { TypeText } from './BAText';

interface PasswordMeterProps {
  password: string;
  confidence: number;
  updatePassword: (text: string) => void;
  updateValidPassword?: (valid: boolean) => void;
}

const styles = StyleSheet.create({

    wrapper: {
      backgroundColor: BAPallete.White,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 10,
      shadowRadius: 15,
      shadowColor: BAPallete.StrongBlue,
      shadowOpacity: 0.15,
      padding: 10,
    },
    textInput: {
      width: "100%",
      textAlignVertical: "center",
      borderColor: "transparent", 
      borderWidth: 1,
    },
    shadow: {
      // Apply shadow styles for Android
      elevation: 4, // Adjust the elevation value as needed
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4, // Adjust the shadow radius as needed
    },
    container: {
      flex: 1,
      gap: 10,
    },
    containerInline: {
      flexDirection: "row",
      marginBottom: 30,
    },
    description: {
      fontSize: PixelRatio.get() > 2 ? 16 : 14,
      color: BAPallete.Gray02,
      fontWeight: "500",
    },
    bajo: {
      fontSize: PixelRatio.get() > 2 ? 16 : 14,
      color: BAPallete.Red01,
      fontWeight: "500",
    },
    medio: {
      fontSize: PixelRatio.get() > 2 ? 16 : 14,
      color: BAPallete.Orange01,
      fontWeight: "500",
    },
    alto: {
      fontSize: PixelRatio.get() > 2 ? 16 : 14,
      color: BAPallete.Green01,
      fontWeight: "500",
    },
    incluye: {
      color: 'gray',
      fontSize: PixelRatio.get() > 2 ? 16 : 14,
    }

  });

const PasswordMeter: React.FC<PasswordMeterProps> = ({
  password,

}) => {

  function validateLength () {
    return password.length > 8
  }

  function hasSpecialChar () {
    const regex = /[^A-z\s0-9]/
    return regex.test(password)
  }

  function hasUpperCaseLowerCase () {
    const regex = /[A-Z]+[a-z]+/
    return regex.test(password)
  }

  function hasNumbers () {
    const regex = /[0-9]/
    return regex.test(password)
  }

  const acceptedCriteriaCount = () => {
    let count = 0;
    if (validateLength()) count++;
    if (hasUpperCaseLowerCase()) count++;
    if (hasNumbers()) count++;
    if (hasSpecialChar()) count++;
    return count;
  };

  function low () {
    let low = false;
    if(acceptedCriteriaCount() < 2) low = true;
    return low
  }

  function medium () {
    let medium = false;
    if(acceptedCriteriaCount() >= 2 && acceptedCriteriaCount() <= 3) medium = true;
    return medium
  }

  function high () {
    let high = false;
    if(acceptedCriteriaCount() == 4) high = true;
    return high
  }

  return (
    <View style={styles.container}>
        <View style={styles.containerInline}>
          <BAText style={styles.description}>
            Nivel de confianza: 
          </BAText>
          {low() ? <BAText style={styles.bajo}> BAJO </BAText> : <BAText style={styles.description}> BAJO </BAText>}
          <BAText style={styles.description}>
            |
          </BAText>
          {medium() ? <BAText style={styles.medio}> MEDIO </BAText> : <BAText style={styles.description}> MEDIO </BAText>}
          <BAText style={styles.description}>
            |
          </BAText>
          {high() ? <BAText style={styles.alto}> ALTO </BAText> : <BAText style={styles.description}> ALTO </BAText>}
        </View>
        <View>
          <BAText style={styles.incluye}>
            Incluye:
          </BAText>
          <Text style={{color: 'gray'}}>
            {validateLength() ? '✅' : '❌'} - Más de 10 caracteres
          </Text>
          <Text style={{color: 'gray'}}>
            {hasUpperCaseLowerCase() ? '✅' : '❌'} - Mayúsculas y minúsculas
          </Text>
          <Text style={{color: 'gray'}}>
            {hasNumbers() ? '✅' : '❌'} - Al menos un numero 
          </Text>
          <Text style={{color: 'gray'}}>
            {hasSpecialChar() ? '✅' : '❌'} - Un simbolo especial (@#%-_!?$=+*)
          </Text>
        </View>
    </View>
  );
};

export default PasswordMeter;
