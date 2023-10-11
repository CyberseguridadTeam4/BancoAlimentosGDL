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
  onReturn?: () => void;
};

export default function BAView({
  children,
  style,
  title,
  onReturn,
}: ViewProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <BAText style={{ marginTop: 20 }} type={TypeText.label0}>
          {title}
        </BAText>
        <View style={style}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

export function BAScrollView({ children, style, title }: ViewProps) {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <BAText style={{ marginTop: 20 }} type={TypeText.label0}>
          Cuarto de ???
        </BAText>
        <View style={style}>{children}</View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
});
