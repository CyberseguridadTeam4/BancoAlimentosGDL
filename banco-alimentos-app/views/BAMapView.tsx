import { StyleSheet, View,  Dimensions, TouchableOpacity, Text} from "react-native";
import React, { useState } from "react";
import BAView from "../components/BAView";
import BATextInput from "../components/BATextInput";
import BAButton, { ButtonState } from "../components/BAButton";
import BAIcons from "../resources/icons/BAIcons";
import { IconSize } from "../resources/icons/BAIcon";
//import Constants from 'expo-constants';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import BAText from "../components/BAText";

//const apiKey = Constants.extra.googleMapsApiKey;

export default function BAMapView(){
    const [place, setPlace] = useState("");
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
            <View style={styles.buttonContainer}>
                <View style={styles.inputContainer}>
                    <BATextInput value={place} onChange={setPlace} placeholder="Find place..."/> 
                </View> 
                <BAButton onPress={() =>{}} icon={BAIcons.SearchIcon} iconSize={IconSize.large} style={styles.buttons} />
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
    buttons: {
        flex: 1,
        marginLeft:  20,
        aspectRatio: 1 / 1,
      },
      buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      },
      inputContainer: {
        width: "80%",
        height: "100%",
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