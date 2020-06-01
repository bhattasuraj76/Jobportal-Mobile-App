import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AuthContextProvider from "./contexts/AuthContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import RootContaienr from "./containers/rootContainer";

const getFonts = () =>
  Font.loadAsync({
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans-light-italic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semi-bold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-semi-bold-italic": require("./assets/fonts/OpenSans-SemiBoldItalic.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-bold-italic": require("./assets/fonts/OpenSans-BoldItalic.ttf"),
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
