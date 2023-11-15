import { StyleSheet, View, ImageSourcePropType,FlatList  } from "react-native";
import React, {useState, useEffect} from "react";
import BAView from "../components/BAView";
import BASubView from "../components/BASubView";
import BAText, { TypeText } from "../components/BAText"; 
import BAButton, {ButtonState} from "../components/BAButton";
import BABadge from "../components/BABadge";

interface BAAccountBadgesProps {
    badges: number[] | null;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }

function DynamicBadge({ badgeNumber }: { badgeNumber: number }) {
    const badgeImageSource = getBadgeImageSource(badgeNumber);
  
    return <BABadge image={badgeImageSource} />;    
}
function getBadgeImageSource(badgeNumber: number): ImageSourcePropType {
    switch (badgeNumber) {
    case 1:
    return require("../assets/badges/1.png");
    case 2:
    return require("../assets/badges/2.png");
    case 3:
    return require("../assets/badges/3.png");
    case 4:
    return require("../assets/badges/4.png");
    case 5:
    return require("../assets/badges/5.png");
    case 6:
    return require("../assets/badges/6.png");
    case 7:
    return require("../assets/badges/7.png");
    // case 8:
    // return require("../assets/badges/8.png");
    // case 9:
    // return require("../assets/badges/9.png");
    // case 10:
    // return require("../assets/badges/10.png");
    // case 11:
    // return require("../assets/badges/11.png");
    // case 12:
    // return require("../assets/badges/12.png");
    // case 13:
    // return require("../assets/badges/13.png");
    // case 14:
    // return require("../assets/badges/14.png");
    // case 15:
    // return require("../assets/badges/15.png");
    // case 16:
    // return require("../assets/badges/16.png");
    // case 17:
    // return require("../assets/badges/17.png");
    // case 18:
    // return require("../assets/badges/18.png");
    // case 19:
    // return require("../assets/badges/19.png");
    // case 20:
    // return require("../assets/badges/20.png");
    // case 21:
    // return require("../assets/badges/21.png");
    // case 22:
    // return require("../assets/badges/22.png");
    // case 23:
    // return require("../assets/badges/23.png");
    // case 24:
    // return require("../assets/badges/24.png");
    default:
    return require("../assets/badges/default.png");
    }
}
export default function BAAccountBadges({
   badges,
   isOpen = false,
   setIsOpen,
   }: BAAccountBadgesProps) {
    // Use example
    if (!badges) {
        badges = [1, 2, 5];
      }    
    const badgeNumbers = Array.from({ length: 24 }, (_, i) => i + 1); // Creates an array [1, 2, 3, ..., 24]
    return (
        <BASubView 
          title={"Mis insignias"} 
          style={styles.body}
           isScrolling={false}
           isOpen= {isOpen}
           onReturn={() => {
            setIsOpen(false);
          }}
          >
        {/* Return button ?*/}
        <FlatList
          data={badgeNumbers}
          numColumns={4} // Set the number of columns in the grid
          contentContainerStyle={styles.badgeContainer}
          renderItem={({ item }) => (
            <View style={styles.badgeItem} key={item}>
              {badges?.includes(item) ? (
                <DynamicBadge badgeNumber={item} />
              ) : (
                <DynamicBadge badgeNumber={0} />
              )}
            </View>
          )}
          keyExtractor={(item) => item.toString()}
        />
        </BASubView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeContainer: {
        flex: 1,
        // justifyContent: "space-around",
        
    },
    badgeItem: {
        width: "25%", // Set a fixed width for each badge (4 items per row)
        aspectRatio: 1, // Maintain a square aspect ratio for each badge
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
  });