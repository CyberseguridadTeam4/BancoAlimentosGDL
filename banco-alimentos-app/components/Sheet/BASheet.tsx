// Sheet.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { useSheet } from "./BASheetContext";
import BAPallete from "../../resources/BAPallete";
import BAText, { TypeText } from "../BAText";
import BAIcon, { IconSize } from "../../resources/icons/BAIcon";
import BAIcons from "../../resources/icons/BAIcons";
import BAButton, { ButtonState } from "../BAButton";

type BASheetProps = {
  title: string;
  content: any;
  onClose: () => void;
};

const BASheetController = () => {
  const { sheetContent, sheetTitle, closeSheet } = useSheet();

  return (
    <View style={sheetContent ? styles.container : { display: "none" }}>
      {sheetContent && (
        <BASheet
          title={sheetTitle}
          content={sheetContent}
          onClose={closeSheet}
        />
      )}
    </View>
  );
};

const BASheet = ({ title, content, onClose }: BASheetProps) => {
  const backgroundOpacity = useRef(new Animated.Value(1)).current;
  const sheetPositionRef = useRef(new Animated.Value(0)).current;

  const OPEN_CLOSE_ANIMATION_TIME = 300;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0.25,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(sheetPositionRef, {
        toValue: -1,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(sheetPositionRef, {
        toValue: 0,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const sheetPosition = sheetPositionRef.interpolate({
    inputRange: [-1, 0],
    outputRange: [1000, 0],
    extrapolate: "identity",
  });

  const onCloseSheet = () => {
    Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 0.25,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(sheetPositionRef, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(sheetPositionRef, {
        toValue: -1,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: backgroundOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY: sheetPosition }],
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onCloseSheet}>
            <BAIcon
              icon={BAIcons.CrossIcon}
              color={BAPallete.Red01}
              size={IconSize.large}
            />
          </TouchableOpacity>
          <BAText type={TypeText.label0}>{title}</BAText>
        </View>
        {content}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    zIndex: 100,
  },
  header: {
    marginVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  background: {
    flex: 1,
    backgroundColor: "black",
    zIndex: 101,
    opacity: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    translateY: 0,
    position: "absolute",
    top: "10%",
    bottom: 0,
    zIndex: 102,
    padding: 30,
    paddingTop: 10,
    marginTop: 25,
    backgroundColor: BAPallete.Background,
    borderRadius: 20,
    shadowRadius: 15,
    shadowColor: BAPallete.StrongBlue,
    shadowOpacity: 0.15,
  },
});

export default BASheetController;
