import {
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import React from "react";
import BAText, { TypeText } from "./BAText";

type ViewProps = {
  children: any;
  title: string;
  style?: StyleProp<ViewStyle>;
  isScrolling?: boolean;
};

export default function BAView({
  children,
  style,
  title,
  isScrolling = false,
}: ViewProps) {
  return (
    <ScrollView scrollEnabled={isScrolling} style={styles.container}>
      <SafeAreaView>
        <BAText
          style={{ marginVertical: 20, width: "100%" }}
          type={TypeText.label0}
        >
          {title}
        </BAText>
        <View style={style}>{children}</View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
