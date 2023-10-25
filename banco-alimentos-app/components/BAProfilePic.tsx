import { StyleSheet, View, Image } from "react-native";
import React from "react";
import BAPallete from "../resources/BAPallete";

export default function BAProfilePic(){
    return(
        <>
        <View style = {styles.wrapper}>
            <View style = {styles.profile}>
                <Image
                    style = {{width: "100%", height: "100%"}}
                    source={require('../resources/icons/PersonIcon.png')}
                />
            </View>
            <View style = {styles.badge }>
                <Image
                    style = {styles.badgePic}
                    source={require('../resources/icons/BirdIconActivated.png')}
                />
            </View>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    wrapper:{
        width: "100%",
        aspectRatio: 1/1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    profile:{
        width: "60%",
        height: "60%",
        borderRadius: 10,
        backgroundColor: "pink",
    },
    badge:{
        width: "25%",
        height: "25%",
        borderRadius: 10,
        backgroundColor: BAPallete.Red01,
        transform: [{rotate:"45deg"}],
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 30,
        justifyContent: 'center'
    },
    badgePic: {
        width: "60%", 
        height: "60%",  
        alignSelf: 'center',
        transform: [{rotate:"-45deg"}],
       // margin: 12
      
    }
})