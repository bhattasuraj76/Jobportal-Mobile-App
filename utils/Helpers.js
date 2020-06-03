import { DEFAULT_AUTH_USER } from "./constants/Consts";
import { DEFAULT_THEME } from "./constants/Consts";
import { AsyncStorage } from "react-native";

/** Return authenticated user from local storage */
export const getStoredAuthUser = async () => {
  try {
    let authUser = await AsyncStorage.getItem("authUser");
    if (authUser) {
      return authUser;
    }
  } catch (e) {
    console.log(e);
  }

  return DEFAULT_AUTH_USER;
};

/** Return theme from local storage */
export const getStoredTheme = () => {
  // try {
  //   let theme = await AsyncStorage.getItem("theme");
  //   if (theme) {
  //     return theme;
  //   }
  // } catch (e) {
  //   console.log(e);
  // }

  return DEFAULT_THEME;
};

/** API Request handler  */
export const apiRequest = async (url, method, bodyParams) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined,
  });
  return await response.json();
};

/** stringify errors */
export const serializeErrors = (errors) => {
  return Object.values(errors).join(" ");
};
