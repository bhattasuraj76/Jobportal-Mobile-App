import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AuthContextProvider from "./contexts/AuthContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import RootContaienr from "./containers/rootContainer";

const getFonts = () =>
  Font.loadAsync({
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold":  require("./assets/fonts/OpenSans-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <AuthContextProvider>
        <ThemeContextProvider>
          <RootContaienr />
        </ThemeContextProvider>
      </AuthContextProvider>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
