import React, { useContext, useEffect } from "react";
import { AppearanceProvider } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Navigation from "../navigation/navigator";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import Axios from "axios";
import GeneralStatusBar from "../shared/generalStatusBar";

function RootContaienr() {
  //define default theme based on theme context
  const { isThemeDark } = useContext(ThemeContext);
  const AppTheme = isThemeDark ? DarkTheme : DefaultTheme;

  //  request interceptor to add token if authenticated
  const { authUser, setAuthStatus } = useContext(AuthContext);
  const AUTH_TOKEN = authUser.token;

  // Axios.interceptors.request.use(function (config) {
  //   config.headers.Authorization = AUTH_TOKEN ;
  //   console.log(config);
  //   return config;
  // });

  // useEffect(() => {
  //   setAuthStatus({
  //     entity: "jobseeker",
  //     email: "jobseeker@test.com",
  //     token: "djFJUmxJVVVGeTdaaXBaUzNpTWtWbUpPZUxXRm01Nk8zbnRESldoaw==",
  //     profile: "",
  //     name: "John Doe",
  //     hasCV: false,
  //   });
  // }, []);

  Axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

  return (
    <AppearanceProvider>
      <NavigationContainer theme={AppTheme}>
        <GeneralStatusBar />
        <Navigation />
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default RootContaienr;
