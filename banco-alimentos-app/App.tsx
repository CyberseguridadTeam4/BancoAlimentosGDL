import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import BAButton, { ButtonState } from "./components/BAButton";
import BAText, { TypeText } from "./components/BAText";
import BATextInput from "./components/BATextInput";
import BAIcons from "./resources/icons/BAIcons";
import BADropdownMenu from "./components/BADropdown";
import { useState } from "react";
import BABottomBar from "./components/BABottomBar";
import BABird from "./components/BABird";
import BAAcount from "./components/BAAccountView";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [text, setText] = useState("Hello");
  return (
    <View style={styles.container}>
     <BAAcount></BAAcount>
      {/*  <StatusBar barStyle={"dark-content"} />
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
       */}
       <BABottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
