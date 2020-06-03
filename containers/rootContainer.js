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
import { AuthContext } from "../contexts/AuthContext";
import Axios from "axios";

function RootContaienr() {
  const { isThemeDark } = useContext(ThemeContext);
  //define default color and theme based on theme context
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;
  const AppTheme = isThemeDark ? DarkTheme : DefaultTheme;

  // Add a request interceptor if authenticated
  const { authUser } = useContext(AuthContext);
  
  if (authUser.email && authUser.token) {
    Axios.interceptors.request.use(function (config) {
      config.headers.Authorization = authUser.token;
      return config;
    });
  }

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
