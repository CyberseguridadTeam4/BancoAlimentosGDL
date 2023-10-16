import {
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import BAText, { TypeText } from "./BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";
import { transform } from "typescript";

type SubViewProps = {
  children: any;
  title: string;
  style?: StyleProp<ViewStyle>;
  isOpen: boolean;
  onReturn: (e: boolean) => void;
};

export default function BASubView({
  children,
  style,
  title,
  isOpen = false,
  onReturn,
}: SubViewProps) {
  const subpagePositionRef = useRef(new Animated.Value(0)).current;
  const OPEN_CLOSE_ANIMATION_TIME = 200;

  useEffect(() => {
    isOpen &&
      Animated.sequence([
        Animated.timing(subpagePositionRef, {
          toValue: 500,
          duration: 0,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(subpagePositionRef, {
          toValue: 0,
          duration: OPEN_CLOSE_ANIMATION_TIME,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
  }, [isOpen]);

  const onCloseSubpage = useCallback(() => {
    Animated.sequence([
      Animated.timing(subpagePositionRef, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(subpagePositionRef, {
        toValue: 500,
        duration: OPEN_CLOSE_ANIMATION_TIME,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => onReturn(false));
  }, []);

  return (
    <>
      {isOpen && (
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateX: subpagePositionRef }],
            },
          ]}
        >
          <ScrollView>
            <SafeAreaView>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => onCloseSubpage()}>
                  <BAIcon
                    icon={BAIcons.BackIcon}
                    color={BAPallete.Red01}
                    size={IconSize.large}
                  />
                </TouchableOpacity>
                <BAText type={TypeText.label0}>{title}</BAText>
              </View>
              <View style={style}>{children}</View>
            </SafeAreaView>
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  container: {
    transform: [{ translateX: -500 }],
    width: "100%",
    height: "100%",
    flexDirection: "column",
    position: "absolute",
    left: 0,
    padding: 20,
    backgroundColor: BAPallete.Background,
  },
});
