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
        style={{
          marginTop: 20,
          marginBottom: 10,
          width: "100%",
          paddingHorizontal: 20,
        }}
        type={TypeText.label0}
      >
        {title}
      </BAText>
      <ScrollView
        scrollEnabled={isScrolling}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          isScrolling
            ? { paddingHorizontal: 20, paddingTop: 20 }
            : styles.container
        }
      >
        <View style={style}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    marginBottom: 150,
    paddingTop: 20,
  },
});
