import { StyleSheet, View,  Dimensions, TouchableOpacity, Text, Linking} from "react-native";
import React, { useEffect, useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import BAIcons from "../resources/icons/BAIcons";
import { IconSize } from "../resources/icons/BAIcon";
//import Constants from 'expo-constants';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import BAText, {TypeText} from "../components/BAText";

//const apiKey = Constants.extra.googleMapsApiKey;

export default function BAMapView(){
    const [name, setName] = useState(null);
    const [vicinity, setVicinity] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    useEffect(() => {
      fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJEyCF-AayKIQRhWWzownuQ8s&fields=name,formatted_phone_number,geometry,vicinity&key=AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o')
      .then(response => response.json())
      .then(json => {
        setName(json.result.name);
        setVicinity(json.result.vicinity);
        setPhoneNumber(json.result.formatted_phone_number);
      })
      .catch(error => console.error(error));
    }, []);

    const handlePress = () => {
      let phone = 'tel:' + phoneNumber;
      Linking.openURL(phone).catch((err) => console.error('An error occurred', err));
    };
  
    return (
        <BAView title="Map" isScrolling={true}  style={styles.body}>
          <View style = {styles.mapContainer}>
            {/* <BAText> prueba</BAText> */}
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 20.671333,
              longitude: -103.357222,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            scrollEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            >
            <Marker
              coordinate={{
                latitude: 20.65596,
                longitude: -103.35466,
              }}
              >
              <Callout>
                <View>
                      <Text>Banco de alimentos de Guadalajara</Text>
                  </View>
              </Callout>    
              </Marker>
            </MapView>
          </View>
            <View style={styles.textContainer}>
              {name && <BAText style = {TypeText.label1}>{name}</BAText>}
              {vicinity && <BAText style = {TypeText.label3}>{vicinity}</BAText>}
              <TouchableOpacity onPress={handlePress}>
                {phoneNumber && <BAText style = {TypeText.label3}>{phoneNumber}</BAText>}
              </TouchableOpacity>
            </View>  
        </BAView>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
      body: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
      textContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 20,
      },
      mapContainer: {
        flex: 1,
        // backgroundColor: "pink",
        // marginBottom: 40,
        height: windowHeight/2,  // Half of the window height
      },
      map: {
        width: '100%',
        height: '100%',
      },
});