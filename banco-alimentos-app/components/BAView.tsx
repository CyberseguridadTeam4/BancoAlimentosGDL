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
    <>
      {isScrolling ? (
        <ScrollView style={styles.container}>
          <SafeAreaView>
            <BAText style={{ marginTop: 20 }} type={TypeText.label0}>
              {title}
            </BAText>
            <View style={style}>{children}</View>
          </SafeAreaView>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <BAText style={{ marginTop: 20 }} type={TypeText.label0}>
              {title}
            </BAText>
            <View style={style}>{children}</View>
          </SafeAreaView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
});
