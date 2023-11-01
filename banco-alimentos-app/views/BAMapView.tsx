import { StyleSheet, View,  Dimensions, TouchableOpacity, Text, Linking, PixelRatio} from "react-native";
import React, { useEffect, useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";

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
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 20.65596,
              longitude: -103.35466,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
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
                      {/* <Text>Banco de alimentos de Guadalajara</Text> */}
                  </View>
              </Callout>    
              </Marker>
            </MapView>
          </View>
          <View style={styles.textContainer}>
              {name && <BAText style = {styles.textTitle}>{name}</BAText>}
              <View style= {styles.row}>
                <BAIcon icon={BAIcons.MapIcon} color={BAPallete.Red01} size={IconSize.small}/>
                {vicinity && <BAText style = {styles.textLabel}>{vicinity}</BAText>}
              </View>
              <View style = {styles.row}>
              <BAIcon icon={BAIcons.PhoneIcon} color={BAPallete.Red01} size={IconSize.small}/>
                <TouchableOpacity onPress={handlePress}>
                  {phoneNumber && <BAText style = {styles.textLabel}>{phoneNumber}</BAText>}
                </TouchableOpacity>
              </View>
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
        alignItems: "stretch",
        justifyContent: "center",
        marginTop: 20,
        flex: 1,
      },
      textLabel: {
        textAlign: 'left',
        fontWeight: "500",
        fontSize: PixelRatio.get() > 2 ? 18 : 16,
        color: BAPallete.Gray01
      },
      textTitle: {
        textAlign: 'center',
        fontWeight: "500",
        fontSize: PixelRatio.get() > 2 ? 22 : 20,
        color: BAPallete.Red01
      },
      mapContainer: {
        flex: 1,
        height: windowHeight /2,  // Half of the window height
        shadowRadius: 15,
        shadowColor: BAPallete.StrongBlue,
        shadowOpacity: 0.15,
      },
      map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      row: {
        flexDirection: "row",
        padding: 5,
      }
});