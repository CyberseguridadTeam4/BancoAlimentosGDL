import { StyleSheet, View, ImageSourcePropType, FlatList } from "react-native";
import React from "react";
import BASubView from "../components/BASubView";
import BABadge from "../components/BABadge";
import BABadges from "../assets/badges/BABadges";
import BAIcons from "../resources/icons/BAIcons";
import BAIcon from "../resources/icons/BAIcon";
import BAPallete from "../resources/BAPallete";

interface BAAccountBadgesProps {
  badges: number[] | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function DynamicBadge({
  image,
  badges,
}: {
  image: ImageSourcePropType;
  badges: any[];
}) {
  return <BABadge image={image} badges={badges} disableArrows={false} />;
}

export default function BAAccountBadges({
  badges,
  isOpen = false,
  setIsOpen,
}: BAAccountBadgesProps) {
  return (
    <BASubView
      title={"Mis insignias"}
      style={styles.body}
      isScrolling={false}
      isOpen={isOpen}
      onReturn={() => {
        setIsOpen(false);
      }}
    >
      <FlatList
        data={BABadges}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.badgeContainer}
        renderItem={({ item }) => (
          <View style={styles.badgeItem} key={item}>
            {badges?.includes(BABadges.indexOf(item)) ? (
              <DynamicBadge image={item} badges={badges} />
            ) : (
              <View style={styles.lockBadge}>
                <BAIcon
                  icon={BAIcons.LockIcon}
                  size={25}
                  color={BAPallete.Red01}
                />
              </View>
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
  lockBadge: {
    flex: 1,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowRadius: 10,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.1,
  },
  badgeContainer: {
    // flex: 1,
    marginTop: 10,
    paddingBottom: 100,
  },
  badgeItem: {
    width: "25%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});
