import * as React from "react";
/** Custom Hooks */
import useAuthHandler from "../utils/custom-hooks/AuthHandler";
/** Utils */
import { DEFAULT_AUTH_USER } from "../utils/constants/Consts";
import { getStoredAuthUser } from "../utils/Helpers";

export const AuthContext = React.createContext({
  authUser: DEFAULT_AUTH_USER,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
  updateAuthUserName: () => {},
  updateAuthUserProfile: () => {},
});

const AuthContextProvider = ({ children }) => {
  const {
    authUser,
    setAuthStatus,
    setUnauthStatus,
    updateAuthUserName,
    updateAuthUserProfile,
  } = useAuthHandler(
    getStoredAuthUser() // fetch stored user object
  );

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthStatus,
        setUnauthStatus,
        updateAuthUserName,
        updateAuthUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
