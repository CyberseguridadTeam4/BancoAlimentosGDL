import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BAButton, { ButtonState } from "./components/BAButton";
import BAText, { TypeText } from "./components/BAText";
import BATextInput from "./components/BATextInput";
import BAIcons from "./resources/icons/BAIcons";
import BADropdownMenu from "./components/BADropdown";
import { useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [text, setText] = useState("Hello");
  return (
    <View style={styles.container}>
      <BAText>Bienvenido</BAText>
      <BAText type={TypeText.label3}>Banco de alimentos</BAText>
      <BAButton icon={BAIcons.PersonIcon} text="Hello" onPress={() => {}} />
      <BAButton
        icon={BAIcons.PersonIcon}
        text="World"
        onPress={() => {}}
        state={ButtonState.secondary}
      />
      <BATextInput
        placeholder="I am a Text input"
        icon={BAIcons.SearchIcon}
        value={text}
        onChange={setText}
      />
      <BADropdownMenu
        optionSelected={selectedOption}
        onSelect={setSelectedOption}
        isVisible={true}
        options={[
          {
            text: "Hey",
            value: "1",
            icon: BAIcons.AddIcon,
          },
          {
            text: "What's Up?",
            value: "2",
            icon: BAIcons.LockIcon,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginHorizontal: 20,
  },
});
