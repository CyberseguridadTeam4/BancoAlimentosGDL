import {
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  RefreshControlProps,
} from "react-native";
import React from "react";
import BAText, { TypeText } from "./BAText";

type ViewProps = {
  children: any;
  title: string;
  style?: StyleProp<ViewStyle>;
  isScrolling?: boolean;
  onRefresh?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
  rightButtons?: React.ReactElement;
};

export default function BAView({
  children,
  style,
  title,
  isScrolling = true,
  onRefresh,
  rightButtons,
}: ViewProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <BAText type={TypeText.label0}>{title}</BAText>
        {rightButtons}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 25 : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          scrollEnabled={isScrolling}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 100,
            flexGrow: 1,
          }}
          refreshControl={onRefresh}
        >
          <View style={style}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
});
