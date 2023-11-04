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
  KeyboardAvoidingView,
  Platform,
  RefreshControlProps,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import BAText, { TypeText } from "./BAText";
import BAPallete from "../resources/BAPallete";
import BAIcon, { IconSize } from "../resources/icons/BAIcon";
import BAIcons from "../resources/icons/BAIcons";

type SubViewProps = {
  children: any;
  title: string;
  style?: StyleProp<ViewStyle>;
  isOpen: boolean;
  isScrolling?: boolean;
  onReturn: (e: boolean) => void;
  onRefresh?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
};

export default function BASubView({
  children,
  style,
  title,
  isOpen = false,
  isScrolling = true,
  onReturn,
  onRefresh,
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
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            {
              transform: [{ translateX: subpagePositionRef }],
              paddingHorizontal: 20,
            },
          ]}
        >
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 25 : undefined}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 275,
              }}
              style={{ paddingTop: 20 }}
              keyboardShouldPersistTaps="handled"
              refreshControl={onRefresh}
              scrollEnabled={isScrolling}
            >
              <View style={style}>{children}</View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </SafeAreaView>
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
  scroll: {
    flexGrow: 1,
    marginBottom: 100,
  },
  view: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  container: {
    width: "100%",
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignSelf: "center",
    position: "absolute",
    paddingVertical: 20,
    backgroundColor: BAPallete.Background,
  },
});
