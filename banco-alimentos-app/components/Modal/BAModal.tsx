import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { useModal } from "./BAModalContext";
import BAPallete from "../../resources/BAPallete";
import BAText, { TypeText } from "../BAText";
import BAIcon, { IconSize } from "../../resources/icons/BAIcon";
import BAIcons from "../../resources/icons/BAIcons";

type BAModalProps = {
  title: string;
  content: any;
  onClose: () => void;
};

export default function BAModalController() {
  const { modalContent, modalTitle, closeModal } = useModal();

  return (
    <View style={modalContent ? styles.container : { display: "none" }}>
      {modalContent && (
        <BAModal
          title={modalTitle}
          content={modalContent}
          onClose={closeModal}
        />
      )}
    </View>
  );
}

export function BAModal({ title, content, onClose }: BAModalProps) {
  const backgroundOpacity = useRef(new Animated.Value(1)).current;
  const modalScale = useRef(new Animated.Value(0)).current;

  const OPEN_CLOSE_ANIMATION_TIME = 200;

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
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 1,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onCloseModal = () => {
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
      Animated.timing(modalScale, {
        toValue: 1,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0,
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
      >
        <TouchableOpacity onPress={onCloseModal} style={{ flex: 1 }} />
      </Animated.View>
      <Animated.View
        style={[styles.content, { transform: [{ scale: modalScale }] }]}
      >
        <View style={styles.header}>
          <BAText type={TypeText.label0}>{title}</BAText>
          <TouchableOpacity onPress={onCloseModal}>
            <BAIcon
              icon={BAIcons.CrossIcon}
              color={BAPallete.Red01}
              size={IconSize.large}
            />
          </TouchableOpacity>
        </View>
        {content}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    justifyContent: "center",
    zIndex: 100,
  },
  header: {
    marginVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    backgroundColor: "black",
    zIndex: 101,
    opacity: 0,
  },
  content: {
    flex: 1,
    width: "85%",
    position: "absolute",
    alignSelf: "center",
    zIndex: 102,
    padding: 30,
    paddingTop: 10,
    backgroundColor: BAPallete.Background,
    borderRadius: 20,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.15,
  },
});
