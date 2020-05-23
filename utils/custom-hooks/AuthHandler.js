import * as React from "react";
import { AsyncStorage } from "react-native";
/** Utils */
import { DEFAULT_AUTH_USER } from "../constants/Consts";

const authHandler = (initialState) => {
  const [authUser, setAuthUser] = React.useState(initialState);

  const setAuthStatus = async (authUser) => {
    try {
      await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
      setAuthUser(authUser);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const setUnauthStatus = async () => {
    try {
      await AsyncStorage.removeItem("authUser");
      setAuthUser(DEFAULT_AUTH_USER);
    } catch(e) {
      console.log(e);
    }
  };

  return {
    authUser,
    setAuthStatus,
    setUnauthStatus,
  };
};
export default authHandler;
