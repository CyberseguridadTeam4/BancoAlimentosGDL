import { StyleSheet, View, Image, Dimensions, ImageBackground} from "react-native";
import React, {useState, useEffect} from "react";
import BAView from "./BAView";
import BASubView from "./BASubView";
import BAText, { TypeText } from "./BAText"; 
import Svg, { Polygon, Rect,Path, Image as SvgImage, SvgUri } from 'react-native-svg';
import BAButton, {ButtonState} from "./BAButton";
import BAPallete from "../resources/BAPallete";

export default function BAAcount(){
    const [subpage, setSubpage] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await fetch('/user');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <>
        <BAView title={"Perfil"} style={styles.body} isScrolling={true}>
            {/* <View style = {styles.container} >
                <View style = {styles.imageContainer}>
                        <Image
                        source = {require('../resources/icons/PersonIcon.png')}
                        style = {{alignSelf: "center"}}
                        />
                </View> 
               <Svg style={styles.svg} height="50%" width="50%" viewBox="0 0 100 100">
                    <Polygon points="50,0 100,50 50,100 0,50" fill="red" />
                    <SvgImage 
                        href={{uri: '../resources/icons/BirdIcon.png'}} 
                        height="100%" 
                        width="100%"
                    />
             </Svg>   
            </View>*/}

            <View style = {styles.container}>
            <Svg>
                <Rect
                    x="100"
                    y="0"
                    width="200"
                    height="200"
                    fill="pink"
                    rx="10"
                    ry="10"
                />
        
                <Polygon
                    //points="50,0 100,50 50,100 0,50" 
                    points="350,200 300,150 250,200 300,250" 
                    fill= {BAPallete.Red01}
                />
             </Svg>
             <Image
                style={{ position: 'absolute', top: 50, left: 150, width: 100, height: 100 }}
                source={require('../resources/icons/PersonIcon.png')}
            />
            <Image
                style={{ position: 'absolute', top: 176, left: 280, width: 50, height: 50 }}
                source={require('../resources/icons/BirdIconActivated.png')}
            />
            </View>
            <BAText 
                style={{ marginBottom: 20, width: "100%" }}
            >
                Nombre de usuario
            </BAText>
            <BAButton 
                style = {styles.button}
                text = "Mis insignias"
                onPress={() => {
                }}
                state = {ButtonState.alert} 
            />
            <View style = {styles.textContainer}>
                <BAText type={TypeText.label3}>
                    Estas registrado como:
                </BAText>
                <BAText>
                    email
                </BAText>
                <BAText type={TypeText.label3} >
                    Fecha de registro:
                </BAText>
                <BAText>
                    Fecha
                </BAText>
            </View>

        </BAView>
        <BASubView title = "Editar perfil" isOpen={subpage} onReturn={setSubpage}>
            <BAText>Nombre de usuario</BAText>
            
        </BASubView>
        </>
    );
}


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    button: {
        width: "100%",
    },
    textContainer: {
        marginVertical: 20,
        gap: 20,
        flexDirection: "column",
    },
    imageContainer: {
        //gap:20,
        //height: "70%",
        alignSelf: "center",
        //aspectRatio: 1 / 1,
       // backgroundColor: "pink",
        borderRadius: 10, // Add this line
        justifyContent: "center",
        //zIndex: 1,
    },
    svg: {
        zIndex: 2,
        bottom: 75,
        right: 45,
    },
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // gap: 20,
       height: height * 0.30,
    }
});