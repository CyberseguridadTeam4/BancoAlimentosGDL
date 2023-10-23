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
    <SafeAreaView style={{ flex: 1 }}>
      <BAText
        style={{ marginVertical: 25, width: "100%" }}
        type={TypeText.label0}
      >
        {title}
      </BAText>
      <ScrollView
        scrollEnabled={isScrolling}
        contentContainerStyle={isScrolling ? {} : styles.container}
      >
        <View style={style}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 150,
  },
});
