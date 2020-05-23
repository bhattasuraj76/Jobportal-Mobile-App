import React, { useContext } from "react";
import { AppearanceProvider } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Navigation from "../navigation/navigator";
import { StatusBar } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

function RootContaienr() {
  const { isThemeDark } = useContext(ThemeContext);
  //define default color and theme based on theme context
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;
  const AppTheme = isThemeDark ? DarkTheme : DefaultTheme;

  return (
    <AppearanceProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar backgroundColor={Colors.statusBarBg} />
        <Navigation />
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default RootContaienr;
