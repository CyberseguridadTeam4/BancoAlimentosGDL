import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState } from "react";
import BABottomBar from "./components/BABottomBar";
import React from "react";
import BABirdView from "./views/BABirdView";
import BAContextProviderWrapper from "./components/BAContextProviderWrapper";
import BAModalController from "./components/Modal/BAModal";
import BASheetController from "./components/Sheet/BASheet";
import BAToastController from "./components/Toast/BAToast";
import BAPostsView from "./views/BAPostsView";
import BABird from "./components/BABird";
import BAAcount from "./components/BAAccountView";
import BAWelcomeView from "./components/BAWelcomeView";
import BASignUpView from "./components/BASignUpView";
import BAPasswordCreationView from "./components/BAPasswordCreationView";
import BASubView from "./components/BASubView";
import BAView from "./components/BAView";
import BAButton, { ButtonState } from "./components/BAButton";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [text, setText] = useState("Hello");
  return (
    <View style={styles.container}>
      <BAContextProviderWrapper>
        <StatusBar barStyle={"dark-content"} />
        <BASignUpView />
        {/* <BABottomBar /> */}
        <BAModalController />
        <BASheetController />
        <BAToastController />
      </BAContextProviderWrapper>
    </View>
  );
}


// export default function App() {
//   const [nextPage, setNextPage] = useState(false);

//   return (
//     <>
//       <BAView title=" View">
//           <BAButton
//           text="Siguiente"
//           state={ButtonState.alert}
//           onPress={() => setNextPage(true)}
//           />
//       </BAView>
//       <BASubView
//         title="Regresa"
//         isOpen={nextPage}
//         onReturn={() => setNextPage(false)}
//         >
//         <BABird />
//       </BASubView>
//       <BASubView
//         title="Regresa"
//         isOpen={nextPage}
//         onReturn={() => setNextPage(false)}
//         >
//         <BABird />
//       </BASubView>
//     </>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FF",
    paddingTop: 20,
  },
});